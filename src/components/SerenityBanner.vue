<template>
  <el-row class="mt-medium">
    <box-wrapper type="white" round style="overflow: hidden" class="flex-grow">
      <el-row class="big-announcement-card">
        <el-col class="big-announcement-banner" :span="-1">
          <img :src="anouncementData.bannerImg" alt="Banner" />
        </el-col>
        <el-col class="p-large big-announcement-description" :span="-1">
          <el-row>
            <span class="fs-extra-large w-100 bold">{{
              anouncementData.title
            }}</span>
            <hr style="border: 1px solid #b3dbd5" class="w-100" />
          </el-row>
          <el-row class="flex-basis-0 flex-grow of-auto">
            <el-scrollbar :always="true" wrap-class="mr-large">
              <span class="fs-medium" v-html="anouncementData.description" />
            </el-scrollbar>
          </el-row>
          <el-row>
            <box-wrapper
              class="fs-large p-medium w-100"
              style="
                border-radius: 0;
                box-shadow: 3px 3px 0 #b3dbd5, 4px 4px 0 #000000;
              "
            >
              <el-row class="mb-small" align="middle" justify="space-between">
                Reward pool size
                <el-col class="bold" :span="-1">
                  <el-row align="middle">
                    <span class="d-flex align-items-center">
                      <img
                        class="mr-extra-small"
                        style="height: 32px"
                        :src="PngSersh"
                        alt=""
                      />{{ anouncementData.rewardPoolSize }} $SERSH
                    </span>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="mb-small" align="middle" justify="space-between">
                <span>Campaign period</span>
                <span class="bold">8th - 29th August, 2023</span>
              </el-row>
              <el-row align="middle" justify="space-between">
                <social-links
                  class="fs-medium"
                  twitter="https://twitter.com/SerenityShield_"
                  telegram="https://t.me/serenityshield"
                  discord="https://discord.com/invite/serenityshield"
                  instagram="https://instagram.com/Serenityshield"
                  website="https://zealy.io/c/serenitysentinels/questboard"
                />
                <el-link
                  target="_blank"
                  href="https://block-strongbox.serenityshield.io/"
                  :underline="false"
                >
                  <el-button class="fs-slightly-larger" type="primary">
                    Visit
                  </el-button>
                </el-link>
              </el-row>
            </box-wrapper>
          </el-row>
        </el-col>
      </el-row>
    </box-wrapper>
  </el-row>
</template>

<script setup lang="ts">
import BoxWrapper from "@/components/BoxWrapper.vue";
import PngSersh from "@/assets/currencies/sersh.png";
import SocialLinks from "@/components/ExternalLinks.vue";

const anouncementData = {
  bannerImg:
    "https://uploads-ssl.webflow.com/646e2681b1e16cd1a28f9571/64d299caec51a1081931e9cb_banner_img_6.jpg",
  title: "SerenityShield",
  rewardPoolSize: "20,000.00",
  description:
    '<p class="p1"><strong>Mission:</strong> Interact with the StrongBox platform on Solana testnet with Phantom wallet and add your MetaMask BNB chain wallet to be eligible of receiving the reward.&nbsp;</p>\n' +
    '<p class="p1"><a href="https://www.youtube.com/watch?v=YS9NcWe6pMo" target="_blank">Watch tutorial</a> on setting up the necessary wallet browser extensions and accessing the DApp.</p>\n' +
    '<p class="p1"><span>When it comes to protecting your crypto and persona information, Serenity Shield is here to help.</span><br /><span>Your confidential data and seed phrases will be safe and sound in our <strong>StrongBox®</strong> DApp, which functions like a virtual safe or vault. No special gear is required to access your data; if something happens, your stored information will be distributed according to your preferences using our decentralized inheritance function. You simply select the wallet of your choice, and we supply the StrongBox.</span></p>\n' +
    '<p class="p1">Disclaimer:&nbsp;</p>\n' +
    '<p class="p1"><span><strong>SERSH Token Reward Pool Distribution</strong><br />Please be advised that the distribution of SERSH tokens from the reward pool will be fair and equitable, with the distribution amount contingent upon the total number of participants in the campaign.The principle of even distribution will be upheld, ensuring each participant receives a proportional share of tokens based on their involvement. It is important to note that the number of tokens each participant receives may vary according to the total number of individuals participating in the StrongBox test-net campaign. As the number of participants increases, the token allocation will be adjusted accordingly to maintain a consistent and fair distribution process.</span><br /><span>We emphasize that the SERSH tokens earned during the campaign will not be available for redemption until the conclusion of the 3-week test-net campaign. After this period, participants will have the opportunity to redeem their tokens according to the allocation received.By participating in the campaign, you acknowledge and accept the variation in token distribution depending on the number of participants and agree to the redemption terms set forth after the campaign. Please review all related guidelines and information before participating in the StrongBox testnet campaign.Serenity Shield reserves the right to amend, modify, or update the token distribution mechanism, terms, and conditions of the SERSH token reward pool, at its sole discretion, if necessary. Any changes made will be communicated through official channels to ensure transparency and fairness throughout the StrongBox testnet campaign.</span></p>',
};
</script>

<style scoped lang="scss"></style>
