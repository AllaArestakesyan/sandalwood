import { UserCardService } from './user_card.service';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
export declare class UserCardController {
    private readonly userCardService;
    constructor(userCardService: UserCardService);
    create(createUserCardDto: CreateUserCardDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserCardDto: UpdateUserCardDto): string;
    remove(id: string): string;
}
