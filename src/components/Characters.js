/* eslint-disable */
import axios from "axios";

export default {
  name: "Characters",
  data: () => ({
    tableRows: [],
    favoriteArr: [],
    mode: "all",
    inputValue: "",
    filteredBy: "Name",
    itemsForFiltering: ["Name", "Gender", "Species"],
    tableHeaders: [
      {
        text: "Photo",
        align: "center",
        sortable: false,
        value: "image",
      },
      {
        text: "Character ID",
        align: "center",
        sortable: false,
        value: "id",
      },
      {
        text: "Name",
        align: "center",
        sortable: false,
        value: "name",
      },
      {
        text: "Gender",
        align: "center",
        sortable: false,
        value: "gender",
      },
      {
        text: "Species",
        align: "center",
        sortable: false,
        value: "species",
      },
      {
        text: "Last episode",
        align: "center",
        sortable: false,
        value: "episodeVue",
      },
      {
        text: "Add to favorites",
        align: "center",
        sortable: false,
        value: "favorite",
      },
    ],
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

    inputSearch(event) {
      this.inputValue = event.value;
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

    search() {
      const key = this.filteredBy.toLowerCase();
      this.params[key] = this.inputValue;
      this.searchResultsOptions.page = 1;
      this.getCharacters();
    },

    items() {
      if (this.mode === "all") return this.tableRows;
      if (this.mode === "favorite") return this.favoriteArr;
    },

    async asyncEpisode(url, index) {
      const response = await axios.get(url);
      this.tableRows[index].episodeVue = response.data.episode;
    },

    changeAll() {
      this.mode = "all";
    },

    changeFav() {
      this.mode = "favorite";
    },

    favor(index) {
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

    setCasesRowsContent(responseData) {
      return responseData.map((apiObj) => {
        return {
          name: apiObj.name,
          image: apiObj.image,
          id: apiObj.id,
          gender: apiObj.gender,
          species: apiObj.species,
          episode: apiObj.episode[apiObj.episode.length - 1],
          episodeVue: "",
        };
      });
    },
  },
};
