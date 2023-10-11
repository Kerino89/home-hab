import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "@server/abstracts/base.entity";
import { Role } from "@server/modules/roles";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity("users")
export class User extends BaseEntity {
  @ApiProperty({ nullable: false })
  @Column({ type: "text", nullable: false })
  public firstName!: string;

  @ApiProperty({ nullable: false })
  @Column({ type: "text", nullable: false })
  public lastName!: string;

  @ApiProperty({ nullable: false })
  @Column({ type: "text", nullable: false, unique: true })
  public email!: string;

  @Exclude()
  @Column({ type: "text", nullable: false })
  public password!: string;

  @Exclude()
  @Column({ default: true })
  public isActive!: boolean;

  @ApiProperty({ nullable: false, type: [Role] })
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: "user-roles" })
  public roles!: Array<Role>;
}
