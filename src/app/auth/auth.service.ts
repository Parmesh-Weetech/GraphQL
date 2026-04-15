import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { LoginInput } from './auth.input';
import { AuthResponse } from './auth.output';
import { CustomExceptionFactory } from '../common/exception/custom-exception-factory';
import { ErrorCodes } from '../common/exception/error-codes';
import { verifyPassword } from '../user/util/passwordHash';
import { generateAuthTokens } from '../user/util/generateAuthToken';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async login(input: LoginInput): Promise<AuthResponse> {
        const existingUser = await this.userRepository.findOne({
            where: { email: input.email }
        });

        if (!existingUser) throw CustomExceptionFactory.create(
            ErrorCodes.USER_NOT_FOUND
        );

        const isPasswordValid = verifyPassword(
            input.password,
            existingUser.salt,
            existingUser.password
        );

        if (!isPasswordValid) throw CustomExceptionFactory.create(
            ErrorCodes.INVALID_CREDENTIALS
        );

        const token = await generateAuthTokens(
            existingUser.id,
            input.email,
            existingUser.userRole
        );

        return {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        }
    }
}
