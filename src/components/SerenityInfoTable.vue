<template>
  <el-table :data="tableData">
    <el-table-column :min-width="10" prop="id" label="#"/>
    <el-table-column :min-width="35" prop="blockTime" label="Block time"/>
    <el-table-column prop="trxId" label="Transaction Hash/ID">
      <template #default="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Open transaction details in Solana Explorer"
          raw-content
          placement="bottom-start"
        >
        <a :href="'https://explorer.solana.com/tx/'+scope.row.trxId+'?cluster=devnet'" target="_blank">
<!--            <svg-info class="icon-normal mr-extra-small" style="width: 25px;position: relative;margin: 0;top: 5px;"/>-->
            {{ scope.row.trxId.substring(0, 35) }}...
        </a>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="sender" label="Sender address"/>
  </el-table>
</template>

<script lang="ts" setup>
import type {StoreType} from "@/store";
import {useStore} from "@/store";
import {ref} from "vue";
import HttpResponse from "@/common/api/HttpResponse";
// import SvgInfo from "@/assets/icons/info.svg?component";


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
