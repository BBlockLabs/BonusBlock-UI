<template>
  <el-table :data="tableData">
    <el-table-column :min-width="10" prop="id" label="#"/>
    <el-table-column :min-width="35" prop="blockTime" label="Block time"/>
    <el-table-column prop="trxId" label="Transaction Hash/ID"/>
    <el-table-column prop="sender" label="Sender address"/>
  </el-table>
</template>

<script lang="ts" setup>
import type {StoreType} from "@/store";
import {useStore} from "@/store";
import {ref} from "vue";
import HttpResponse from "@/common/api/HttpResponse";

const store: StoreType = useStore();

let tableData = ref();

async function loadData() {
  const response: Response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/serenity/getLastInteractions`,
    {
      body: null,
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": store.state.UserModule?.token || "",
      },
      method: "POST",
    }
  );
  const responseData = await HttpResponse.fromResponse<null>(response);
  let ret = [];
  for (let i = 0; i < responseData.payload.length; i++) {
    let el = responseData.payload[i];
    el.id = i + 1;
    ret.push(el);
  }
  tableData.value = ret;
}

loadData();
</script>
