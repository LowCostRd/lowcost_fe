import type { GetUserByEmailAddressHandlerProps } from "../type/user";

export const handleGetUserByEmail = async ({
  data,
  get_user_by_email_address,
}: GetUserByEmailAddressHandlerProps) => {
  try {
    const user = await get_user_by_email_address(data);
    console.log(user)

    return user; 
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";

    throw new Error(message);
  }
};