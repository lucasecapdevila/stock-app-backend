import jwt from 'jsonwebtoken';
import "dotenv/config"
import { JwtPayload, TokenPair } from '../types/index.types.js';


const generateJWT = async (username: string): Promise<TokenPair> => {
  try {
    const payload: JwtPayload = { username };
    const secretKey = process.env.SECRET_JWT;
    const refreshSecretKey = process.env.REFRESH_SECRET_JWT;
    
    if (!secretKey || !refreshSecretKey) {
      throw new Error('JWT secret keys are not properly defined in environment variables');
    }

    const accessToken = await jwt.sign(payload, secretKey, {
      expiresIn: '2h' // Access token expires in 2 hours
    });

    const refreshToken = await jwt.sign(payload, refreshSecretKey, {
      expiresIn: '7d' // Refresh token expires in 7 days
    });
    
    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al generar los tokens:', error.message);
    }
    throw new Error('No se pudieron generar los tokens');
  }
};

export default generateJWT