const { ApolloServer } = require('apollo-server');
// Referencia de la query
const stdents = [
    {id: 1,name: "Miguel", lastName: "Rendon", email: "silvermiguel96@gmail.com"},
    {id: 2,name: "segundo", lastName: "segundolast", email: "correo2@gmail.com"},
    {id: 3,name: "juan", lastName: "estba", email: "corre3@gmail.com"},
    {id: 4,name: "lus", lastName: "carlo", email: "correo4@gmail.com"}
]

const courses = [
    {name: "granphql", price: 15.20, students: [1, 3]},
    {name: "React", price: 12.20, students: [4, 2]},
    {name: "Vue", price: 13.20, students: [2, 1]},
]
// Definimos el schema

const typeDefs =  `

    type Student {
        name: String,
        fullName : String,
        lastName: String,
        courses: [Courses],
        email: String
    }

    type Courses {
        name: String,
        price: Float
    }

    type Query {
        students: [Student]
        courses: [Courses]
        hello(name: String!):
    }
    
    type Message{
        message: String
    }
`
const resolvers = {
    Query: {
        courses(root, args , contexto){
            return courses;
        },
        students(root, args , contexto){
            return stdents;
        },
        hello(root, args, contexto){
            return { message :`Hello , ${args.name}`}
        }
    },
    Student: {
        fullName(root, args, contexto){
            console.log(root)
            return `${root.name} ${root.lastName}`
        },
        courses(root, args, contexto){
            const results = courses.map(data => {
                const result  = data.students.find( _d => _d == root.id)
                if (result){
                    return data
                }
            })
            return results     
        }
    }
}
// Conection a la base de da tos 
const server = new ApolloServer({ typeDefs, resolvers })

server.listen()
.then(({ url }) => console.log(`Server running on the url ${url}`))