import { prisma } from '../config/prisma.js';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from '../dtos/product.dto.js';

export class ProductRepository {
  async findAll(query: ProductQueryDto) {
    const { search, category, limit = '10', page = '1' } = query;
    const take = parseInt(limit, 10);
    const skip = (parseInt(page, 10) - 1) * take;

    const where: any = {};
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }
    if (category) {
      where.category = category;
    }

    return await prisma.product.findMany({
      where,
      take,
      skip,
      orderBy: { id: 'desc' },
    });
  }

  async findById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: CreateProductDto & { createdBy: string; createdById: string }) {
    return await prisma.product.create({
      data: {
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        images: data.images,
        createdBy: data.createdBy,
        createdById: data.createdById,
        updatedBy: data.createdBy,
        updatedById: data.createdById,
      },
    });
  }

  async update(id: number, data: UpdateProductDto & { updatedBy: string; updatedById: string }) {
    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  }
}