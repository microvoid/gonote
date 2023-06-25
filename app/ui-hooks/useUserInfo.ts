import useSWR from "swr";
import axios from "axios";
import type { UserInfoWithState } from "../service-user";

function fetcher(...args: Parameters<typeof axios>) {
  return axios(...args).then(res => res.data.data);
}

export function useUserInfo(userId?: string) {
  return useSWR<UserInfoWithState>(
    userId ? `/api/user/${userId}` : null,
    fetcher
  );
}
