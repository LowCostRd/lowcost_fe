// import axios, { AxiosError } from "axios";
// import { create } from "zustand";
// import api from "../services/AxiosInstance";
// import type { AgentState, CreateAgentPayload, CreateAgentResponse } from "../type/assistant";

// interface ApiErrorResponse {
//   error_message?: string;
//   message?: string;
// }

// const handleApiError = (error: unknown, defaultMessage: string): string => {
//   let message = defaultMessage;
//   if (axios.isAxiosError(error)) {
//     const axiosError = error as AxiosError<ApiErrorResponse>;
//     message =
//       axiosError.response?.data?.error_message ||
//       axiosError.response?.data?.message ||
//       message;
//   }
//   return message;
// };



// const savedAgentId = localStorage.getItem("draft_agent_id");
// const savedAgentName = localStorage.getItem("draft_agent_name");

// export const useAgentStore = create<AgentState>((set) => ({
//   isLoading: false,
//   agentId: savedAgentId || null,
//   agentName: savedAgentName || null,

//   createAgent: async (data: CreateAgentPayload) => {
//     set({ isLoading: true });
//     try {
//       const response = await api.post<CreateAgentResponse>(`/v1/api/agents/create`, data);
//       const agentId = response.data.message.agent_id;

//       set({ isLoading: false, agentId });
//       return agentId;
//     } catch (error) {
//       set({ isLoading: false });
//       throw new Error(handleApiError(error, "Failed to create agent. Please try again."));
//     }
//   },

//   setAgent: ({ agentId, agentName }) => {
//     localStorage.setItem("draft_agent_id", agentId);
//     localStorage.setItem("draft_agent_name", agentName);
//     set({ agentId, agentName });
//   },

//   clearAgent: () => {
//     localStorage.removeItem("draft_agent_id");
//     localStorage.removeItem("draft_agent_name");
//     set({ agentId: null, agentName: null });
//   },
// }));


import axios, { AxiosError } from "axios";
import { create } from "zustand";
import api from "../services/AxiosInstance";
import type { AgentState, CreateAgentPayload, CreateAgentResponse, UpdateNameResponse } from "../type/assistant";

interface ApiErrorResponse {
  error_message?: string;
  message?: string;
}

const handleApiError = (error: unknown, defaultMessage: string): string => {
  let message = defaultMessage;
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    message =
      axiosError.response?.data?.error_message ||
      axiosError.response?.data?.message ||
      message;
  }
  return message;
};


const savedAgentId = localStorage.getItem("draft_agent_id");
const savedAgentName = localStorage.getItem("draft_agent_name");
const savedAgentSpecialty = localStorage.getItem("draft_agent_specialty");

export const useAgentStore = create<AgentState>((set) => ({
  isLoading: false,
  agentId: savedAgentId || null,
  agentName: savedAgentName || null,
  agentSpecialty: savedAgentSpecialty || null,

  createAgent: async (data: CreateAgentPayload) => {
    set({ isLoading: true });
    try {
      const response = await api.post<CreateAgentResponse>(`/v1/api/agents/create`, data);
      const agentId = response.data.message.agent_id;

      set({ isLoading: false, agentId });
      return agentId;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to create agent. Please try again."));
    }
  },

  updateAgentName: async (agentId: string, name: string) => {
    set({ isLoading: true });
    try {
      await api.patch<UpdateNameResponse>(`/v1/api/agents/${agentId}/name`, { name });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to update agent name. Please try again."));
    }
  },
  updateAgentSpecialty: async (agentId: string, specialty: string) => {
    set({ isLoading: true });
    try {
      await api.patch(`/v1/api/agents/${agentId}/specialty`, { specialty });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to update specialty. Please try again."));
    }
  },


  setAgent: ({ agentId, agentName, agentSpecialty }) => {
    localStorage.setItem("draft_agent_id", agentId);
    localStorage.setItem("draft_agent_name", agentName);
    if (agentSpecialty) localStorage.setItem("draft_agent_specialty", agentSpecialty);
    set({ agentId, agentName, ...(agentSpecialty ? { agentSpecialty } : {}) });
  },

  clearAgent: () => {
    localStorage.removeItem("draft_agent_id");
    localStorage.removeItem("draft_agent_name");
    localStorage.removeItem("draft_agent_specialty");
    set({ agentId: null, agentName: null, agentSpecialty: null });
  },
}));