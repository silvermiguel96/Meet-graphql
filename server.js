const { ApolloServer } = require('apollo-server');
// Referencia de la query
const stdents = [
    {name: "Miguel", lastName: "Rendon", email: "silvermiguel96@gmail.com"},
    {name: "segundo", lastName: "segundolast", email: "correo2@gmail.com"},
    {name: "juan", lastName: "estba", email: "corre3@gmail.com"},
    {name: "lus", lastName: "carlo", email: "correo4@gmail.com"}
]
// Definimos el schema

const typeDefs =  `

    type Student {
        name: String,
        lastName: String,
        email: String
    }

    type Query {
        students: [Student]
    }
`
const resolvers = {
    Query: {
        students(root, args , contexto){
            return stdents;
        }
    }
}
// Conection a la base de da tos 
const server = new ApolloServer({ typeDefs, resolvers })

server.listen()
.then(({ url }) => console.log(`Server running on the url ${url}`))