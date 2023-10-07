import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "@server/abstracts/base.entity";
import { Role } from "@server/modules/roles";
import { Exclude } from "class-transformer";

@Entity("users")
export class User extends BaseEntity {
  @Column({ type: "text", nullable: false })
  public firstName!: string;

  @Column({ type: "text", nullable: false })
  public lastName!: string;

  @Column({ type: "text", nullable: false, unique: true })
  public email!: string;

  @Column({ type: "text", nullable: false })
  @Exclude()
  public password!: string;

  @Column({ default: true })
  @Exclude()
  public isActive!: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: "user-roles" })
  public roles!: Array<Role>;
}
