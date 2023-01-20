import { Router } from 'express'
import { upload } from '../middlewares/multer.js'
import ProductManager from '../ProductManager.js'



const productManager = new ProductManager('products.json')
let products = []

const router = Router()


router.get('/', async (req, res) => {
  const { limit } = req.query
  products = await productManager.getProducts(limit || 'max')
  res.json([{ products }])
})


router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  try {
    const product = await productManager.getProductsById(pid)
    if(product){
      res.status(200).json({message:"Producto econtrado con exito",product})
    } else{
      res.status(400).json({error:"No existe producto con ese ID"})
    }
  } catch (error) {
    res.send(error)
  }
})


router.post('/', upload.single('thumbnails'), async (req, res) => {
  let product = req.body
  products = await productManager.getProducts()
  product = await productManager.addProduct(product)
  products.push(product)
  if(product){
    res.json({ message: "Producto agregado con exito", product })
  } else {
    res.json({error:"Error en la carga de datos, ingreselos correctamente"})
  }
})

router.put('/:pid', async (req, res) => {
  const {pid} = req.params
  const change = req.body
  const producto = await productManager.updateProduct(parseInt(pid),change)
  res.json({message: "Producto actualizado con exito", producto})

})

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params
  const product = await productManager.deleteProduct(parseInt(pid))
  res.json({ message: "Producto eliminado con exito",product})
})


export default router