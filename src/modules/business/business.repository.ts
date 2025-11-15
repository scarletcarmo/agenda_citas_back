import { prisma } from "../../config/prisma";

export class BusinessRepository {
    async create(data: any) {
        return prisma.business.create(data);
    }
    
    async findBySlug(slug: string) {
        return prisma.business.findUnique({
            where: { slug },
        });
    }
}       