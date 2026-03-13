# Contexto do Projeto: Melhorias Profissionais e Qualidade (v0.2.0)

**Data:** 12 de Março, 2026
**Versão:** 0.2.0
**Foco:** Estabilidade, Automação de Segurança e Performance.

## 1. Novas Camadas de Valor

Nesta versão, o `ai-jail-sandbox` deixou de ser um simples wrapper para se tornar uma ferramenta de sandbox profissional.

### Implementações:
- **Disponibilidade (Hardware Limits)**: Adicionados limites de 2 CPUs e 2GB RAM por padrão para garantir que o computador do usuário nunca trave devido ao uso da IA.
- **Conformidade Automática (.gitignore)**: A ferramenta agora lê o `.gitignore` local e mascara automaticamente qualquer arquivo listado, respeitando as decisões de privacidade do desenvolvedor.
- **Integridade (Read-Only)**: Implementada a flag `--read-only` para cenários onde o usuário deseja apenas consultar a IA sem risco de alterações no código.
- **Produtividade (NPM Cache)**: Criado um cache persistente para o NPM dentro do container, acelerando drasticamente o uso recorrente.

## 2. Refinamento de Segurança

O mecanismo de mascaramento foi expandido:
- Antes: Mascarava apenas `.env` e `.git`.
- Agora: Mascara padrões fixos (`.env*`, `.ssh`, `.git`, `*.key`, `*.pem`) + tudo que estiver no `.gitignore`.

## 3. Validação Técnica

A bateria de testes foi expandida para 9 casos, validando:
- Repasse de argumentos diretos para o Gemini.
- Bloqueio de escrita em modo `--read-only`.
- Mascaramento via `.gitignore` e padrões fixos.
- Isolamento total de host e rede.

---
*Este registro marca a evolução do projeto para um estado estável e pronto para uso profissional.*
