import express from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import { __dirname } from './utils.js'

// import productManager from './ProductManager.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))


// ROUTES
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


app.get('/', (req, res) => {
    res.send('Ruta raiz')
})


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

