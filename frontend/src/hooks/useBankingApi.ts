/**
 * Local banking API hooks — replaces the generated @workspace/api-client-react
 * hooks from the Replit monorepo. Calls the same /api/* endpoints.
 */
import { useQuery, useMutation } from "@tanstack/react-query";

export type Bank = {
  id: number;
  name: string;
  code: string;
};

export type AccountInfo = {
  account_name: string;
  account_number: string;
};

export type ApiError = {
  error: string;
};

export function useGetBanks() {
  return useQuery<Bank[], Error>({
    queryKey: ["banks"],
    queryFn: async () => {
      const res = await fetch("/api/banks");
      if (!res.ok) throw new Error("Failed to fetch bank list");
      return res.json() as Promise<Bank[]>;
    },
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });
}

type ResolveAccountInput = {
  data: {
    account_number: string;
    account_bank: string;
  };
};

export function useResolveAccount() {
  return useMutation<AccountInfo, Error, ResolveAccountInput>({
    mutationFn: async ({ data }) => {
      const res = await fetch("/api/account/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as AccountInfo | ApiError;
      if (!res.ok || "error" in result) {
        throw new Error(
          "error" in result ? result.error : "Could not resolve account"
        );
      }
      return result as AccountInfo;
    },
  });
}
