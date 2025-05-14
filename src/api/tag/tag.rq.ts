import request from "../request";
import { TagsResponse } from "./tag.types";

export const getAllTags = async (): Promise<TagsResponse> => {
  return await request.get(`/tags`);
};
