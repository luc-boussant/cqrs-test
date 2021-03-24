import { Entity, BaseEntity, Column, ObjectIdColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column()
  description?: string;
}
