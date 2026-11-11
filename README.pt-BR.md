<h1>
 <img src="./src/assets/zuri-logo-icon-white.png" width="50" align="left">
 <span>Documentação Técnica - Zuri</span>
</h1>

![último Commit](https://img.shields.io/github/last-commit/kauanvinicius9/Zuri?label=Última%20Atualização&color=red)

[English](README.md "Clique para Acessar a Documentação em Inglês")

## Sumário

- [1- Visualização Geral](#visualização-geral "Clique para Ver o Tópico da Visualização Geral")
- [2- Características](#características "Clique para Ver o Tópico das Características")
- [3- Identidade Visual](#identidade-visual "Clique para Ver o Tópico da Indentidade Visual")
  - [3.1- Cores](#1-cores "Clique para Ver o Subtópico das Cores")
- [4- Como Usar](#como-usar-o-plugin-do-zuri "Clique para Ver o Tópico do Tutorial de Como Usar")
- [5- CI](#ci "Clique para ver o Tópico do CI")
- [6- Dependências](#dependências "Clique para Ver o Tópico das Dependências")
- [7- Ferramentas](#ferramentas "Clique para Ver o Tópico das Ferramentas")
- [8- Requisitos](#requisitos "Clique para Ver o Tópico dos Requisitos")

## Visualização Geral

Widget React para IA Local e Produtividade

Zuri - Intelligence By Your Side é uma extensão para o Chrome construída com React + Manifest V3. É um Copiloto de Leitura e Contexto com IA — uma extensão React que permite selecionar qualquer texto ou trecho de código em uma página web e abrir um painel lateral com recursos de IA: resumo inteligente, explicação de trechos complexos, extração de conceitos-chave ou tradução explicativa.

Usa as APIs de IA nativas do próprio navegador para rodar offline e sem custos de API, ou permite que o usuário informe a própria chave de API. Este projeto exige excelente domínio de React — manipulação do DOM do navegador, injeção de content scripts, gerenciamento de estado no painel lateral e comunicação assíncrona de mensagens na extensão do Chrome. A Zuri transforma informações complexas em respostas claras e concisas.

É uma inteligência que aprende a entender o contexto e acompanha o usuário em suas atividades. A Zuri não foi desenvolvida para substituir o usuário. Ela foi desenvolvida para ampliar aquilo que ele é capaz de fazer.

Uma extensão só enxerga o que está dentro do navegador, então funciona em qualquer site.

## Características

Suas 05 características são:

- **Autônomo**: Analisa situações e propõe caminhos;
- **Confiável**: Prioriza respostas úteis e transparentes;
- **Inteligente**: Entende contextos;
- **Parcerio**: Trabalha ao lado do usuário em qualquer software, sem tentar tomar o seu lugar;
- **Determinado**: Uma identidade forte e comunicação objetiva.

## Identidade Visual

### 1. Cores

- Vermelho: `#35141D` `#641B2B` `#8C2639` `#C65A6C`;
- Branco: `#F5F5F5`;
- Preto: `#0E0E0E`;
- Cinza: `#999999`;

## Como Usar o Plugin do Zuri
 
1- Clono o repositório

```powershell
git clone https://github.com/kauanvinicius9/Zuri.git
```

2- Entre no projeto

```powershell
cd Zuri
```

3- Instale as dependências

```powershell
npm install
```

4- Atualize os arquivos

```powershell
npm run build
```

5- Execute o projeto

```powershell
npm run dev
```

6- Chrome

- Acesse as [Extensões do Chrome](chrome://extensions) e ative o **modo desenvolvedor**;
- Clique em **Carregar sem compactação**;
- Selecione a pasta `dist`, teste em qualquer página - selecione um texto, clique com o botão direito e escolha **Analizar com Zuri**. O painel lateral irá abrir. Clicando no link da extensão, também abre o painel.

Em seguida, Zuri aparece listado no gerenciador de extensões do Chrome. Sua logo é fixado na barra de ferramentas do navegador ao lado do menu de extensões. Clicando na logo, o painel lateral exibindo o texto selecionado e os métodos (**Resumir**, **Conceitos** e **Traduzir**) aparecem no painel. Além disso, o painel possui configurações, onde você selecionar o **modelo de IA**. Você pode escolher o modelo **Local** (`Local Chrome Built-in / Gemini Nano`) ou o modelo **Nuvem** (`Nuvem Google Gemini API Key`).

Para o modelo **Nuvem** você precisa inserir a chave da API no [Google AI Studio](https://aistudio.google.com/) e definir o modelo de IA (`gemini-3.8-flash`).

---

Clique no ícone "✅" no topo do repositório ao lado do nome de usuário, escolha o check **Continuous Deployment (CD)**, clique em **detalhes** no lado direito. Na sessão **Deploy**, role  tela até a etapa **Upload do artefato do Build**, na linha 22, clique no [link de download ZIP](https://github.com/kauanvinicius9/Zuri/actions/runs/42808523256/artifacts/13761346040).

## CI

1- Instale as Dependências

```powershell
npm ci
```

2- Verifique o Lint

```powersell
npm run lint
```

3- Execute o Build

```powershell
npm run build
```

## Requisitos

### Para Usar o Projeto

- NodeJS `20.19+` ou `22.13+` com `npm`;
- Git;
- Google Chrome para desktop, versão 138 ou superior.

### Para Usar a IA Local (Opcional)

- Windows 10/11, macOS 13+, Linux ou ChromeOS em Chromebook Plus;
- Ao menos 22 GB livres no disco onde fica o perfil do Chrome;
- GPU com mais de 04 GB de VRAM, ou CPU com 16 GB de RAM e 04 núcleos ou mais;
- Internet no primeiro uso, para o Chrome baixar o modelo;
- Modelos locais aceitam **Francês**, **Inglês**, **Japonês**, **Espanhol** e **Alemão**. Conceitos em Português e Resumir podem exigir a chave do Gemini.

### Sem IA Local

-  Uma chave de API do Gemini, podendo adquirir na [Google AI Studio](https://aistudio.google.com) informada nas configurações da extensão.

> [!WARNING]
Chrome para Android e IOS não é suportado

## Dependências

> tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client", "chrome"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

## Ferramentas

<div align="left">
    <img src="./src/assets/tools/eslint-icon.svg" alt="ESLint" width="40" title="ESLint" />
    <img src="./src/assets/tools/nodejs-icon.svg" alt="NodeJS" width="40" title="NodeJS" />
    <img src="./src/assets/tools/react-icon.svg" alt="React" width="40" title="React" />
    <img src="./src/assets/tools/typescript-icon.svg" alt="TypeScript" width="40" title="TypeScript" />
    <img src="./src/assets/tools/vite-icon.svg" alt="Vite" width="40" title="Vite" />
    <img src="./src/assets/tools/tailwindcss-icon.svg" alt="TailwindCSS" width="40" title="TailwindCSS" />
</div>
