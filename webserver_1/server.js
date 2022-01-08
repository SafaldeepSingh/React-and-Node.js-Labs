'use strict'

// let http = require('http')

// //create a server object:
// http.createServer(function(req, res) {
//     res.writeHead(200,{'Content-Type':'text/html'})
//    res.write('<h1>Hello World!</h1>')//write a response to the client
//    res.end()//end the response
//   }).listen(8000)
// the server object listens on port 8000

// EXPRESS

// use express framework,
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public_html'))

// use ejs template engine
app.set('view engine', 'ejs')

app.get('/products', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Product Catalog-blabla.com'
    pageData.description = 'Huge selection of products for all your needs'
    pageData.author = 'The blabla.com team'
    const products = [
        { id: 1, name: 'white shoes', price: '99.99' },
        { id: 2, name: 'black shoes', price: '69.99' },
        { id: 3, name: 'blue shoes', price: '79.99' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '<td>' + products[i].price + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('products', pageData)
})

app.get('/seasons', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Exercise 2'
    pageData.description = 'EJS Template Engine'
    pageData.author = 'Safaldeep Singh'
    const navbarLinksData = [
        { label: 'Home Page', link: '/' },
        { label: 'Bye Bye', link: '/byebye' },
        { label: 'chair', link: '/test-html' },
        { label: 'form_post.html', link: '/form_post.html' },
        { label: 'products', link: '/products' },
        { label: 'seasons', link: '/seasons' }
    ]
    const seasons = [
        { id: 1, name: 'Winter' },
        { id: 2, name: 'Summer' },
        { id: 3, name: 'Fall' },
        { id: 3, name: 'Spring' }
    ]
    pageData.content = '<ol>'
    for (let i = 0; i < seasons.length; i++) {
        pageData.content += '<li>' + seasons[i].name + '</li>'
    }
    pageData.content += '</ol>'

    pageData.navbarLinks = '<ul class="navbar-nav">'
    for (let i = 0; i < navbarLinksData.length; i++) {
        pageData.navbarLinks += '<li class="nav-item">'
        pageData.navbarLinks += '<a class="nav-link" href="' + navbarLinksData[i].link + '">' + navbarLinksData[i].label + '</a>'
        pageData.navbarLinks += '</li>'
    }
    pageData.navbarLinks += '</ul>'
    res.render('master_template', pageData)
})

// HOME PAGE http://localhost:8000
app.get('/',
    function (req, res) {
        res.send('<h1>Hello World</h1>')
    }
)
app.get('/byebye',
    function (req, res) {
        res.send('<h1>Bye Bye</h1>')
    }
)
app.get('/test-html',
    function (req, res) {
        res.sendFile(path.join(__dirname, 'test.html'))
    }
)

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/form_validate',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const username = request.body.username
        const password = request.body.password
        console.log('username=' + username + ' password=' + password)
        // process form, validate data …
        if (username === '' || password === '') {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('missing username or password')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('Thanks for submitting the form')
        }
    }
)

app.get('/test-param/:a/:b',
    function (req, res) {
        res.send(req.params.a + req.params.b)
    }
)

// LAST LINE OF CODE- START SERVER - ON PORT 8000
app.listen(8000, function () {
    console.log('Server listening to port 8000, go to http://localhost:8000')
})
