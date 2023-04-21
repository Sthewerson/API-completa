import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 200,
          body: "Missing fields",
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const alloweFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "fisrtName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAllowedToUpadte = Object.keys(body).some(
        (key) => !alloweFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (!someFieldIsNotAllowedToUpadte) {
        return {
          statusCode: 400,
          body: "some received field is not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 300,
        body: "something went wrong.",
      };
    }
  }
}

/users/123;
