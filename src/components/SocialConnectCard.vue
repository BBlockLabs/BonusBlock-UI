<template>
  <box-wrapper type="white" class="social-card-container is-shadow">
    <el-row class="social-card">
      <div class="social-card-image">
        <img :src="PngSocialCardImage" alt="image" />
      </div>
      <el-col class="social-card-text" :span="-1">
        <h1 class="m-0" style="font-weight: 900">
          CONNECT WITH BONUSBLOCK AND EARN REWARDS!
        </h1>
        <strong style="line-height: 24px">
          Stay tuned with the latest BonusBlock news and receive a reward for
          each social platform where you contribute to the community.
        </strong>
        <el-row>
          <el-link
            :underline="false"
            v-for="tag in linkData"
            :key="tag.text"
            target="_blank"
            :href="tag.link"
          >
            <el-tag
              round
              size="large"
              class="mb-small"
              :style="'background-color: ' + tag.color"
            >
              <el-row align="middle">
                <component :is="tag.icon" class="icon-small mr-small" />
                <strong class="fs-base">{{ tag.text }}</strong>
              </el-row>
            </el-tag>
          </el-link>
        </el-row>
        <strong style="line-height: 24px">
          You are also required to link your email to your BonusBlock account in
          order to receive rewards:
        </strong>
        <el-row>
          <el-tag
            round
            size="large"
            style="background-color: #f5bf5b"
          >
            <el-row align="middle">
              <SvgMail class="icon-small mr-small" />
              <strong class="fs-base">{{ getEmailStatus() }}</strong>
            </el-row>
          </el-tag>
        </el-row>
      </el-col>
    </el-row>
  </box-wrapper>
</template>

<script setup lang="ts">
import BoxWrapper from "@/components/BoxWrapper.vue";
import SvgTwitter from "@/assets/icons/twitter.svg?component";
import SvgTelegram from "@/assets/icons/telegram.svg?component";
import SvgDiscord from "@/assets/icons/discord.svg?component";
import SvgReddit from "@/assets/icons/reddit.svg?component";
import SvgMail from "@/assets/icons/mail.svg?component";
import PngSocialCardImage from "@/assets/images/social-card-img.png";
import { store } from "@/store";

function getEmailStatus(): string {
  let email = store.state.UserModule?.user?.email;
  if (email) {
    return "E-Mail address is connected";
  }
  let emailMetadata = store.state.UserModule?.user?.metadata;
  if (emailMetadata && emailMetadata.get("EMAIL_ADDRESS_TO_VERIFY")) {
    return "E-Mail address is being verified";
  }
  return "E-Mail address is not connected";
}

const linkData = [
  {
    text: "Follow us",
    icon: SvgTwitter,
    color: "#D4E68C",
    link: "https://twitter.com/bonus_block",
  },
  {
    text: "Join group",
    icon: SvgTelegram,
    color: "#C3D0FF",
    link: "https://t.me/bonusblock",
  },
  {
    text: "Join server",
    icon: SvgDiscord,
    color: "#EFBEFF",
    link: "https://discord.com/invite/aKkE6Z6VBh",
  },
  {
    text: "Join subreddit",
    icon: SvgReddit,
    color: "#FFB4B4",
    link: "https://www.reddit.com/r/BonusBlock/",
  },
];
</script>

<style scoped lang="scss">
.social-card-container {
  padding: 2em;
  .social-card {
    flex-wrap: nowrap;
    overflow: hidden;

    .social-card-image {
      margin-top: auto;
      margin-bottom: auto;

      img {
        border: 1px solid black;
        border-radius: 12px;
        display: block;
        max-width: 30em;
      }
    }
    .social-card-text {
      margin-left: 1em;
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }
}

@media only screen and (max-width: 1200px) {
  .social-card-container {
    .social-card {
      flex-wrap: wrap;

      .social-card-image {
        img {
          max-width: 100%;
          width: 100%;
        }
        flex-grow: 1;
      }

      .social-card-text {
        margin-top: 1em;
        margin-left: 0;
        min-width: 100%;
      }
    }
  }
}
</style>
