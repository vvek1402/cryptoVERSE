import UserModel from "../models/User";
import { User } from "../utils/interfaces";

export const storeUser = async (user: User): Promise<User> => {
  return UserModel.create(user);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return UserModel.findOne({ email });
};
