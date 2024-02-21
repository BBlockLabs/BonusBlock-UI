import type Chain from "@/common/Chain";

export default class LinkActionPayload {
  forlink: boolean;
  chain: Chain;
  referral: string | null = null;

  constructor(chain: Chain, forlink: boolean = false, referral: string | null = null) {
    this.forlink = forlink;
    this.chain = chain;
    this.referral = referral;
  }
}
