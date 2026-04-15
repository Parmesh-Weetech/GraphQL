import { Injectable} from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';
import { randomBytes } from 'node:crypto';
import { createHashPassword } from './util/passwordHash';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(createUserReq: CreateUserInput): Promise<User | null> {
        const existingUser = await this.findByEmail(createUserReq.email);

        if (existingUser) throw CustomExceptionFactory.create(
            ErrorCodes.USER_EXISTS
        );

        const salt = randomBytes(16).toString('hex');
        const hashedPassword = createHashPassword(createUserReq.password, salt);

        const user = await this.userRepository.save(
            this.userRepository.create({
                email: createUserReq.email,
                name: createUserReq.name,
                password: hashedPassword,
                userRole: createUserReq.userRole,
                salt
            })
        );

        return user ?? null;
    }

    async findAll(): Promise<User[] | []> {
        const users = await this.userRepository.find();

        return users.length > 0 ? users : [];
    }

    async findOne(id: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id } });

        return user ?? null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });

        return user ?? null;
    }

    async remove(id: string): Promise<Boolean> {
        const affectedRows = await this.userRepository.delete(id);

        if (affectedRows.affected === null || affectedRows.affected === undefined || affectedRows.affected === 0) {
            throw CustomExceptionFactory.create(
                ErrorCodes.INTERNAL_SERVER_ERROR
            );
        }
        
        return affectedRows.affected > 0;
    }

    async update(id: string, input: UpdateUserInput): Promise<User | null> {
        const user = await this.findOne(id);

        if (!user) {
            throw CustomExceptionFactory.create(
                ErrorCodes.USER_NOT_FOUND
            );
        }

        const affectedRows = await this.userRepository.update(id, {
            name: input.name,
            email: input.email,
            userRole: input.userRole
        });

        if (affectedRows.affected === null || affectedRows === undefined || affectedRows.affected === 0) {
            throw CustomExceptionFactory.create(
                ErrorCodes.INTERNAL_SERVER_ERROR
            );
        }

        return await this.findOne(id);
    }
}
