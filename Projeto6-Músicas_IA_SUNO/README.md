# AI Music Pipeline: Do Curadoria ao Suno 🎵

> **Projeto de automação criativa e engenharia de prompt para geração de áudio por IA.**

Este repositório documenta uma atividade prática de integração entre ferramentas de IA Generativa para a criação de uma composição musical completa, desde a curadoria de estilo até a produção final de áudio.

---

## 🚀 Fluxo de Trabalho (Pipeline)

O projeto seguiu uma estrutura de três etapas fundamentais:

### 1. Curadoria e Exportação (Gems)

* **Atividade**: Criação de uma lista personalizada com 10 músicas representativas de um gênero específico.


* **Ação**: A lista foi exportada e anexada ao **Gems** (versão personalizada do Gemini), servindo como a principal base de conhecimento para o modelo.



### 2. Engenharia de Prompt e Composição

* **Objetivo**: Utilizar o Gems para elaborar uma letra e estrutura musical original.


* **Processamento**: O Gems analisou o estilo, a rítmica e os padrões das 10 músicas fornecidas para gerar uma nova composição que respeitasse a identidade sonora do gênero escolhido.



### 3. Produção de Áudio (Suno AI)

* **Finalização**: A letra e as instruções de estilo geradas pelo Gems foram inseridas no **Suno AI**.


* **Resultado**: Utilização do sistema de criação automática do Suno para converter o texto em uma faixa de áudio completa, com melodia, harmonia e vocais.



---

## 🛠 Tecnologias Utilizadas

| Ferramenta | Função no Projeto |
| :--- | :--- |
| **Gemini (Gems)** | Processamento da base de conhecimento (10 músicas) e composição da letra. |
| **Suno AI** | Sistema de criação automática para geração da faixa de áudio completa. |
| **Google AI Studio** | Interface para engenharia de prompt e estruturação do conhecimento. |

---

## 📋 Requisitos e Execução

Para replicar este projeto, siga estes passos:

1. **Defina sua Base:** Escolha 10 faixas que definam bem o estilo que você deseja explorar.


2. **Configure seu Gem:** Crie um Gem personalizado e anexe a lista. Use um prompt estruturado como: *"Com base nestas 10 músicas, elabore uma nova composição seguindo o mesmo estilo e métrica"*.


3. **Produza no Suno:** Leve a letra gerada para o modo "Custom" do Suno AI, insira o estilo de música e gere as versões.



---

## 🧠 Aprendizados

Este projeto demonstra como a **IA Generativa Multimodal** pode ser encadeada: uma IA atua como curadora e roteirista (Gemini), enquanto outra assume o papel de produtora musical e intérprete (Suno).

---

**Desenvolvido por:** José Rodrigues Pereira Júnior

**Contexto:** Atividade Prática de IA e Criatividade Digital.
