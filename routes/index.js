const route = require('express').Router()

const path = require('path')

route.get('/',(req,res)=>res.sendFile(path.join(__dirname,'./../views/index.html')))
// route.get('/addPlato', (req, res) => res.sendFile(path.join(__dirname, 'views', 'Formulario.html')));

route.get('/addPlato',(req,res)=>res.sendFile(path.join(__dirname,'../views/Formulario.html')))

module.exports = route