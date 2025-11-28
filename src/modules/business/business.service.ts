import { Business } from "@prisma/client";
import { BusinessRequestDto } from "../../dto/business.request.dto";
import { BusinessRepository } from "./business.repository";
import { ResponseDto } from "../../dto/Response.dto";

const repo = new BusinessRepository();

export class BusinessService {
    async create(data: BusinessRequestDto): Promise<ResponseDto<Business>> {
        try {
            const { owner_id, name, slug, phone, address, city, country, timezone } = data;
            const result = await repo.create({
                owner_id, name, slug, phone, address, city, country, timezone
            });
            return {
                success: true,
                message: "Negocio creado correctamente",
                data: result,
            }
        } catch (error: any) {
            return {
                success: false,
                message: "Error al crear el empleado",
                errors: error?.message
            }
        }
    }
}