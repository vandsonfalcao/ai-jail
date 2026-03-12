import { describe, it, expect } from 'vitest';
import { execa } from 'execa';
import path from 'path';
import fs from 'fs';

const CLI_PATH = path.resolve(__dirname, '../dist/cli.js');

describe('ai-jail CLI (Segurança e Isolamento)', () => {
  const testTimeout = 15000;

  it('1. deve responder ao comando --version instantaneamente', async () => {
    const { stdout } = await execa('node', [CLI_PATH, '--version'], { timeout: testTimeout });
    expect(stdout).toContain('0.33.0');
  }, testTimeout);

  it('2. deve bloquear internet com a flag --lockdown', async () => {
    try {
      await execa('node', [CLI_PATH, '--lockdown', 'curl', 'google.com'], { timeout: testTimeout });
      throw new Error('Deveria ter falhado o acesso à internet');
    } catch (error: any) {
      expect(error.exitCode).not.toBe(0);
    }
  }, testTimeout);

  it('3. deve isolar variáveis de ambiente do host', async () => {
    process.env.TEST_SECRET_HOST = 'my-secret-token';
    const { stdout, stderr } = await execa('node', [CLI_PATH, 'printenv', 'TEST_SECRET_HOST'], { 
      reject: false, 
      timeout: testTimeout 
    });
    const output = stdout + stderr;
    expect(output).not.toContain('my-secret-token');
  }, testTimeout);

  it('4. deve mascarar arquivos .env* automaticamente', async () => {
    const envPath = path.join(process.cwd(), '.env.test-secret');
    fs.writeFileSync(envPath, 'SECRET_KEY=12345');

    try {
      const { stdout } = await execa('node', [CLI_PATH, 'cat', '.env.test-secret'], { 
        reject: false,
        timeout: testTimeout 
      });
      // O arquivo deve estar vazio devido ao mascaramento com /dev/null
      expect(stdout.trim()).toBe('');
    } finally {
      if (fs.existsSync(envPath)) fs.unlinkSync(envPath);
    }
  }, testTimeout);

  it('5. deve permitir arquivos sensíveis com --allow-secrets', async () => {
    const envPath = path.join(process.cwd(), '.env.test-allow');
    fs.writeFileSync(envPath, 'ALLOWED_SECRET=999');

    try {
      const { stdout } = await execa('node', [CLI_PATH, '--allow-secrets', 'cat', '.env.test-allow'], { 
        timeout: testTimeout 
      });
      expect(stdout).toContain('ALLOWED_SECRET=999');
    } finally {
      if (fs.existsSync(envPath)) fs.unlinkSync(envPath);
    }
  }, testTimeout);

  it('6. deve isolar arquivos do host (fora do workspace)', async () => {
    const secretPath = `/tmp/ai-jail-secret-${Date.now()}.txt`;
    fs.writeFileSync(secretPath, 'secret content');

    try {
      const { stdout, stderr } = await execa('node', [CLI_PATH, 'ls', secretPath], { 
        reject: false,
        timeout: testTimeout 
      });
      const output = stdout + stderr;
      expect(output.toLowerCase()).toContain('no such file or directory');
    } finally {
      if (fs.existsSync(secretPath)) fs.unlinkSync(secretPath);
    }
  }, testTimeout);
});
