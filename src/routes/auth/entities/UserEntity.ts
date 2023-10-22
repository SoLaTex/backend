import { Expose } from "class-transformer";

export class UserEntity {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
