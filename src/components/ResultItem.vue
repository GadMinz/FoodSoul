<script lang="ts" setup>
import { TResultItem } from "@/types.ts";

defineProps<{ result: TResultItem }>();
</script>

<template>
  <div class="result-item">
    <p>{{ result.display_name }}</p>
  </div>
</template>

<style lang="scss" scoped>
.result-item {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
