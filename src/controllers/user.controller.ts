import { type Request, type Response } from "express";
import { userService } from "../services/user.service.js";

export const userController = {
    async create(req: Request, res: Response){
        try{
            const user = await userService.create(req.body)
            res.status(201).json(user)
        }catch(err: any){
            res.status(400).json({error: err.message})
        }
    },

    async login(req: Request, res: Response){
        try{
            const result = await userService.login(req.body)
            res.json(result)
        }catch(err:any){
            res.status(401).json({error: err.message})
        }
    },

    async findAll(_req: Request, res: Response) {
    const users = await userService.findAll()
    res.json(users)
  },

  async findById(req: Request, res: Response) {
    try {
      const user = await userService.findById(req.params.id as string)
      res.json(user)
    } catch (err: any) {
      res.status(404).json({ error: err.message })
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await userService.delete(req.params.id as string)
      res.status(204).send()
    } catch (err: any) {
      res.status(404).json({ error: err.message })
    }
  }
}