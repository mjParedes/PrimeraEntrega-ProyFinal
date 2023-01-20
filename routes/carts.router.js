import { Router } from 'express'
import CartManager from '../CartManager.js'
import ProductManager from '../ProductManager.js'
import fs from 'fs'


const cartManager = new CartManager('carrito.json')
const productManager = new ProductManager('products.json')
const path= 'carrito.json'


let carts = []

const router = Router()

router.get('/:cid', async (req, res) => {
  const {cid}= req.params
  try {
    const cart = await cartManager.getCartById(cid)
    if (cart) {
      res.status(200).json({message:'Carrito encontrado',cart})
    } else {
      res.status(400).json({error:'Carrito no existe'})
    }
  } catch (error) {
    res.send(error)
  }
})

router.post('/', async (req, res) => {
  let cart = req.body
  cart = await cartManager.addCart(cart)
  res.json({ message: "Carrito generado con exito", cart })
})

router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params
  const productos = await productManager.getProducts()
  const carritos = await cartManager.getCarts()
  const producto = productos.find((p) => p.id === parseInt(pid))
  const carrito = carritos.find((c) => c.id === parseInt(cid))

  if (!producto) {
    res.send("Producto no encontrado")
  }
  console.log(carrito)
  const index = carrito.products.findIndex((p) => p.producto === parseInt(pid))

  if (index === -1) {
    carrito.products.push({ producto: parseInt(pid), quantity: 1 })
  } else {
    carrito.products[index].quantity++
  }
  await fs.promises.writeFile(path,JSON.stringify(carritos))
  res.json({carritos})
})

export default router