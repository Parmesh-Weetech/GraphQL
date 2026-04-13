import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(createUserReq: CreateUserInput) {
        const user = await this.userRepository.save(
            this.userRepository.create({
                email: createUserReq.email,
                name: createUserReq.name,
                password: createUserReq.password,
                salt: "10"
            })
        )

        return user;
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: string) {
        return await this.userRepository.findOne({ where: { id } });
    }

    async remove(id: string) {
        return await this.userRepository.delete(id);
    }

    async update(id: string, input: UpdateUserInput) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (input.name) user.name = input.name;
        if (input.email) user.email = input.email;

        return await this.userRepository.save(user);
    }
}
