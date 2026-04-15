export interface CreateUserDTO {
    name: string
    email: string
    password: string
    role?: 'ADMIN' | 'MANAGER' | 'SALES'
}

export interface UserResponse {
    id: string
    name: string
    email: string
    role: string
    createdAt: Date
}

export interface LoginDTO {
    email: string
    password: string
}

export interface AuthPayload {
    token: string
    user: UserResponse
}