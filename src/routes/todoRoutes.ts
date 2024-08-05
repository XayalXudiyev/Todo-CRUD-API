import express from "express";
import todoControllers from '../controllers/todoControllers'

const router = express.Router()

router.post('/todo', todoControllers.todoAdd)
router.get('/todo', todoControllers.todoGetAll)
router.put('/todo/:id', todoControllers.todoUpdate)
router.delete('/todo/:id', todoControllers.todoDelete)
router.get('/todo/:id', todoControllers.todoGet)


export default router 