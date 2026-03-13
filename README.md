# AI-Jail Sandbox: Sandbox Segura para o Gemini CLI

> ⚠️ **ATENÇÃO: Este produto é EXPERIMENTAL e está em fase de testes.** O uso em ambientes críticos não é recomendado sem a devida auditoria.

**AI-Jail Sandbox** é uma ferramenta CLI oficial para executar o agente de IA Gemini em um ambiente Docker isolado, protegendo seu sistema host de comandos inseguros e vazamento de dados.

## Compatibilidade por Sistema Operacional

### 🐧 Linux (Nativo)
O suporte é nativo. Certifique-se de que o Docker está instalado e o seu usuário pertence ao grupo `docker`.
*   **Instalação**: `npm install -g ai-jail-sandbox` ou `pnpm add -g ai-jail-sandbox`

### 🪟 Windows (via WSL2)
O uso no Windows é suportado **exclusivamente através do WSL2** (Windows Subsystem for Linux).
1.  Instale o **WSL2** e uma distro Linux (ex: Ubuntu) da Microsoft Store.
2.  Instale o **Docker Desktop** para Windows e ative a integração com o WSL2 nas configurações.
3.  Abra o terminal do Ubuntu dentro do Windows.
4.  Instale o Node.js e a lib: `npm install -g ai-jail-sandbox`

### 🍎 macOS
Suporte via **Docker Desktop** ou **OrbStack**.
*   Certifique-se de que o binário `docker` está acessível no seu terminal.
*   **Instalação**: `npm install -g ai-jail-sandbox`

---

## Como Usar

Execute o `ai-jail-sandbox` de dentro de qualquer diretório de projeto:

### 1. Iniciar o Agente de IA (Modo Padrão)
```bash
ai-jail-sandbox
```

### 2. Passar uma Pergunta Direta
```bash
ai-jail-sandbox "Explique o código neste diretório"
```

### 3. Modo Lockdown (Segurança Máxima)
Para rodar a IA sem qualquer acesso à rede externa:
```bash
ai-jail-sandbox --lockdown
```

### 4. Proteção de Arquivos Sensíveis (Mascaramento)
Por padrão, o `ai-jail-sandbox` identifica e **mascara** os seguintes arquivos e pastas para que a IA **não consiga ler seu conteúdo**:

*   **Arquivos de ambiente**: Todos que começam com `.env*` (ex: `.env`, `.env.local`).
*   **Pastas de sistema**: `.git`, `.ssh`, `.npm`, `.pnpm`.
*   **Chaves**: `*.key`, `*.pem`, `credentials.json`.

Para desativar essa proteção:
```bash
ai-jail-sandbox --allow-secrets
```

## Arquitetura de Segurança

| Recurso | Proteção |
| :--- | :--- |
| **Arquivos Montados** | Apenas o diretório atual é acessível. |
| **Arquivos Mascarados** | `.env*`, `.git`, `.ssh`, chaves e credenciais são sobrepostos por `/dev/null`. |
| **Rede** | Bloqueio total via `--network none` (com a flag `--lockdown`). |
| **Sistema Host** | O agente não tem acesso a pastas fora do projeto. |
| **Variáveis de Ambiente** | Nenhuma variável do computador real é passada para o container. |

---
Inspirado por [ai-jail de Fabio Akita (AkitaOnRails)](https://github.com/akitaonrails/ai-jail).
