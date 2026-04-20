import {prisma} from "../lib/prisma.js"
import {type CreateClientDTO, type ClientResponse } from "../types/client.types.js"


export const ClientRepository = {
    findById: (id: string) =>{
        return prisma.client.findUnique({where: {id}})
},
    findByDocument: (document: string) => {
        return prisma.client.findUnique({where: {document}})
    },
    findAll: () => {
    return prisma.client.findMany()
},
    update: (id: string, data: Partial <CreateClientDTO>) => {
        return prisma.client.update({
            where: {id},
            data: {...data}
        })
},
    delete: (id: string) => {
        return prisma.client.delete({where: {id}})
},
    create: (data: CreateClientDTO) => {
        return prisma.client.create({data})
},
}