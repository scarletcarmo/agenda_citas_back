import { prisma } from "../../config/prisma";

export class BusinessRepository {

    // Permite transacciones usando 'tx'
    async create(data: any, tx: any = prisma) {
        return tx.business.create({
            data
        });
    }

    async findBySlug(slug: string) {
        return prisma.business.findUnique({
            where: { slug }
        });
    }

    async findByOwner(owner_id: number) {
        return prisma.business.findMany({
            where: { owner_id }
        });
    }

    async update(id: number, data: any) {
        return prisma.business.update({
            where: { id },
            data
        });
    }
}
