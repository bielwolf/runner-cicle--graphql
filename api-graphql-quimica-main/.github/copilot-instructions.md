# Instruções para Agentes AI - API GraphQL Química

## Visão Geral da Arquitetura

Esta é uma **API GraphQL de tabela periódica** construída com:
- **Apollo Server Express**: servidor GraphQL integrado com Express.js
- **Express**: middleware HTTP para servir a API em http://localhost:4000/graphql
- **Estrutura monolítica**: um único arquivo (`index.js`) contém schema, resolvers, dados em memória e configuração do servidor

### Fluxo de Dados
1. Dados: Array `elementos` com 50 elementos químicos (id, nome, massaAtomica, numeroAtomico)
2. Schema GraphQL (`typeDefs`): define tipo `Elemento` e operações disponíveis
3. Resolvers: implementam lógica de consulta/mutação diretamente no array
4. Servidor: inicia em porta 4000 após `server.start()`

## Padrões do Projeto

### Query e Mutation
- **`elementos`**: retorna lista completa do array
- **`elemento(id)`**: busca por ID (conversão necessária: string → int)
- **`adicionarElemento`**: insere novo elemento no array com ID incremental

### Dados em Memória
- Sem persistência em banco de dados (array é perdido ao reiniciar)
- IDs gerados como `elementos.length + 1` (simples, não garante unicidade em mutações simultâneas)
- Nota: comentário original indica que esta geração poderia ser melhorada

## Workflow de Desenvolvimento

### Iniciar o servidor
```bash
npm install  # instalar dependências (apollo-server-express, express, graphql)
node index.js
```
Servidor fica disponível em `http://localhost:4000/graphql` (inclui Apollo Sandbox para testar queries)

### Estrutura de Scripts
- Sem scripts de teste, build ou watch configurados
- Execução direta: `node index.js`

## Convenções e Decisões de Design

- **Nomes em português**: schema, tipos e dados usam nomenclatura português (elemento, massaAtomica, numeroAtomico)
- **ID como string em GraphQL**: schema define `ID!`, resolvers fazem casting para `parseInt(id)`
- **Sem validação**: servidor não valida entrada (ex: numeroAtomico negativo é aceito)
- **Sem tratamento de erro**: mutações não verificam duplicatas ou limites
- **Sem autenticação/autorização**: API pública, sem proteção

## Pontos de Extensão Comuns

Melhorias típicas solicitadas:
- **Persistência**: conectar a MongoDB/PostgreSQL em vez de array em memória
- **Validação**: adicionar campo `error` em Mutation ou usar `@directive` customizadas
- **Paginação**: implementar `first`, `after` para `elementos`
- **ID único**: usar UUID ou sequenciador de banco de dados
- **Autenticação**: adicionar middleware Express ou directive GraphQL

## Dependências Críticas

```json
{
  "apollo-server-express": "^3.13.0",  // Servidor GraphQL
  "express": "^4.18.3",                // Framework HTTP
  "graphql": "^16.8.1"                 // Parser GraphQL
}
```

Versão Node.js: recomendado 14+
