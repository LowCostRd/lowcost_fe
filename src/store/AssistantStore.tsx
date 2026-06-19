
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import api from "../services/AxiosInstance";
import type { AgentListFilters, AgentState, CreateAgentPayload, CreateAgentResponse, GetAgentsResponse, GetVoicesResponse, UpdateNameResponse, UpdateRolesPayload, UpdateRolesResponse } from "../type/assistant";

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
const savedAgentVoiceId = localStorage.getItem("draft_agent_voice_id");
const savedAgentImageUrl = localStorage.getItem("draft_agent_image_url");

export const useAgentStore = create<AgentState>((set,get) => ({
  isLoading: false,
  agentId: savedAgentId || null,
  agentName: savedAgentName || null,
  agentSpecialty: savedAgentSpecialty || null,
  voices: [],
  isLoadingVoices: false,
  agentVoiceId: savedAgentVoiceId || null,
  agentImageUrl: savedAgentImageUrl || null,
  agents: [],
  isLoadingAgents: false,
  __searchRequestId: 0, 

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

  fetchVoices: async () => {
    if (get().voices.length > 0) return; 
    set({ isLoadingVoices: true });
    try {
      const response = await api.get<GetVoicesResponse>(`/v1/api/agents/voices`);
      set({ voices: response.data.message, isLoadingVoices: false });
    } catch (error) {
      set({ isLoadingVoices: false });
      throw new Error(handleApiError(error, "Failed to fetch voices. Please try again."));
    }
  },

  updateAgentVoice: async (agentId: string, voiceId: string, imageUrl?: string) => {
    set({ isLoading: true });
    try {
      await api.patch(`/v1/api/agents/${agentId}/voice`, { voice_id: voiceId, image_url: imageUrl });
      localStorage.setItem("draft_agent_voice_id", voiceId);
      if (imageUrl) {
        localStorage.setItem("draft_agent_image_url", imageUrl);
      }
      set({ isLoading: false, agentVoiceId: voiceId, agentImageUrl: imageUrl ?? null });
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to update voice. Please try again."));
    }
  },

  updateAgentRoles: async (agentId: string, payload: UpdateRolesPayload) => {
    set({ isLoading: true });
    try {
      const response = await api.patch<UpdateRolesResponse>(
        `/v1/api/agents/${agentId}/roles`,
        payload
      );
      set({ isLoading: false });
      return response.data.message;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to update roles. Please try again."));
    }
  },
  fetchAgents: async (filters?: AgentListFilters) => {
    const requestId = get().__searchRequestId + 1;
    set({ isLoadingAgents: true, __searchRequestId: requestId });
    try {
      const response = await api.get<GetAgentsResponse>(`/v1/api/agents/list`, {
        params: filters,
      });
      if (get().__searchRequestId === requestId) {
        set({ agents: response.data.message, isLoadingAgents: false });
      }
    } catch (error) {
      if (get().__searchRequestId === requestId) {
        set({ isLoadingAgents: false });
      }
      throw new Error(handleApiError(error, "Failed to fetch agents. Please try again."));
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
    localStorage.removeItem("draft_agent_voice_id");
    localStorage.removeItem("draft_agent_image_url");
    set({ agentId: null, agentName: null, agentSpecialty: null, agentVoiceId: null, agentImageUrl: null });
  },
}));