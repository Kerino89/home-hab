import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import type { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly _usersRepository: Repository<User>) {}

  public create(createUserDto: CreateUserDto): Promise<User> {
    return this._usersRepository.save(createUserDto);
  }

  public findAll(): Promise<Array<User>> {
    return this._usersRepository.find();
  }

  public findOne(id: string): Promise<User | null> {
    return this._usersRepository.findOne({ where: { id } });
  }

  public findOneByEmail(email: string): Promise<User | null> {
    return this._usersRepository.findOne({ relations: ["roles"], where: { email } });
  }

  public async remove(id: string): Promise<void> {
    await this._usersRepository.delete(id);
  }
}
