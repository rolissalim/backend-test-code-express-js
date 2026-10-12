import { CreateProductDto, UpdateProductDto, ProductQueryDto } from '../dtos/product.dto';
export declare class ProductService {
    private productRepository;
    getProducts(query: ProductQueryDto): Promise<{
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
    getProductById(id: number): Promise<{
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
    createProduct(dto: CreateProductDto, userInfo: {
        id: string;
        username: string;
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
    updateProduct(id: number, dto: UpdateProductDto, userInfo: {
        id: string;
        username: string;
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
    deleteProduct(id: number): Promise<{
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
//# sourceMappingURL=productService.d.ts.map