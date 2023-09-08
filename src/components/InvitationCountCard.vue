<template>
  <el-card class="card">
    <el-row justify="center">
      <el-col :span="-1">
        <h1 class="title my-medium">
          {{ store.state.UserModule?.user?.invitedCount || "0" }}
        </h1>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="-1"><h3>Successful Invitations</h3></el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { useStore, StoreType } from "@/store";

const store: StoreType = useStore();
</script>

<style lang="scss" scoped>
.title {
  font-size: 48px;
}

.card{
  border-radius: 4px;
  border: 1px solid var(--Obsidian-Shard, #060612);
  background: #D4E68C !important;
  box-shadow: none;
}
</style>
