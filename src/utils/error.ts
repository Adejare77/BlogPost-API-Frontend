import { AxiosError } from "axios";

const ERROR_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check your input.",
  401: "Unauthorized. Please log in to continue.",
  403: "You do not have permission to perform this action.",
  429: "Too many requests. Please try again later.",
  500: "Internal server error. Please try again later.",
};

const getAPIErrorMessage = (error: unknown) => {
  if (!(error instanceof AxiosError))
    return "Something went wrong. Try again later.";

  if (!error.response) return "Network error. Check your connection.";

  const { data, status } = error.response;

  if (typeof data?.detail === "string") return data.detail;

  if (typeof data === "object" && data != null) {
    const key = Object.keys(data)[0];
    const value = data[key];

    if (Array.isArray(value)) return value[0];
    if (typeof value === "string") return value;
  }

  //   FallBack response
  if (status && ERROR_MESSAGES[status]) return ERROR_MESSAGES[status];

  return "Something went wrong. Please try again later.";
};

export default getAPIErrorMessage;
