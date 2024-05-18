import { Request, Response } from 'express'
import userService from '../services/userService'

class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body
    try {
      const user = await userService.register(name, email, password)
      res.status(201).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const token = await userService.login(email, password)
      if (!token) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }
      res.json({ token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async fetchUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id // Assuming the user ID is passed as a URL parameter
      const user = await userService.fetchUserById(userId)

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default new UserController()
