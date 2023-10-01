import { Entity, Column, ManyToMany } from "typeorm";
import { BaseEntity } from "@server/abstracts/base.entity";
import { User } from "@server/modules/users";

@Entity("roles")
export class Role extends BaseEntity {
  @Column({ type: "text", nullable: false, unique: true })
  public value!: string;

  @Column({ type: "text", nullable: false })
  public description!: string;

  @ManyToMany(() => User, (user) => user.roles)
  public users!: Array<User>;
}
