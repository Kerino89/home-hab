import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Exclude()
  @CreateDateColumn({ type: "date" })
  public createdAt!: Date;

  @Exclude()
  @UpdateDateColumn({ type: "date" })
  public updatedAt!: Date;
}
