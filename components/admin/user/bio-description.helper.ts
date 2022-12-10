import * as yup from "yup";

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
