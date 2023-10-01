import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @CreateDateColumn({ type: "date" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  public updatedAt!: Date;
}
