import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("api/users")
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._usersService.create(createUserDto);
  }

  @Get()
  public findAll(): Promise<Array<User>> {
    return this._usersService.findAll();
  }

  @Get(":id")
  public async findOne(@Param("id") id: string): Promise<User> {
    const user = await this._usersService.findOne(id);

    if (!user) {
      throw new HttpException("There is no user", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Delete(":id")
  public remove(@Param("id") id: string): Promise<void> {
    return this._usersService.remove(id);
  }
}
