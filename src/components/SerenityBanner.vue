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
            <hr style="border: 1px solid #d7e597" class="w-100" />
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
                box-shadow: 3px 3px 0 #d7e597, 4px 4px 0 #000000;
              "
            >
              <!-- <el-row class="mb-small" align="middle" justify="space-between">
                Reward pool size
                <el-col class="bold" :span="-1">
                  <el-row align="middle">
                    <span class="d-flex align-items-center">
                      <SvgSersh class="mr-extra-small" style="height: 32px" />
                      {{ anouncementData.rewardPoolSize }} $SERSH
                    </span>
                  </el-row>
                </el-col>
              </el-row> -->
              <el-row class="mb-small" align="middle" justify="space-between">
                <span>Campaign period</span>
                <span class="bold">Until further notice</span>
              </el-row>
              <el-row align="middle" justify="space-between">
                <social-links
                  class="fs-medium"
                  twitter="https://twitter.com/zetablockchain"
                  telegram="https://t.me/zetachainofficial"
                  discord="https://discord.com/invite/zetachain"
                />
                <el-link
                  target="_blank"
                  href="https://www.zetachain.com/"
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
//import SvgSersh from "@/assets/currencies/sersh.svg";
import SocialLinks from "@/components/ExternalLinks.vue";

const anouncementData = {
  bannerImg:
    "https://uploads-ssl.webflow.com/646e2681b1e16cd1a28f9571/6526abd6a9418f8674b13bf1_ZetaChain.svg",
  title: "ZetaChain",
  rewardPoolSize: 0,
  description:
  "<b>Introducing Zetachain!</b><br><br>The Blockchain for Cross-Chain Apps.<br><br>An EVM-compatible L1 blockchain that connects everything: Build interoperable dApps that span any chain including Bitcoin; access all chains from one place.<br><br> <a target='_blank' href=https://docs.google.com/document/d/1FmSZftzb0XpqKddrDZKDHT7KlH7Fr69C93VDcvFgReE>Participate in the testnet and earn ZETA Points</a>   ",
};
</script>

<style scoped lang="scss"></style>
