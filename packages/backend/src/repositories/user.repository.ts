import {prisma} from "../lib/prisma.js"
import { type CreateUserDTO } from "../types/user.types.js"

export const UserRepository = {
    findById: (id: string) =>{
        return prisma.user.findUnique({where: {id}})
},
    findByEmail: (email: string) => {
        return prisma.user.findUnique({where: {email}})
},

    findAll: () => {
        prisma.user.findMany({
            orderBy: {createdAt: 'desc'}
        })
},

    create: (data: CreateUserDTO & {password: string}) => 

        prisma.user.create({data}),

    update: (id: string, data: Partial<CreateUserDTO>) => 
        prisma.user.update({where: {id}, data}),

    delete: (id: string) =>
        prisma.user.delete({where: {id}})
}