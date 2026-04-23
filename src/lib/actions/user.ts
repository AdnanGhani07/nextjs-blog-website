import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

const safeError = (error: any) => {
  return {
    message: error.message,
    code: error.code,
    name: error.name,
  };
};

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: string[],
  username: string
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses,
          username: username
        },
      },
      { upsert: true, new: true }
    );
    return user;
  } catch (error) {
    console.error('Error creating or updating user:', safeError(error));
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error('Error deleting user:', safeError(error));
    throw error;
  }
}
