import { Request, Response } from "express";
import { ServicesService } from "./services.service";

const service = new ServicesService();

export const create = async (req: Request, res: Response) => {
    try {
        const result = await service.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Registro exitoso",
            data: result
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}