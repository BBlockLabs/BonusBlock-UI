<template>
  <div v-infinite-scroll="loadAnnouncements">
    <div v-if="announcements.length > 0" class="campaign-container mb-base">
      <div
        v-for="announcement in announcements"
        :key="announcement.id"
        class="project-card"
        style="display: flex;"
      >
        <div
          class="card-image"
          :class="announcement.bannerUrl ? '' : 'random-cube'"
          :style="{
            backgroundImage:
              'url(' +
              (announcement.bannerUrl ?? randomCube(announcement.id)) +
              ')',
            backgroundColor: randomBackgroundColor(announcement.id),
          }"
        ></div>
        <div class="pl-large pb-large mb-small card-content" style="flex-grow:1">
          <el-scrollbar :always="true" wrap-class="mr-large">
            <h3 class="fs-large my-base">{{ announcement.title }}</h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="announcement.description" />
          </el-scrollbar>

        </div>
        <div class="d-flex mb-large" style="padding-left:1.5em;padding-right:1.5em;">
          <div v-for="social in announcement.socials" :key="social.type">
            <el-link
              v-if="social.type !== 'main-link' && social.type !== 'main-label'"
              :href="social.link || social.url"
              target="_blank"
              :underline="false"
              class="mr-small mt-small fs-extra-small"
            >
              <social-icon :type="social.type" />
            </el-link>
          </div>
          <el-link
            v-if="announcement.mainLink"
            class="ml-auto"
            target="_blank"
            :href="announcement.mainLink"
            :underline="false"
          >
            <el-button type="primary">{{ announcement.mainLinkTitle }}</el-button>
          </el-link>
        </div>
      </div>
    </div>
    <div v-if="loading" class="el-loading-spinner static-spinner mb-small text-muted-more">
      <svg class="circular" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    </div>
    <div v-else-if="announcements.length < 1">No announcements yet</div>
  </div>
</template>
<script>
import RawCubeLeft from "@/assets/icons/cube-left.svg?raw";
import RawCubeRight from "@/assets/icons/cube-right.svg?raw";
import RawCubeTop from "@/assets/icons/cube-top.svg?raw";
import SocialIcon from "@/components/SocialIcon.vue";
import { ref } from "vue";

export default {
  components: {
    SocialIcon,
  },
  props: {
    topThree: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      announcements: ref([]),
    };
  },
  data() {
    return {
      page: 1,
      loading: false,
      stop: false,
    };
  },
  mounted() {
    if (this.topThree) {
      // load announcements
      this.loading = true;
      this.$store
        .dispatch("HttpModule/getAnnouncementsList", {
          page: 1,
          perPage: 3,
          sort: "HIGHEST_POOL",
          activeCampaignsOnly: true,
        })
        .then((newAnnouncements) => {
          this.announcements.length = 0;
          if (newAnnouncements) {
            for (let newAnnouncement of newAnnouncements) {
              this.announcements.push(newAnnouncement);
            }
          }
          this.loading = false;
        });
    }
  },
  methods: {
    loadAnnouncements: async function () {
      if (this.topThree) {
        return;
      }
      if (this.loading || this.stop) {
        return;
      }

      this.loading = true;
      const newAnnouncements = await this.$store.dispatch(
        "HttpModule/getAnnouncementsList",
        { page: this.page, perPage: 12 }
      );

      if (newAnnouncements) {
        for (let newAnnouncement of newAnnouncements) {
          this.announcements.push(newAnnouncement);
        }
      }
      this.page++;

      if (newAnnouncements.length < 12) {
        this.stop = true;
      }

      this.loading = false;
    },
    numberFromSeed(seed, max) {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash; // Convert to 32bit integer
      }
      return Math.abs(hash >> 7) % (max + 1);
    },
    randomCube(seed) {
      const cubes = [RawCubeLeft, RawCubeRight, RawCubeTop];
      const cube = cubes[this.numberFromSeed(seed, cubes.length - 1)];
      return "data:image/svg+xml;base64," + btoa(cube);
    },
    randomBackgroundColor(seed) {
      const colors = [
        "#ffeac3",
        "#d4e68c",
        "#b3dbd5",
        "#c3d0ff",
        "#efbeff",
        "#ffb4b4",
      ];
      return colors[this.numberFromSeed(seed, colors.length - 1)];
    },
  },
};
</script>
