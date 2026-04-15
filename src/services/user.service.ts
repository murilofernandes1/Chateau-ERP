import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user.repository.js'
import { type CreateUserDTO, type LoginDTO } from '../types/user.types.js'

export const userService = {
  async create(data: CreateUserDTO) {
    const exists = await UserRepository.findByEmail(data.email)
    if (exists) throw new Error('E-mail já cadastrado')

    const hashed = await bcrypt.hash(data.password, 10)
    const user = await UserRepository.create({
      ...data,
      password: hashed
    })

    const { password, ...safeUser } = user
    return safeUser
  },

  async login(data: LoginDTO) {
    const user = await UserRepository.findByEmail(data.email)
    if (user === null) throw new Error('Credenciais inválidas')

    const match = await bcrypt.compare(data.password, user.password)
    if (!match) throw new Error('Credenciais inválidas')

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const { password, ...safeUser } = user
    return { token, user: safeUser }
  },

  async findAll() {
    return UserRepository.findAll()
  },

  async findById(id: string) {
    const user = await UserRepository.findById(id)
    if (!user) throw new Error('Usuário não encontrado')
    const { password, ...safeUser } = user
    return safeUser
  },

  async delete(id: string) {
    await this.findById(id)
    return UserRepository.delete(id)
  }
}