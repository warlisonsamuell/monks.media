# 🚗 Monks.media — Case de Engenharia e Análise de Dados

Pipeline completo de **ETL e análise de dados** de vendas de veículos: limpeza de bases corrompidas, integração via SQL e análise exploratória com Python.

![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-yellow)
![SQL](https://img.shields.io/badge/SQL-JOIN-blue)
![Python](https://img.shields.io/badge/Python-pandas%20%7C%20matplotlib-green)
![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-orange)

> Este é um projeto de **Data Engineering / Data Analysis** (ETL + BI)— o foco é tratar dados sujos e extrair respostas de negócio a partir deles.

---

## 📌 Sobre o projeto

O desafio parte de **duas bases de dados corrompidas** (`broken_database_1.json` e `broken_database_2.json`) contendo dados de vendas de veículos. Os problemas incluíam:

- Caracteres inválidos (`æ`, `ø`) trocados por letras corretas (`a`, `o`)
- Valores numéricos armazenados como texto (ex.: `"2"` em vez de `2`)
- Dados espalhados em duas tabelas separadas que precisavam ser unidas

A solução percorre três etapas até chegar às respostas de negócio.

---

## 🔄 Pipeline

### 1️⃣ Limpeza dos dados — `correcao.js` (Node.js)

Lê os dois JSONs corrompidos, corrige os caracteres inválidos, converte strings numéricas em números reais e exporta as versões corrigidas:

- `banco_corrigido_broken_database_1.json`
- `banco_corrigido_broken_database_2.json`

```bash
node correcao.js
```

### 2️⃣ Integração — `importaca_e_exportacao.sql`

Importa as duas bases corrigidas e faz um `INNER JOIN` (chave `id_marca`) para gerar uma **tabela única** consolidada, exportada como `tabela_unica.csv`.

```sql
CREATE TABLE tabela_unica AS
SELECT b1.*, b2.*
FROM banco_corrigido_broken_database_1 b1
INNER JOIN banco_corrigido_broken_database_2 b2
  ON b1.c2 = b2.c1;
```

### 3️⃣ Análise — `Tratamento_dado_py.ipynb` (Python)

Com **pandas** e **matplotlib**, o notebook trata a tabela única (renomeia colunas, remove duplicadas) e responde às perguntas de negócio com tabelas e gráficos:

- 🏆 Marca com maior **volume de vendas**
- 💰 Veículo de **maior e menor receita**
- 📊 **Receita por venda** por marca (eficiência de faturamento)
- 📈 Total de vendas por veículo e **média de vendas** por marca

---

## 📁 Estrutura

```
monks_media_case_code/
├── broken_database_1.json              # base bruta corrompida
├── broken_database_2.json              # base bruta corrompida
├── correcao.js                         # etapa 1 — limpeza (Node.js)
├── banco_corrigido_broken_database_1.json
├── banco_corrigido_broken_database_2.json
├── importaca_e_exportacao.sql          # etapa 2 — integração (SQL)
├── tabela_unica.csv                    # tabela consolidada
├── tabela_unica_com_titulo.csv
├── Tratamento_dado_py.ipynb            # etapa 3 — análise (Python)
└── RELATÓRIO DE VENDAS.pdf             # relatório final
```

---

## 🛠️ Tecnologias

| Etapa                  | Ferramenta                  |
| ---------------------- | --------------------------- |
| Limpeza de dados       | JavaScript (Node.js, `fs`)  |
| Integração             | SQL (`INNER JOIN`)          |
| Análise e visualização | Python — pandas, matplotlib |
| Ambiente               | Jupyter Notebook            |

---

## ▶️ Como executar

```bash
# 1. Corrigir as bases
node correcao.js

# 2. Rodar o script SQL no seu banco para gerar a tabela única

# 3. Abrir e executar o notebook
pip install pandas matplotlib
jupyter notebook Tratamento_dado_py.ipynb
```

> No notebook, ajuste o caminho `read_csv("/content/tabela_unica.csv")` para o local do arquivo no seu ambiente.

---

## 📊 Resultados

Os principais insights (marca líder em volume, veículos de maior/menor receita, eficiência de faturamento por marca) estão consolidados em **`RELATÓRIO DE VENDAS.pdf`** e nos gráficos gerados pelo notebook.

---

## 👤 Autor

**Warlison** — Case técnico Monks.media
