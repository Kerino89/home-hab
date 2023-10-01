import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "@server/abstracts/base.entity";
import { Role } from "@server/modules/roles";

@Entity("users")
export class User extends BaseEntity {
  @Column({ type: "text", nullable: false })
  public firstName!: string;

  @Column({ type: "text", nullable: false })
  public lastName!: string;

  @Column({ type: "text", nullable: false, unique: true })
  public email!: string;

  @Column({ type: "text", nullable: false })
  public password!: string;

  @Column({ default: true })
  public isActive!: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: "user-roles" })
  public roles!: Array<Role>;
}
