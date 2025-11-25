// models/User.ts
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  createdAt?: Date;
}

class UserModel {
  private async getCollection() {
    const client = await clientPromise;
    const db = client.db('auth-app');
    return db.collection('users');
  }

  async createUser(email: string, password: string): Promise<IUser | null> {
    try {
      const collection = await this.getCollection();

      // Check if user already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return null;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const result = await collection.insertOne({
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      return {
        _id: result.insertedId.toString(),
        email,
        password: hashedPassword,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const collection = await this.getCollection();
      const user = await collection.findOne({ email });

      if (!user) return null;

      return {
        _id: user._id.toString(),
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
      };
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export const User = new UserModel();