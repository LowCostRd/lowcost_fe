import { toast } from "react-toastify";
import type { RegisterHandlerProps, VerifyEmailHandlerProps,ResendOtpHandlerProps, RegisterPracticeIdentityHandlerProps, RegisterPracticeDetailsHandlerProps, RegisterComplianceTermsHandlerProps, LoginHandlerProps } from "../type/auth";



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

             setTimeout(() =>
     navigate("/verify-email", {
      state: { email: data.email_address },
    }), 1500);

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



export const handleEmailVerification = async ({
  data,
  verifyEmail,
  navigate,
}: VerifyEmailHandlerProps) => {
  try {
    await verifyEmail(data);

    toast.success(
      "Email verified successfully! Redirecting to the next step.",
      {
        position: "top-right",
        autoClose: 4000,
        style: { fontSize: "16px" },
      }
    );


      navigate("/practice-identity", {
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

export const handleResendOtp = async ({
  data,
  resendOtp,
}: ResendOtpHandlerProps) => {
  await resendOtp(data); 
};


export const handleRegisterPracticeIdentity = async ({
  data,
  register_practice_identity,
  navigate,
}: RegisterPracticeIdentityHandlerProps) => {
  try {
    await register_practice_identity(data);

    toast.success(
      "Practice identity registered successfully!",
      {
        position: "top-right",
        autoClose: 4000,
        style: { fontSize: "16px" },
      }
    );

 

         setTimeout(() =>
      navigate("/practice-details", {
      state: { user_id : data.user_id , country : data.country},
    }), 1500);

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



export const handleRegisterPracticeDetails = async ({
  data,
  register_practice_details,
  navigate,
}: RegisterPracticeDetailsHandlerProps) => {
  try {
    await register_practice_details(data);

    toast.success(
      "Practice details registered successfully!",
      {
        position: "top-right",
        autoClose: 4000,
        style: { fontSize: "16px" },
      }
    );


        
     setTimeout(() =>
    navigate("/compliance-terms", {
      state: { user_id : data.user_id},
    }), 1500);

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



export const handleRegisterComplianceTerms = async ({
  data,
  register_compliance_terms,
  navigate,
}: RegisterComplianceTermsHandlerProps) => {
  try {
    await register_compliance_terms(data);

    toast.success(
      "Compliance terms registered successfully!",
      {
        position: "top-right",
        autoClose: 4000,
        style: { fontSize: "16px" },
      }
    );

    
     setTimeout(() =>navigate("/dashboard", {
      state: { user_id : data.user_id},
    }), 1500);

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


export const handleLogin = async ({
  data,
  login,
}: LoginHandlerProps) => {
  try {
    await login(data);

    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 4000,
      style: { fontSize: "16px" },
    });

    return { success: true };

  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Login failed. Please check your credentials and try again.";

    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      style: { fontSize: "16px" },
    });

    return { success: false };
  }
};