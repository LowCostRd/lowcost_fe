import ComplianceTerms from "../feature/ ComplianceTerms";
import AssistantName from "../feature/assistant/AssistantName";
import AssistantVoice from "../feature/assistant/AssistantVoice";
import Dashboard from "../feature/Dashboard";
import AppointmentWorkflowsPage from "../feature/pages/AppointmentWorkflowsPage";
import CallAnalyticsPage from "../feature/pages/CallAnalyticsPage";
import CallHandlingPage from "../feature/pages/CallHandlingPage";
import EHRIntegrationsPage from "../feature/pages/EHRIntegrationsPage";
import HelpPage from "../feature/pages/HelpPage";
import MyAssistantsPage from "../feature/pages/MyAssistantsPage";
import PatientDirectoryPage from "../feature/pages/PatientDirectoryPage";
import PracticeInformationPage from "../feature/pages/PracticeInformationPage";
import SettingsPage from "../feature/pages/SettingsPage";
import PracticeDetails from "../feature/PracticeDetails";
import PracticeIdentity from "../feature/PracticeIdentity";
import SignUp from "../feature/SignUp";

import VerifyEmail from "../feature/VerifyEmail";
import { Navigate } from "react-router";

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
        element : <Dashboard/>,
        children: [
        { index: true,                         element: <Navigate to="my-assistants" replace /> },
        { path: "call-analytics",              element: <CallAnalyticsPage /> },
        { path: "my-assistants",               element: <MyAssistantsPage /> },
        { path: "call-handling",               element: <CallHandlingPage /> },
        { path: "patient-directory",           element: <PatientDirectoryPage /> },
        { path: "appointment-workflows",       element: <AppointmentWorkflowsPage /> },
        { path: "practice-information",        element: <PracticeInformationPage /> },
        { path: "ehr-integrations",            element: <EHRIntegrationsPage /> },
        { path: "settings",                    element: <SettingsPage /> },
        { path: "help",                        element: <HelpPage /> },
    ],
    },

    { path: "/my-assistants/setup/name", element: <AssistantName /> },
    { path: "/my-assistants/setup/voice", element: <AssistantVoice /> },


]