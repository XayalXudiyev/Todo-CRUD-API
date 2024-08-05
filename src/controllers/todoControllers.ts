import { Request, Response } from 'express';
import MODEL from '../models/todoModel'

const todoAdd = async (req: Request, res: Response) => {

    try {
        const _todo = await MODEL.findOne({ name: req.body.name })
        if (_todo) {
            return res.status(400).json({
                success: false,
                message: "Already exist user!!!"
            })
        }
        const newTodo = new MODEL(req.body)
        await newTodo.save()
            .then(() => {
                return res.status(200).json(newTodo)
            })
            .catch(() => {
                return res.status(404).json({
                    success: false,
                    message: "Record created error"
                })
            })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Not a record"
        })
    }
}

const todoGetAll = async (req: Request, res: Response) => {
    const page =  parseInt(req.query.page as string) || 1;
    const limit = 2
    const skip = (page - 1) * limit

    try {
        const _todos = await MODEL.find({}).limit(limit).skip(skip)
        return res.status(200).json({
            success: true,
            data: _todos
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Record not found"
        })
    }
}

const todoUpdate = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const todo = await MODEL.findByIdAndUpdate(id, req.body)
        if (todo) {
            return res.status(200).json({
                success: true,
                message: "Update successful"
            })
        } else return res.status(400).json({
            success: false,
            message: "Don't Update "
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Record Not Update"
        })
    }
}

const todoDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const todo = await MODEL.findByIdAndDelete(id)
        if (todo) {
            return res.status(200).json({
                success: true,
                message: "Delete successful"
            })
        } else return res.status(400).json({
            success: false,
            message: "Not Fount Todo"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Record Not Delete"
        })
    }

}

const todoGet = async (req: Request, res: Response) => {
    const { id } = req.params
    const todoGet = await MODEL.findById(id)
    if (todoGet) {
        return res.status(200).json(todoGet)
    } else return res.status(404).json({
        success: false,
        message: "Not Found Todo"
    })
}


export default { todoAdd, todoGetAll, todoUpdate, todoDelete, todoGet };