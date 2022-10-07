const mongoose = require('mongoose')

const Todo = require('./models/todo');
// on nodejs ver 17+ need to use 127.0.0.1 instead of localhost
mongoose.connect('mongodb://127.0.0.1:27017/todoApp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!")
    })
    .catch(err => {
        console.log("OOPS MONGO CONNECTION ERROR!!")
        console.log(err)
    })

const seedTodos = [
    {
        text: 'Feed Cat'
    },
    {
        text: 'Buy Groceries'
    },
    {
        text: 'Go to Gym'
    },
    {
        text: 'Finish 3 learning modules'
    }
]

Todo.insertMany(seedTodos)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
