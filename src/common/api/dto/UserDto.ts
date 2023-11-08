import type WalletDto from "@/common/api/dto/WalletDto";

export default class UserDto {
  userId: string = "";
  twitter: string = "";
  discord: string = "";
  reddit: string = "";
  telegram: string = "";
  github: string = "";
  email: string = "";
  metadata: object = {};
  createdOn: string = "";
  modifiedOn: string = "";
  invitedCount: number = 0;
  wallets: Array<WalletDto> = [];
}
