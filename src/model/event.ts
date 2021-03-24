import { Entity, BaseEntity, Column, ObjectIdColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Event extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  message: string;
}
