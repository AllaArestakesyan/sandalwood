"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("./entities/category.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        const catgeory = await this.categoryRepository.findOneBy({ name: createCategoryDto.name });
        if (!catgeory) {
            const cat = this.categoryRepository.create(Object.assign({}, createCategoryDto));
            return this.categoryRepository.save(cat);
        }
        else {
            throw new common_1.NotFoundException('category has already');
        }
    }
    async findAll() {
        const data = await this.categoryRepository.find();
        if (data) {
            return data;
        }
        else {
            throw new common_1.NotFoundException('category not found');
        }
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: {
                products: true,
            },
        });
        if (category) {
            return category;
        }
        else {
            throw new common_1.NotFoundException('category not found');
        }
    }
    async remove(id) {
        const cat = await this.categoryRepository.findOneBy({ id });
        if (cat) {
            this.categoryRepository.delete({ id });
            return "delete catgeory - " + cat.name;
        }
        else {
            throw new common_1.NotFoundException('catgeory not found');
        }
    }
    async update(id, updateCategoryDto) {
        const catgeory = await this.categoryRepository.findOneBy({ id });
        if (catgeory) {
            await this.categoryRepository.update(id, updateCategoryDto);
            return "update catgeory - " + catgeory.name;
        }
        else {
            throw new common_1.NotFoundException('catgeory not found');
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map