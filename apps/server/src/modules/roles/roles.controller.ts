import { Controller, Post, Get, Delete, Param, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";

@ApiTags("Roles")
@Controller("api/roles")
export class RolesController {
  constructor(private readonly _rolesService: RolesService) {}

  @Post()
  public create(@Body() createUserDto: CreateRoleDto): Promise<Role> {
    return this._rolesService.create(createUserDto);
  }

  @Get()
  public findAll(): Promise<Array<Role>> {
    return this._rolesService.findAll();
  }

  @Get(":value")
  public findOne(@Param("value") value: string): Promise<Role | null> {
    return this._rolesService.findOneByValue(value);
  }

  @Delete(":id")
  public remove(@Param("id") id: string): Promise<void> {
    return this._rolesService.remove(id);
  }
}
