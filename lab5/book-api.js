const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

let books = []

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.post('/book', (req, res) => {
    const book = req.body

    console.log(book)
    books.push(book)

    res.send('Added to book array')
})

app.get('/books', (req, res) => {
    res.json(books)
})

app.get('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn
    const book = books.find((book) => book.isbn === isbn);
    res.json(book)

    // // remove item from the books array
    // for (let i = 0; i < books.length; i++) {
    //     let book = books[i]
    //     if (book.isbn === isbn) {
    //         // sending 404 when not found something is a good practice
    //         res.send(book)
    //     }
    // }
})

app.post('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn
    const newBook = req.body
    // remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books[i] = newBook
            // sending 404 when not found something is a good practice
            res.send('Book is edited')
        }
    }
})

app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn
    books = books.filter(book => book.isbn !== isbn)
    res.send('Book is deleted from list')
})

app.listen(port, () => console.log('Hello World app listening on port: ' + port))