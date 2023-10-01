import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";
import type { Repository } from "typeorm";

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly _rolesRepository: Repository<Role>) {}

  public create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this._rolesRepository.save(createRoleDto);
  }

  public findAll(): Promise<Array<Role>> {
    return this._rolesRepository.find();
  }

  public findOneByValue(value: string): Promise<Role | null> {
    return this._rolesRepository.findOne({ where: { value } });
  }

  public async remove(id: string): Promise<void> {
    await this._rolesRepository.delete(id);
  }
}
