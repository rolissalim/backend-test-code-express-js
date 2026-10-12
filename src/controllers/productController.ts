import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import { ProductService } from '../services/productService.js';

const productService = new ProductService();

export const getProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const products = await productService.getProducts(req.query);
    res.json({ status: 'success', data: products });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const product = await productService.getProductById(id);
    res.json({ status: 'success', data: product });
  } catch (error: any) {
    if (error.message === 'PRODUCT_NOT_FOUND') {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id ? String(req.user.id) : '1';
    const username = req.user?.username || 'Jhon Doe';

    const newProduct = await productService.createProduct(req.body, { id: userId, username });
    res.status(201).json({ status: 'success', data: newProduct });
  } catch (error: any) {
    if (error.message === 'VALIDATION_FAILED') {
      res.status(400).json({ error: 'Validation failed: title, price, category, and images (min 1) are required.' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const userId = req.user?.id ? String(req.user.id) : '1';
    const username = req.user?.username || 'Jhon Doe';

    const updated = await productService.updateProduct(id, req.body, { id: userId, username });
    res.json({ status: 'success', data: updated });
  } catch (error: any) {
    if (error.message === 'PRODUCT_NOT_FOUND') {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await productService.deleteProduct(id);
    res.json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error: any) {
    if (error.message === 'PRODUCT_NOT_FOUND') {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};