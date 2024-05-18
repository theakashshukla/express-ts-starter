import mongoose, { Document, Schema } from 'mongoose'

export interface UserDocument extends Document {
  id: number
  name: string
  email: string
  phoneNumber: string
  type:
    | 'admin'
    | 'sales'
    | 'support'
    | 'manager'
    | 'finance'
    | 'marketing'
    | 'user'
  status: 'active' | 'inactive'
  password: string
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    type: {
      type: String,
      enum: [
        'admin',
        'sales',
        'support',
        'manager',
        'finance',
        'marketing',
        'user',
      ],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model<UserDocument>('User', userSchema)
