import { User } from "../../models/user";

export interface UpdateParams {
  fisrtName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateParams): Promise<User>;
}
