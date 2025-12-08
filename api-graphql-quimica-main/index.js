const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const elementos = [
    { id: 1, nome: "Hidrogênio", massaAtomica: 1.008, numeroAtomico: 1 },
    { id: 2, nome: "Hélio", massaAtomica: 4.002602, numeroAtomico: 2 },
    { id: 3, nome: "Lítio", massaAtomica: 6.94, numeroAtomico: 3 },
    { id: 4, nome: "Berílio", massaAtomica: 9.012182, numeroAtomico: 4 },
    { id: 5, nome: "Boro", massaAtomica: 10.81, numeroAtomico: 5 },
    { id: 6, nome: "Carbono", massaAtomica: 12.011, numeroAtomico: 6 },
    { id: 7, nome: "Nitrogênio", massaAtomica: 14.007, numeroAtomico: 7 },
    { id: 8, nome: "Oxigênio", massaAtomica: 15.999, numeroAtomico: 8 },
    { id: 9, nome: "Flúor", massaAtomica: 18.998403163, numeroAtomico: 9 },
    { id: 10, nome: "Neônio", massaAtomica: 20.1797, numeroAtomico: 10 },
    { id: 11, nome: "Sódio", massaAtomica: 22.98976928, numeroAtomico: 11 },
    { id: 12, nome: "Magnésio", massaAtomica: 24.305, numeroAtomico: 12 },
    { id: 13, nome: "Alumínio", massaAtomica: 26.9815385, numeroAtomico: 13 },
    { id: 14, nome: "Silício", massaAtomica: 28.085, numeroAtomico: 14 },
    { id: 15, nome: "Fósforo", massaAtomica: 30.973761998, numeroAtomico: 15 },
    { id: 16, nome: "Enxofre", massaAtomica: 32.06, numeroAtomico: 16 },
    { id: 17, nome: "Cloro", massaAtomica: 35.45, numeroAtomico: 17 },
    { id: 18, nome: "Argônio", massaAtomica: 39.948, numeroAtomico: 18 },
    { id: 19, nome: "Potássio", massaAtomica: 39.0983, numeroAtomico: 19 },
    { id: 20, nome: "Cálcio", massaAtomica: 40.078, numeroAtomico: 20 },
    { id: 21, nome: "Scândio", massaAtomica: 44.955908, numeroAtomico: 21 },
    { id: 22, nome: "Titânio", massaAtomica: 47.867, numeroAtomico: 22 },
    { id: 23, nome: "Vanádio", massaAtomica: 50.9415, numeroAtomico: 23 },
    { id: 24, nome: "Crômio", massaAtomica: 51.9961, numeroAtomico: 24 },
    { id: 25, nome: "Manganês", massaAtomica: 54.938044, numeroAtomico: 25 },
    { id: 26, nome: "Ferro", massaAtomica: 55.845, numeroAtomico: 26 },
    { id: 27, nome: "Cobalto", massaAtomica: 58.933194, numeroAtomico: 27 },
    { id: 28, nome: "Níquel", massaAtomica: 58.6934, numeroAtomico: 28 },
    { id: 29, nome: "Cobre", massaAtomica: 63.546, numeroAtomico: 29 },
    { id: 30, nome: "Zinco", massaAtomica: 65.38, numeroAtomico: 30 },
    { id: 31, nome: "Gálio", massaAtomica: 69.723, numeroAtomico: 31 },
    { id: 32, nome: "Germânio", massaAtomica: 72.63, numeroAtomico: 32 },
    { id: 33, nome: "Arsênio", massaAtomica: 74.921595, numeroAtomico: 33 },
    { id: 34, nome: "Selênio", massaAtomica: 78.971, numeroAtomico: 34 },
    { id: 35, nome: "Bromo", massaAtomica: 79.904, numeroAtomico: 35 },
    { id: 36, nome: "Criptônio", massaAtomica: 83.798, numeroAtomico: 36 },
    { id: 37, nome: "Rubídio", massaAtomica: 85.4678, numeroAtomico: 37 },
    { id: 38, nome: "Estrôncio", massaAtomica: 87.62, numeroAtomico: 38 },
    { id: 39, nome: "Ítrio", massaAtomica: 88.90584, numeroAtomico: 39 },
    { id: 40, nome: "Zircônio", massaAtomica: 91.224, numeroAtomico: 40 },
    { id: 41, nome: "Nióbio", massaAtomica: 92.90637, numeroAtomico: 41 },
    { id: 42, nome: "Molibdênio", massaAtomica: 95.95, numeroAtomico: 42 },
    { id: 44, nome: "Rutênio", massaAtomica: 101.07, numeroAtomico: 44 },
    { id: 45, nome: "Ródio", massaAtomica: 102.90550, numeroAtomico: 45 },
    { id: 46, nome: "Paládio", massaAtomica: 106.42, numeroAtomico: 46 },
    { id: 47, nome: "Prata", massaAtomica: 107.8682, numeroAtomico: 47 },
    { id: 48, nome: "Cádmio", massaAtomica: 112.414, numeroAtomico: 48 },
    { id: 49, nome: "Índio", massaAtomica: 114.818, numeroAtomico: 49 },
    { id: 50, nome: "Estanho", massaAtomica: 118.710, numeroAtomico: 50 },
    { id: 51, nome: "Antimônio", massaAtomica: 121.760, numeroAtomico: 51 },
];

const typeDefs = gql`
  type Elemento {
    id: ID!
    nome: String
    massaAtomica: Float
    numeroAtomico: Int
  }

  type Query {
    elementos: [Elemento]
    elemento(id: ID!): Elemento
  }

  type Mutation {
    adicionarElemento(nome: String!, massaAtomica: Float!, numeroAtomico: Int!): Elemento
  }
  
`;

const resolvers = {
  Query: {
    elementos: () => elementos,
    elemento: (_, { id }) => elementos.find(elemento => elemento.id === parseInt(id)),
  },
  Mutation: {
    adicionarElemento: (_, { nome, massaAtomica, numeroAtomico }) => {
      const novoElemento = {
        id: elementos.length + 1, // Simples geração de ID, poderia ser melhorada
        nome,
        massaAtomica,
        numeroAtomico,
      };
      elementos.push(novoElemento);
      return novoElemento;
    },
  },
  
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.start().then(res => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
