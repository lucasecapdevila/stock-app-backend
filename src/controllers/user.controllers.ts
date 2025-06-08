import User from "../database/models/user.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateJWT from "../helpers/generateJWT.js";

export const readUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res
      .status(201)
      .json({
        message: "Usuario creado exitosamente",
        username: user.username,
        password: user.password,
      });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    // Generate token
    const { accessToken, refreshToken } = await generateJWT(user.username);

    res.status(200).json({ 
      message: "Inicio de sesión exitoso", 
      username: user.username, 
      accessToken,
      refreshToken 
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
