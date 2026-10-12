export interface CreateProductDto {
    title: string;
    price: number;
    description?: string;
    category: string;
    images: string[];
}
export interface UpdateProductDto extends Partial<CreateProductDto> {
}
export interface ProductQueryDto {
    search?: string;
    category?: string;
    limit?: string;
    page?: string;
}
//# sourceMappingURL=product.dto.d.ts.map