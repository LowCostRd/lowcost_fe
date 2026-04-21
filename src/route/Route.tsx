import ComplianceTerms from "../feature/ ComplianceTerms";
import Dashboard from "../feature/Dashboard";
import PracticeDetails from "../feature/PracticeDetails";
import PracticeIdentity from "../feature/PracticeIdentity";
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
        path: "/practice-identity",
        element : <PracticeIdentity/>
    },
    {
        path: "/practice-details",
        element : <PracticeDetails/>
    },
    {
        path: "/compliance-terms",
        element : <ComplianceTerms/>
    },
    {
        path: "/dashboard",
        element : <Dashboard/>
    }


]