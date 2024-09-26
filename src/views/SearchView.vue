<script lang="ts" setup>
import { ref } from "vue";
import ResultItem from "@/components/ResultItem.vue";
import { storeToRefs } from "pinia";
import useSearchStore from "@/store/searchStore";
import { debounce } from "@/functions";

const query = ref("");
const searchStore = useSearchStore();

const handleInput = debounce(() => {
  if (query.value.trim().length === 0) {
    searchStore.clearResults();
    return;
  }
  searchStore.fetchResults(query.value);
}, 500);

const { results, loading } = storeToRefs(searchStore);
</script>

<template>
  <div class="search-container">
    <input
      v-model="query"
      @input="handleInput"
      type="text"
      placeholder="Search"
    />
    <div class="results">
      <div
        v-if="loading"
        v-for="(_, index) in [...new Array(3)]"
        :key="index" class="result-item loading">
      </div>
      <ResultItem
        v-else
        v-for="result in results"
        :key="result.place_id"
        :result="result"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  width: 100%;
  margin: 50px auto;
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .results {
    &-item {
      margin-bottom: 10px;
    }
  }
  .result-item.loading {
    height: 45px;
    width: 100%;
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
    margin-bottom: 10px;
  }
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
}
</style>
