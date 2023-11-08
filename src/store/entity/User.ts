import Entity from "@/store/entity/Entity";

export default class User extends Entity {
  userId: string = "";
  invitedCount: number = 0;
  twitter: string = "";
  discord: string = "";
  reddit: string = "";
  telegram: string = "";
  github: string = "";
  email: string = "";
  metadata: Map<String, String> = new Map<String, String>();
}
