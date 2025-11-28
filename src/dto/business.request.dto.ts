export interface BusinessRequestDto {
    owner_id: number;
    name: string;
    slug: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    timezone?: string;
}