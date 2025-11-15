import { BusinessRepository } from "./business.repository";

const repo = new BusinessRepository();

export class BusinessService {

    async create(data: any) {
        const { 
            owner_id,
            name,
            slug,
            phone,
            address,
            city,
            country } = data;

        const existsSlug = await repo.findBySlug(slug);

        if (existsSlug) throw new Error("El nombre del negocio ya está en uso");

        return repo.create({
            owner_id,
            name,
            slug,
            phone,
            address,
            city,
            country
        });
    }
}