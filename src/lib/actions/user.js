import User from "../models/user.model";

import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addreses,
  username
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set:{
            firstName: first_name,
            lastName: last_name,
            profilePicture: image_url,
            email: email_addreses,
            username: username
        },
    },
    {upsert: true, new: true}
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id) => {
    try {
        await connect();
        const user = await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
