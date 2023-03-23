import { IGetUserContrller, IGetUserRepository } from "./protocols";

export class GetUserController implements IGetUserContrller {
  constructor(private readonly getUsersRepository: IGetUserRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
