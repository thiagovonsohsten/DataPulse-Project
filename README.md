# DataPulse - Análise de Dados de Redes Sociais

## 📊 Sobre o Projeto

DataPulse é uma aplicação web moderna para análise interativa de dados de redes sociais, com foco especial na Geração Z. A plataforma permite carregar, visualizar, filtrar e exportar dados de forma intuitiva e eficiente, com interface totalmente em português.

## 🚀 Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- TailwindCSS
- Shadcn/UI
- React Query
- React Router
- Recharts
- Papa Parse (para processamento CSV)
- jsPDF (para exportação em PDF)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
bun install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
bun dev
```

## 📋 Processo de Análise de Dados

### 1. Carregamento de Dados
- A aplicação carrega dados de um arquivo CSV localizado em `src/data`
- Utiliza Papa Parse para processamento eficiente de arquivos CSV
- Implementa tratamento de erros e feedback visual durante o carregamento
- Suporte a múltiplos formatos de dados e normalização automática

### 2. Transformação de Dados
- Os dados brutos são transformados em um formato otimizado para visualização
- Processo de limpeza e normalização dos dados
- Estruturação em objetos TypeScript tipados
- Tradução automática de campos para português
- Normalização de valores (ex: gênero, plataformas)

### 3. Sistema de Filtros
- Filtros por tipo de segmento
- Filtros por descrição do segmento
- Filtros por respostas
- Sistema de filtros dependentes (filtros em cascata)
- Interface intuitiva com feedback visual
- Botão de limpar filtros

### 4. Visualização de Dados
- Dashboard interativo com múltiplos gráficos
- Sistema de abas para organização das visualizações:
  - Visão Geral
  - Plataformas
  - Demografia
  - Tendências
- Gráficos responsivos usando Recharts:
  - Gráfico de Barras para plataformas mais utilizadas
  - Gráfico de Radar para distribuição de popularidade
  - Gráfico de Dispersão para análise de engajamento
  - Gráfico de Pizza para distribuição por gênero
  - Gráfico de Linha para análise de tendências
  - Gráfico de Área para comparação de crescimento
- Tabela de dados com paginação
- Tooltips informativos em todos os gráficos
- Legendas interativas

### 5. Exportação de Dados
- Exportação para CSV com formatação adequada
- Exportação para PDF com layout profissional
- Opção de exportar dados filtrados ou completos
- Nomes de arquivos com data de geração
- Feedback visual do processo de exportação

## 📊 Componentes Principais

### FilterPanel
- Interface para aplicação de filtros
- Filtros dinâmicos baseados nos dados disponíveis
- Botão de limpar filtros
- Feedback visual da seleção
- Suporte a filtros dependentes

### Dashboard
- Visualizações gráficas interativas organizadas em abas
- Gráficos de barras, pizza, radar, dispersão, linha e área
- Estatísticas resumidas em cards
- Tooltips informativos
- Legendas interativas
- Responsividade em diferentes tamanhos de tela

### DataTable
- Tabela paginada com dados
- Ordenação por colunas
- Filtros por coluna
- Visualização responsiva
- Formatação de números e percentuais
- Indicadores de ordenação

### ExportButtons
- Interface para exportação de dados
- Múltiplos formatos de exportação (CSV, PDF)
- Feedback visual do processo
- Contagem de registros a serem exportados
- Nomes de arquivos com data

## 🔄 Fluxo de Dados

1. **Carregamento Inicial**
   - Leitura do arquivo CSV
   - Transformação dos dados
   - Tradução automática de campos
   - Armazenamento no estado da aplicação

2. **Processamento de Filtros**
   - Aplicação de filtros selecionados
   - Atualização dinâmica das visualizações
   - Manutenção da performance com React Query
   - Feedback visual das mudanças

3. **Visualização**
   - Renderização de gráficos
   - Atualização da tabela
   - Feedback em tempo real
   - Tooltips informativos

## 🎨 Interface do Usuário

- Design moderno e responsivo
- Interface totalmente em português
- Feedback visual para todas as ações
- Loading states e mensagens de erro
- Interface intuitiva e acessível
- Tooltips informativos
- Animações suaves
- Cores consistentes e agradáveis

## 📈 Análise de Dados

### 1. Processo de Análise

#### 1.1 Coleta e Preparação
- **Carregamento de Dados**
  - Leitura do arquivo CSV usando Papa Parse
  - Validação da estrutura dos dados
  - Tratamento de valores nulos ou inválidos
  - Normalização de formatos (datas, números, textos)
  - Tradução automática de campos

- **Transformação Inicial**
  - Conversão de tipos de dados
  - Padronização de categorias
  - Criação de campos derivados
  - Agregação de dados similares
  - Normalização de valores

#### 1.2 Análise Exploratória
- **Análise Descritiva**
  - Estatísticas básicas (média, mediana, moda)
  - Distribuição de frequências
  - Identificação de outliers
  - Correlações entre variáveis
  - Visualizações interativas

- **Segmentação de Dados**
  - Agrupamento por demografia
  - Análise por faixa etária
  - Comportamento por rede social
  - Padrões de uso e preferências
  - Filtros dinâmicos

### 2. Visualizações e Insights

#### 2.1 Gráficos Principais
- **Gráficos de Distribuição**
  - Gráficos de barras para comparação direta
  - Gráficos de pizza para proporções
  - Gráficos de radar para distribuição
  - Gráficos de dispersão para correlações
  - Gráficos de linha para tendências
  - Gráficos de área para volume

#### 2.2 Análises Específicas
- **Análise de Redes Sociais**
  - Preferências por plataforma
  - Frequência de uso
  - Padrões de engajamento
  - Comportamento por demografia
  - Tendências temporais

### 3. Métricas e KPIs

#### 3.1 Métricas Principais
- **Engajamento**
  - Taxa de interação
  - Tempo médio de uso
  - Frequência de acesso
  - Padrões de compartilhamento
  - Análise de tendências

- **Preferências**
  - Plataformas mais utilizadas
  - Tipos de conteúdo preferidos
  - Horários de maior atividade
  - Padrões de consumo
  - Comparativos demográficos

### 4. Processamento e Otimização

#### 4.1 Técnicas de Processamento
- **Agregação de Dados**
  - Somas e médias por categoria
  - Agrupamentos dinâmicos
  - Cálculos em tempo real
  - Otimização de consultas
  - Cache de resultados

- **Filtragem Avançada**
  - Filtros combinados
  - Busca por padrões
  - Exclusão de outliers
  - Normalização de dados
  - Feedback visual

### 5. Exportação e Relatórios

#### 5.1 Formatos de Exportação
- **CSV**
  - Dados brutos
  - Dados processados
  - Dados filtrados
  - Metadados
  - Formatação adequada

- **PDF**
  - Relatórios formatados
  - Gráficos e visualizações
  - Análises detalhadas
  - Documentação técnica
  - Layout profissional

## 🔒 Segurança e Performance

- Validação de dados
- Tratamento de erros
- Otimização de performance
- Lazy loading de componentes
- Caching de dados
- Feedback visual de erros
- Mensagens em português

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
