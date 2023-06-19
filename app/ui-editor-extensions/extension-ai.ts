import { useCompletion } from "ai/react";

export function useAI() {
  const { complete, isLoading } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onResponse: response => {},
    onFinish: (_prompt, completion) => {},
    onError: () => {},
  });
}
