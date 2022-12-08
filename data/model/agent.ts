import { Image } from "./image-file";
import { Property } from "./property";
import { User } from "./user";

export type Agent = {
  id: number,
  created_at: string;
  updated_at: string
  designation: string
  description: string
  fb_link:string;
  instagram_link:string;
  twitter_link:string;
  linkedin_link:string;
  user: User;
  agentImage: Image
  properties: Property[]

};
