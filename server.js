const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

const app = express()
const port = 3000


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('index', { data })
})

app.get('/add', (req, res) => {
    res.render('add')
})
app.post('/add', (req, res) => {
    data.push({ string: req.body.string, integer: parseInt(req.body.integer), float: parseFloat(req.body.float), date: req.body.date, boolean: JSON.parse(req.body.boolean) })
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    const index = req.params.id
    data.splice(index, 1);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.redirect('/');
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    res.render('edit', { item: data[id] })
})

app.post('/edit/:id', (req, res) => {
    data[req.params.id] = { string: req.body.string, integer: parseInt(req.body.integer), float: parseFloat(req.body.float), date: req.body.date, boolean: JSON.parse(req.body.boolean) }
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
    res.redirect('/')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})