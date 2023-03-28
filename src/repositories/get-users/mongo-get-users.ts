import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Fernando",
        lastName: "Rocha",
        email: "fernando@gmail.com",
        password: "123",
      },
    ];
  }
}
