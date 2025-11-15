import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {

    async register(req: Request, res: Response) {
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

    async login(req: Request, res: Response) {
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

    async getUsers(req: Request, res: Response) {
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

    async getUser(req: Request, res: Response) {
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

    async updateUser(req: Request, res: Response) {
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

    async deleteUser(req: Request, res: Response) {
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
}
