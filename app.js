const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const app = express()

const Todo = require('./models/todo')

mongoose.connect('mongodb://localhost/todo-list', {useNewUrlParser: true, 
    useUnifiedTopology: true})

// check the DB connection 
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//other way to check connection
// mongoose.connect('mongodb://localhost:27017/tryDB', {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
// }).then(()=>{
//     console.log('Connect to MongoDB.')
// }).catch(err =>{
//     console.log('Connection failed.')
//     console.log(err)
// })


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//讓req.body 的資料能被使用
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res)=>{
    res.render('intro')
})

app.get('/todos', (req, res)=>{
    Todo.find() //取出資料
    .lean() //Mongoose model to JS object
    .then(
        todos => res.render('index', {todos}) //傳資料給 index
    ).catch(
        e => console.error(e)
    )
})


//new todo feature
app.get('/todos/new', (req, res) =>{
    res.render('new')
})

app.post('/todos', (req, res)=>{
    const name = req.body.name
    console.log(name)
    return Todo.create({name})
        .then(()=> res.redirect('/todos'))
        .catch(e =>{ console.error(e)})
})

//view certain todo
app.get('/todos/:id', (req, res)=>{
    const id = req.params.id
    return Todo.findById(id)
      .lean()
      .then((todo) => res.render('detail', { todo }))
      .catch(error => console.log(error))
 
})

//edit todo
app.get('/todos/:id/edit', (req, res)=>{

    const id = req.params.id
    return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//update todo
app.post('/todos/:id/edit', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    return Todo.findById(id)
      .then(todo => {
        todo.name = name
        return todo.save()
      })
      .then(()=> res.redirect(`/todos/${id}`))
      .catch(error => console.log(error))
  })


app.listen(3000, ()=>{
    console.log('App is running on http://localhost:3000!')
})

