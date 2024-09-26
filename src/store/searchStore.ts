import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import { TResultItem } from "../types.ts";

const useSearchStore = defineStore("search", {
  state: () => ({
    results: [] as TResultItem[],
    loading: false,
  }),
  actions: {
    async fetchResults(query: string) {
      if (!query) {
        this.results = [];
        return;
      }
      this.loading = true;
      try {
        const response: AxiosResponse<TResultItem[]> = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: query,
              format: "json",
            },
          },
        );
        const { data } = response;
        if (data.length === 0) {
          data.push({ display_name: "NotFound", place_id: 0 });
        }
        this.results = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    clearResults() {
      this.results = [];
    },
  },
});

export default useSearchStore;
