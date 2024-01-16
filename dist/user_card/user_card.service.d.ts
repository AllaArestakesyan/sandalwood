import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
export declare class UserCardService {
    create(createUserCardDto: CreateUserCardDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserCardDto: UpdateUserCardDto): string;
    remove(id: number): string;
}
