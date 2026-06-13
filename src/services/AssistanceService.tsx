import { toast } from "react-toastify";
import type { CreateAgentHandlerProps} from "../type/assistant";



export const handleCreateAgent = async ({
  data,
  createAgent,
  navigate,
}: CreateAgentHandlerProps) => {
  try {
    const agentId = await createAgent(data);

    toast.success("Agent created successfully!", {
      position: "top-right",
      autoClose: 4000,
      style: { fontSize: "16px" },
    });

    setTimeout(() =>
      navigate("/my-assistants/setup/voice", {
        state: { agent_id: agentId },
      }), 1000);

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