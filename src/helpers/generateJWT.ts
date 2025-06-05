import jwt from 'jsonwebtoken';
import "dotenv/config"
import { JwtPayload } from '../types/helpers.js';

const generateJWT = async (username: string): Promise<string> => {
  try {
    const payload: JwtPayload = { username };
    const secretKey = process.env.SECRET_JWT;
    
    if (!secretKey) {
      throw new Error('SECRET_JWT environment variable is not defined');
    }

    const token = await jwt.sign(payload, secretKey, {
      expiresIn: '2h'
    });
    
    return token;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al generar el token:', error.message);
    }
    throw new Error('No se pudo generar el token');
  }
};

export default generateJWT