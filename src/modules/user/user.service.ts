import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { FindOptionsWhere, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto.ts';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception.ts';
import type { UserRegisterDto } from '../auth/dto/user-register.dto.ts';
import type { CreateUserDto } from './dtos/create-user.dto.ts';
import type { UserDto } from './dtos/user.dto.ts';
import type { UsersPageOptionsDto } from './dtos/users-page-options.dto.ts';
import { UserEntity } from './user.entity.ts';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  @Transactional()
  async createUser(
    createUserDto: CreateUserDto | UserRegisterDto,
  ): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    return user;
  }

  async getUsers(
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUser(userId: Uuid): Promise<UserDto> {
    const userEntity = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity.toDto();
  }
}
