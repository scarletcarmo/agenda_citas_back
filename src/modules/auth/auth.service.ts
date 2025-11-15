import { generateToken } from "../../utils/jwt";
import { BusinessRepository } from "../business/business.repository";
import { BusinessService } from "../business/business.service";
import { AuthRepository } from "./auth.repository";
import bcrypt from "bcrypt";

const repo = new AuthRepository();
const bussiness = new BusinessService();

export class AuthService {
    //registrar usuario 

    async register(data: any) {
        const { name, email, password, business_name, role } = data;

        const exists = await repo.findByEmail(email);
        if (exists) throw new Error("El email ya está registrado");

        const hashed = await bcrypt.hash(password, 10);

        const user = await repo.create({
            name, email, hashed, business_name, role
        })

        const slug = business_name.toLowerCase().replace(/\s+/g, "-");

        const business = await bussiness.create({
            owner_id: user.id,
            name: business_name,
            slug,
            phone: "",
            address: "",
            city: "",
            country: "",
        });

        const token = generateToken({
            id: user.id,
            role: user.role,
            business_id: business.id,
        });

        return { user, business, token };
    }

    async login(data: any) {
        const { email, password } = data;

        const user = await repo.findByEmail(email);
        if (!user) throw new Error("Usuario no encontrado");

        const credentials = await bcrypt.compare(password, user.password_hash);
        if (!credentials) throw new Error("Credenciales incorrectas");

        const business = user.businesses[0];

        const token = generateToken({
            id: user.id,
            role: user.role,
            business_id: business.id,
        });

        return { user, business, token };

    }
    async findAll() {
        return repo.findAll();
    }

    async findOne(id: number) {
        const user = await repo.findById(id);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return user;
    }

    async update(id: number, data: any) {
        const exists = await repo.findById(id);

        if (!exists) {
            throw new Error("Usuario no encontrado");
        }

        return repo.update(id, data);
    }

    async delete(id: number) {
        const exists = await repo.findById(id);
        if (!exists) {
            throw new Error("Usuario no encontrado");
        }

        return repo.delete(id);
    }
}