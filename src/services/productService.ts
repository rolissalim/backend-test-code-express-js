import { ProductRepository } from '../repositories/productRepository.js';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from '../dtos/product.dto.js';

export class ProductService {
  private productRepository = new ProductRepository();

  async getProducts(query: ProductQueryDto) {
    return await this.productRepository.findAll(query);
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('PRODUCT_NOT_FOUND');
    }
    return product;
  }

  async createProduct(dto: CreateProductDto, userInfo: { id: string; username: string }) {
    // Validasi wajib: title, price, category, dan images (minimal 1)
    if (!dto.title || !dto.price || !dto.category || !dto.images || !Array.isArray(dto.images) || dto.images.length === 0) {
      throw new Error('VALIDATION_FAILED');
    }

    return await this.productRepository.create({
      ...dto,
      createdBy: userInfo.username,
      createdById: userInfo.id,
    });
  }

  async updateProduct(id: number, dto: UpdateProductDto, userInfo: { id: string; username: string }) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new Error('PRODUCT_NOT_FOUND');
    }

    return await this.productRepository.update(id, {
      ...dto,
      updatedBy: userInfo.username,
      updatedById: userInfo.id,
    });
  }

  async deleteProduct(id: number) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new Error('PRODUCT_NOT_FOUND');
    }

    return await this.productRepository.delete(id);
  }
}