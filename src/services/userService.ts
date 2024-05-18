import jwt from 'jsonwebtoken'
import config from '../config'
import User, { UserDocument } from '../models/userModel'
import { comparePasswords, hashPassword } from '../utils/bcryptUtils'
import { generateToken } from '../utils/token'

class UserService {
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<UserDocument> {
    // Hash the password before saving it to the database
    const hashedPassword = await hashPassword(password)
    console.log(name, email, hashedPassword)

    const user = await User.create({ name, email, password: hashedPassword })
    return user
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await User.findOne({ email })
    if (!user) {
      return null // User not found
    }

    const isPasswordValid = await comparePasswords(password, user.password)
    if (!isPasswordValid) {
      return null // Invalid password
    }

    const token = generateToken({ userId: user.id })
    return token
  }

  async fetchUserById(userId: string): Promise<UserDocument | null> {
    try {
      const user = await User.findById(userId)
      return user
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

export default new UserService()
