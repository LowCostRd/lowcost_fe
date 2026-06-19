import ComplianceTerms from "../feature/ ComplianceTerms";
import AssistantName from "../feature/assistant/AssistantName";
import AssistantRole from "../feature/assistant/AssistantRole";
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
import SignIn from "../feature/SignIn";
import SignUp from "../feature/SignUp";
import VerifyEmail from "../feature/VerifyEmail";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../component/ProtectedRoute";
import { RootRedirect } from "../component/RootRedirect";
import AssistantDashboard from "../component/AssistantDashboard";
import MyAssistantsSetupPage from "../feature/pages/MyAssistantsSetupPage";





export const Route = [


{
  path: "/",
  element: <RootRedirect />,
},
  {
    path : "/signup",
    element: <SignUp />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },

  // ── Onboarding routes (logged in but not yet in dashboard) ─────
  {
    path: "/practice-identity",
    element: <ProtectedRoute><PracticeIdentity /></ProtectedRoute>,
  },
  {
    path: "/practice-details",
    element: <ProtectedRoute><PracticeDetails /></ProtectedRoute>,
  },
  {
    path: "/compliance-terms",
    element: <ProtectedRoute><ComplianceTerms /></ProtectedRoute>,
  },

  // ── Dashboard (protected) ──────────────────────────────────────
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true,                       element: <Navigate to="my-assistants" replace /> },
      { path: "call-analytics",            element: <CallAnalyticsPage /> },
      { path: "my-assistants",             element: <MyAssistantsPage /> },
      { path: "call-handling",             element: <CallHandlingPage /> },
      { path: "patient-directory",         element: <PatientDirectoryPage /> },
      { path: "appointment-workflows",     element: <AppointmentWorkflowsPage /> },
      { path: "practice-information",      element: <PracticeInformationPage /> },
      { path: "ehr-integrations",          element: <EHRIntegrationsPage /> },
      { path: "settings",                  element: <SettingsPage /> },
      { path: "help",                      element: <HelpPage /> },
      {
        path: "my-assistants/view",
        element: <AssistantDashboard />
      },
      {
        path: "create-assistant",
        element : <MyAssistantsSetupPage/>
      }
    ],
  },

  // ── Assistant setup (protected) ────────────────────────────────
  {
    path: "/my-assistants/setup/name",
    element: <ProtectedRoute><AssistantName /></ProtectedRoute>,
  },
  {
    path: "/my-assistants/setup/voice",
    element: <ProtectedRoute><AssistantVoice /></ProtectedRoute>,
  },
  {
    path: "/my-assistants/setup/role",
    element: <ProtectedRoute><AssistantRole /></ProtectedRoute>,
  },
 

  // ── Catch-all ──────────────────────────────────────────────────
  {
    path: "*",
    element: <Navigate to="/signin" replace />,
  },
];

