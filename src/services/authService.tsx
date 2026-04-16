import { toast } from "react-toastify";
import type { RegisterHandlerProps } from "../type/auth";


export const handleRegister = async ({
  data,
  register,
  navigate,
}: RegisterHandlerProps) => {
  try {
    await register(data);

    toast.success(
      "Account created successfully! Please verify your email.",
      {
        position: "top-right",
        autoClose: 4000,
        style: { fontSize: "16px" },
      }
    );

    navigate("/verify-email", {
      state: { email: data.email_address },
    });

  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";

    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      style: { fontSize: "16px" },
    });
  }
};