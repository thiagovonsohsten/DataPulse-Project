# DataPulse - Análise de Dados de Redes Sociais

## 📊 Sobre o Projeto

DataPulse é uma aplicação web moderna para análise interativa de dados de redes sociais, com foco especial na Geração Z. A plataforma permite carregar, visualizar, filtrar e exportar dados de forma intuitiva e eficiente.

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
- A aplicação carrega dados de um arquivo CSV localizado em `src/data/`
- Utiliza Papa Parse para processamento eficiente de arquivos CSV
- Implementa tratamento de erros e feedback visual durante o carregamento

### 2. Transformação de Dados
- Os dados brutos são transformados em um formato otimizado para visualização
- Processo de limpeza e normalização dos dados
- Estruturação em objetos TypeScript tipados

### 3. Sistema de Filtros
- Filtros por tipo de segmento
- Filtros por descrição do segmento
- Filtros por respostas
- Sistema de filtros dependentes (filtros em cascata)

### 4. Visualização de Dados
- Dashboard interativo com múltiplos gráficos
- Tabela de dados com paginação
- Gráficos responsivos usando Recharts
- Visualizações específicas para diferentes tipos de dados

### 5. Exportação de Dados
- Exportação para CSV
- Exportação para PDF
- Opção de exportar dados filtrados ou completos

## 📊 Componentes Principais

### FilterPanel
- Interface para aplicação de filtros
- Filtros dinâmicos baseados nos dados disponíveis
- Botão de limpar filtros

### Dashboard
- Visualizações gráficas interativas
- Gráficos de barras, pizza e linha
- Estatísticas resumidas

### DataTable
- Tabela paginada com dados
- Ordenação por colunas
- Visualização responsiva

### ExportButtons
- Interface para exportação de dados
- Múltiplos formatos de exportação
- Feedback visual do processo

## 🔄 Fluxo de Dados

1. **Carregamento Inicial**
   - Leitura do arquivo CSV
   - Transformação dos dados
   - Armazenamento no estado da aplicação

2. **Processamento de Filtros**
   - Aplicação de filtros selecionados
   - Atualização dinâmica das visualizações
   - Manutenção da performance com React Query

3. **Visualização**
   - Renderização de gráficos
   - Atualização da tabela
   - Feedback em tempo real

## 🎨 Interface do Usuário

- Design moderno e responsivo
- Tema claro/escuro
- Feedback visual para todas as ações
- Loading states e mensagens de erro
- Interface intuitiva e acessível

## 📈 Análise de Dados

### 1. Processo de Análise

#### 1.1 Coleta e Preparação
- **Carregamento de Dados**
  - Leitura do arquivo CSV usando Papa Parse
  - Validação da estrutura dos dados
  - Tratamento de valores nulos ou inválidos
  - Normalização de formatos (datas, números, textos)

- **Transformação Inicial**
  - Conversão de tipos de dados
  - Padronização de categorias
  - Criação de campos derivados
  - Agregação de dados similares

#### 1.2 Análise Exploratória
- **Análise Descritiva**
  - Estatísticas básicas (média, mediana, moda)
  - Distribuição de frequências
  - Identificação de outliers
  - Correlações entre variáveis

- **Segmentação de Dados**
  - Agrupamento por demografia
  - Análise por faixa etária
  - Comportamento por rede social
  - Padrões de uso e preferências

### 2. Visualizações e Insights

#### 2.1 Gráficos Principais
- **Gráficos de Distribuição**
  - Gráficos de barras para comparação direta
  - Gráficos de pizza para proporções
  - Histogramas para distribuição de frequências
  - Box plots para análise de dispersão

- **Análise Temporal**
  - Gráficos de linha para tendências
  - Gráficos de área para volume
  - Heatmaps para padrões temporais
  - Comparativos período a período

#### 2.2 Análises Específicas
- **Análise de Redes Sociais**
  - Preferências por plataforma
  - Frequência de uso
  - Padrões de engajamento
  - Comportamento por faixa etária

- **Análise de Conteúdo**
  - Tipos de conteúdo mais consumidos
  - Temas mais populares
  - Padrões de compartilhamento
  - Sentimento das interações

### 3. Métricas e KPIs

#### 3.1 Métricas Principais
- **Engajamento**
  - Taxa de interação
  - Tempo médio de uso
  - Frequência de acesso
  - Padrões de compartilhamento

- **Preferências**
  - Plataformas mais utilizadas
  - Tipos de conteúdo preferidos
  - Horários de maior atividade
  - Padrões de consumo

#### 3.2 Análise Comparativa
- **Comparativos Demográficos**
  - Diferenças por gênero
  - Variações por faixa etária
  - Padrões regionais
  - Influências culturais

- **Análise de Tendências**
  - Evolução temporal
  - Mudanças de comportamento
  - Novos padrões emergentes
  - Previsões baseadas em dados históricos

### 4. Processamento e Otimização

#### 4.1 Técnicas de Processamento
- **Agregação de Dados**
  - Somas e médias por categoria
  - Agrupamentos dinâmicos
  - Cálculos em tempo real
  - Otimização de consultas

- **Filtragem Avançada**
  - Filtros combinados
  - Busca por padrões
  - Exclusão de outliers
  - Normalização de dados

#### 4.2 Performance e Escalabilidade
- **Otimização de Consultas**
  - Índices de busca
  - Cache de resultados
  - Lazy loading de dados
  - Paginação eficiente

- **Processamento em Tempo Real**
  - Atualizações dinâmicas
  - Cálculos sob demanda
  - Feedback imediato
  - Sincronização de dados

### 5. Exportação e Relatórios

#### 5.1 Formatos de Exportação
- **CSV**
  - Dados brutos
  - Dados processados
  - Dados filtrados
  - Metadados

- **PDF**
  - Relatórios formatados
  - Gráficos e visualizações
  - Análises detalhadas
  - Documentação técnica

#### 5.2 Personalização
- **Filtros de Exportação**
  - Seleção de campos
  - Filtros temporais
  - Agrupamentos
  - Formatação personalizada

- **Templates**
  - Layouts predefinidos
  - Estilos personalizados
  - Configurações salvas
  - Exportação em lote

## 🔒 Segurança e Performance

- Validação de dados
- Tratamento de erros
- Otimização de performance
- Lazy loading de componentes
- Caching de dados

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


