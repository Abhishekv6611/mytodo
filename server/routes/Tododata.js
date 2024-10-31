import express from 'express'
import { GetProduct,PostTodo,DeletedProduct,EditedProduct } from '../controllers/TodoControls.js'


const router=express.Router()

router.get('/',GetProduct)
router.post('/post',PostTodo)
router.delete('/delete/:id',DeletedProduct)
router.put('/edit/:id',EditedProduct)

export default router;


