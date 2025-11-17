import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();


export const register = async (req: Request, res: Response) => {
    try {
        const result = await service.register(req.body);
        return res.status(201).json({
            success: true,
            message: "Registro exitoso",
            data: result
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const result = await service.login(req.body);
        return res.status(200).json({
            success: true,
            message: "Login exitoso",
            data: result
        });
    } catch (err: any) {
        return res.status(401).json({
            success: false,
            message: err.message
        });
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;

        console.log("req.body ", req.body);

        const result = await service.changePassword(user_id, req.body);
        return res.json(result);

    } catch (error: any) {
        return res.status(400).json({ message: error.message });

    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await service.findAll();
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await service.findOne(id);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (err: any) {
        return res.status(404).json({
            success: false,
            message: err.message
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await service.update(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Usuario actualizado",
            data: result
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await service.delete(id);
        return res.status(200).json({
            success: true,
            message: "Usuario eliminado"
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

