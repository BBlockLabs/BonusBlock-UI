<template>
  <el-footer class="px-large py-medium" :class="classesList">
    <el-row justify="space-between" class="gap-small" align="middle">
      <el-col :span="-1">
        <social-links
          :twitter="LinkTwitter"
          :github="LinkGithub"
          :telegram="LinkTelegram"
          :reddit="LinkReddit"
          :discord="LinkDiscord"
        />
      </el-col>

      <el-col :span="-1">
        <b> © BonusBlock 2023 </b>
      </el-col>
    </el-row>
  </el-footer>
</template>

<script setup lang="ts">
import SocialLinks from "@/components/ExternalLinks.vue";
import { normalizeClass, unref } from "vue";
import { useNamespace } from "element-plus";

const LinkGithub: string = import.meta.env.VITE_LINK_GITHUB;
const LinkTwitter: string = import.meta.env.VITE_LINK_TWITTER;
const LinkTelegram: string = import.meta.env.VITE_LINK_TELEGRAM;
const LinkReddit: string = import.meta.env.VITE_LINK_REDDIT;
const LinkDiscord: string = import.meta.env.VITE_LINK_DISCORD;

export interface Props {
  colored?: boolean;
}

const props: Props = withDefaults(defineProps<Props>(), {
  colored: false,
});

const ns = useNamespace("footer");

const classesList = normalizeClass([unref(ns).is("colored", props.colored)]);
</script>
