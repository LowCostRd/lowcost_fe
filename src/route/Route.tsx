import PracticeDetails from "../feature/PracticeDetails";
import SignUp from "../feature/SignUp";

import VerifyEmail from "../feature/VerifyEmail";

export const Route = [
    {
        path: "/",
        element : <SignUp/>
    },
    {
        path: "/verify-email",
        element : <VerifyEmail/>
    },
    {
        path: "/practice-details",
        element : <PracticeDetails/>
    }
]