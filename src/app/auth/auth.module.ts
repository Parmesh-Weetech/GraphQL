import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { AuthResolver } from './auth.resolver';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';

@Module({
  providers: [AuthService, AuthResolver, AuthGuard, RoleGuard],
  imports: [UserModule, TypeOrmModule.forFeature([User])]
})
export class AuthModule { }
