import { UUID } from 'crypto';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,BeforeInsert ,BeforeUpdate} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id : UUID;
  
  @CreateDateColumn({name : 'created_at', type: 'timestamp without time zone'})
  createdAt: Date;

  @UpdateDateColumn({name : 'updated_at', type: 'timestamp without time zone'})
  updatedAt: Date;

}
