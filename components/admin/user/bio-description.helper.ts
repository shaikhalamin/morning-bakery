import * as yup from "yup";
import { Agent } from "@/data/model/agent";

export type BioAndDescriptionFields = {
  agentImage?: number;
  description?: string;
  fb_link?: string;
  instagram_link?: string;
  twitter_link?: string;
  linkedin_link?: string;
};

export const bioAndDescriptionFieldsSchema = yup
  .object({
    agentImage: yup.number().optional().nullable(),
    description: yup.string().optional().nullable(),
    fb_link: yup.string().optional().nullable(),
    instagram_link: yup.string().optional().nullable(),
    twitter_link: yup.string().optional().nullable(),
    linkedin_link: yup.string().optional().nullable(),
  })
  .required();

export const setBioAndDescriptionFormValue = (
  setValue: CallableFunction,
  agent?: Agent
) => {
  setValue("description", agent?.description);
  setValue("fb_link", agent?.fb_link);
  setValue("instagram_link", agent?.instagram_link);
  setValue("twitter_link", agent?.twitter_link);
  setValue("linkedin_link", agent?.linkedin_link);
};
