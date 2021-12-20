const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const app = express()

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



app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(3000, ()=>{
    console.log('App is running on http://localhost:3000!')
})

