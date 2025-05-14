import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "./tag.rq";
import { TagsResponse } from "./tag.types";

export const useGetTags = () => {
  return useQuery<TagsResponse>({
    queryKey: ["tags"], 
    queryFn: async () => {
      const response = await getAllTags();
      return {
        ...response,
        tags: response?.tags?.sort((a, b) => a?.localeCompare(b)),
      };
    },
  });
};
