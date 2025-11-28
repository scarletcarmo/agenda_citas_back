import { ServiceRepository } from "./services.repository";

const repo = new ServiceRepository();

export class ServicesService {
    async create(data: any) {
        const { business_id, name, description, duration_minutes, price, is_active } = data;

        const result = await repo.create({
            business_id, name, description, duration_minutes, price, is_active
        })

        console.log("result services: ", result);

        return {
            services: result
        }
    }
}