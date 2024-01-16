import { CategoryService } from './category.service';
import { Response } from 'express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(res: Response): Promise<any>;
    findOne(id: number, res: Response): Promise<any>;
    create(createCategoryDto: CreateCategoryDto, req: any, res: Response): Promise<any>;
    update(id: number, updateCategoryDto: UpdateCategoryDto, req: any, res: Response): Promise<any>;
    remove(id: string, res: Response): Promise<any>;
}
