import { ClientRepository } from "../repositories/client.repository.js";
import { type CreateClientDTO, type AllClientsResponse, type ClientResponse } from "../types/client.types.js";

export const ClientService = {

    async createClient(data: CreateClientDTO) {
        const exists = await ClientRepository.findByDocument(data.document)
        if (exists) throw new Error("Client already exists.")
        const client = await ClientRepository.create(data)

        return client
    },

    async updateClient(id: string, data: Partial<CreateClientDTO>){
        const find = await ClientRepository.findById(id)
        if(!find) throw new Error ("Client not found.")
        
        return await ClientRepository.update(id, data)
    },

    async deleteClient(id: string){
        const find = await ClientRepository.findById(id)
        if(!find) throw new Error("Client not found.")

        return await ClientRepository.delete(id)
    },

    async findAllClients(){
        const clients = await ClientRepository.findAll()
        return clients
    },

    async findClient(document: string){
        const client = await ClientRepository.findByDocument(document)
        if(!client) throw new Error("Client not found.")
        
        return client
    }
}