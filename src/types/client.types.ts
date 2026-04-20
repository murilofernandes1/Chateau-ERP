export interface CreateClientDTO {
    name: string,
    document: string,
    email: string | null,
    phone: string | null
}

export interface ClientResponse {
    id: string,
    name: string,
    document: string,
    email: string | null,
    phone: string | null,
    projects: [] | null,
    contracts: [] | null
}

export interface AllClientsResponse {
    id: string,
    name: string,
    document: string,
    email: string | null,
    phone: string | null
}