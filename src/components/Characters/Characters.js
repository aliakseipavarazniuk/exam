/* eslint-disable */
import axios from "axios";
import { tableHeaders } from "./_data.js";

export default {
  name: "Characters",
  data: () => ({
    tableRows: [],
    favoriteArr: [],
    tableHeaders: tableHeaders,
    mode: "all",
    inputValue: "",
    filteredBy: "Name",
    itemsForFiltering: ["Name", "Gender", "Species"],
    searchResultsOptions: {
      page: 1,
      itemsPerPage: 20,
    },
    params: {
      page: 1,
    },
    searchResultsPagesCount: 0,
    searchResultsVisiblePaginationItems: 6,
  }),
  watch: {
    searchResultsOptions: {
      deep: true,

      handler(newVal) {
        this.params.page = newVal.page;
        this.getCharacters();
      },
    },
  },
  created() {
    this.getCharacters();
  },
  methods: {
    getCharacters() {
      return axios
        .get("https://rickandmortyapi.com/api/character", {
          params: this.params,
        })
        .then((response) => {
          this.tableRows = this.setCasesRowsContent(response.data.results);
          this.tableRows.forEach((element, index) =>
            this.asyncEpisode(element.episode, index)
          );
          this.searchResultsPagesCount = response.data.info.pages;
        });
    },

    async asyncEpisode(url, index) {
      const response = await axios.get(url);
      this.tableRows[index].episodeView = response.data.episode;
    },

    setCasesRowsContent(responseData) {
      return responseData.map((apiObj) => {
        return {
          name: apiObj.name,
          image: apiObj.image,
          id: apiObj.id,
          gender: apiObj.gender,
          species: apiObj.species,
          episode: apiObj.episode[apiObj.episode.length - 1],
          episodeView: "",
        };
      });
    },

    reload() {
      this.searchResultsOptions.page = 1;
      this.params = {
        page: 1,
      };
      this.inputValue = "";
      this.mode = "all";
      this.getCharacters();
    },

    searchByFilter() {
      const key = this.filteredBy.toLowerCase();
      this.params[key] = this.inputValue;
      this.searchResultsOptions.page = 1;
      this.getCharacters();
    },

    sourceImg(gender) {
      if (gender === "Female") return require("@/assets/female.svg");
      if (gender === "Male") return require("@/assets/male.svg");
      if (gender === "unknown") return require("@/assets/remove.svg");
      if (gender === "Genderless") return require("@/assets/close.svg");
    },

    inputSearch(event) {
      this.inputValue = event.value;
    },

    items() {
      if (this.mode === "all") return this.tableRows;
      if (this.mode === "favorite") return this.favoriteArr;
    },

    changeMode(mode) {
      this.mode = mode;
    },

    favoriteAction(index) {
      if (this.mode === "favorite") {
        this.favoriteArr.splice(
          this.favoriteArr.indexOf(this.favoriteArr[index]),
          1
        );
        return;
      }
      if (
        this.mode === "all" &&
        this.favoriteArr.some(
          (element) => element.id === this.tableRows[index].id
        )
      ) {
        this.favoriteArr.splice(
          this.favoriteArr.indexOf(this.tableRows[index]),
          1
        );
        return;
      }
      this.favoriteArr.push(this.tableRows[index]);
    },
  },
};
