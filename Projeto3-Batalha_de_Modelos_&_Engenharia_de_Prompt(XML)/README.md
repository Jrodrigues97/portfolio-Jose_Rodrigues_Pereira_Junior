# 🤖 Benchmark de LLMs: Prompt Estruturado em XML

## 📝 Descrição do Projeto
Este projeto consiste em um estudo comparativo de **Large Language Models (LLMs)** focado na precisão técnica e conformidade de instruções. O objetivo central é avaliar como diferentes arquiteturas de IA (ChatGPT, Gemini, Claude, entre outras) interpretam e executam um **Prompt Estruturado em XML** para a geração de código Front-end (HTML/CSS).

Desenvolvido para a disciplina de **Inteligência Artificial**, o experimento busca ir além da estética, focando na "metacognição" e na análise de como cada modelo respeita restrições rígidas, tags específicas e padrões de cores definidos, mitigando alucinações e desvios de diretrizes.

![Interface Gerada e Comparativo](IMAGEM_1_AQUI)
*Figura 1: Exemplo de página gerada via prompt XML e interface de teste.*

## 🚀 Tecnologias Utilizadas
* **Linguagens:** HTML5, CSS3, XML (Estruturação de Prompt)
* **Modelos Testados:** ChatGPT, Gemini, Claude, Qwen, DeepSeek, Grok, Maritaca
* **Ferramentas:** Dispositivos móveis para submissão, Navegadores Web para renderização

## 📊 Resultados e Aprendizados
A análise técnica revelou nuances significativas entre as arquiteturas de cada IA:
* **Fidelidade ao XML:** Avaliei se as IAs ignoraram tags customizadas ou se mantiveram a estrutura hierárquica solicitada.
* **Respeito às Cores e Estilo:** Verifiquei se os valores hexadecimais e regras de CSS inline/interno foram seguidos à risca.
* **Eficiência de Tokens:** Registrei a verbosidade de cada modelo, identificando qual entrega o melhor resultado com o menor consumo de recursos.

| Critério | Melhor Performance | Observação Técnica |
| :--- | :--- | :--- |
| **Compreensão XML** | [NOME_DA_IA] | Menor índice de tags ignoradas. |
| **Precisão de CSS** | [NOME_DA_IA] | Fidelidade absoluta à paleta de cores. |
| **Economia de Tokens**| [NOME_DA_IA] | Resposta direta sem excesso de texto explicativo. |

![Gráfico de Consumo de Tokens](IMAGEM_2_AQUI)
*Figura 2: Comparativo de verbosidade e consumo de tokens por modelo.*

## 🔧 Como Executar
1. Copie o código do **Prompt XML** estruturado no repositório.
2. Submeta o prompt para as diferentes IAs listadas via celular.
3. Cole o código gerado em um editor (como VS Code ou CodePen).
4. Compare a saída com os requisitos estritos do XML original.

![Pipeline do Experimento](IMAGEM_3_AQUI)
*Figura 3: Fluxo de submissão, coleta de dados e análise crítica.*

## 🧠 Reflexão Crítica (Fink)
* **Compreensão:** O modelo que demonstrou maior domínio do XML foi o [NOME], pois não tentou "corrigir" a estrutura para texto plano.
* **Verbosidade:** Houve uma variação de até [X]% no consumo de tokens entre o modelo mais conciso e o mais prolixo.
* **Escolha Profissional:** Para **prototipagem rápida**, a ferramenta [NOME] se destaca pela velocidade; para **códigos complexos**, a ferramenta [NOME] é superior devido à sua aderência estrita a restrições de arquitetura.

---
[Voltar ao início](https://github.com/Jrodrigues97/portfolio-jose-rodrigues-pereira-junior)
