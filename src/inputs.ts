import { Field, InputType } from 'type-graphql';
import { Length, MaxLength } from 'class-validator';

@InputType()
export class NewProductInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;
}
