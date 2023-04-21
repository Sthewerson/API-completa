import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields");
      }

      if (!id) {
        return badRequest("Missing user id");
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
        return badRequest("some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}

/users/123;
