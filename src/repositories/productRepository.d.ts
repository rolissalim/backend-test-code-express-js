import { CreateProductDto, UpdateProductDto, ProductQueryDto } from '../dtos/product.dto';
export declare class ProductRepository {
    findAll(query: ProductQueryDto): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        category: string;
        images: string[];
        createdBy: string | null;
        createdById: string | null;
        updatedAt: Date;
        updatedBy: string | null;
        updatedById: string | null;
    }[]>;
    findById(id: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        category: string;
        images: string[];
        createdBy: string | null;
        createdById: string | null;
        updatedAt: Date;
        updatedBy: string | null;
        updatedById: string | null;
    } | null>;
    create(data: CreateProductDto & {
        createdBy: string;
        createdById: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        category: string;
        images: string[];
        createdBy: string | null;
        createdById: string | null;
        updatedAt: Date;
        updatedBy: string | null;
        updatedById: string | null;
    }>;
    update(id: number, data: UpdateProductDto & {
        updatedBy: string;
        updatedById: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        category: string;
        images: string[];
        createdBy: string | null;
        createdById: string | null;
        updatedAt: Date;
        updatedBy: string | null;
        updatedById: string | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        category: string;
        images: string[];
        createdBy: string | null;
        createdById: string | null;
        updatedAt: Date;
        updatedBy: string | null;
        updatedById: string | null;
    }>;
}
//# sourceMappingURL=productRepository.d.ts.map