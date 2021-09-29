// /* eslint-disable */
import axios from "axios";

export default {
  name: "Characters",
  data: () => ({
    tableRows: [],
    favoriteArr: [],
    listEpisodes: [],
    mode: "all",
    bye: "",
    filteredBy: "Name",
    itemsForFilter: ["Name", "Gender", "Species"],
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
        value: "episode",
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
        this.listEpisodes = [];
        this.getCh();
      },
    },
  },
  created() {
    this.getCh();
  },
  methods: {
    getCh() {
      return axios
        .get("https://rickandmortyapi.com/api/character", {
          params: this.params,
        })
        .then((response) => {
          this.tableRows = this.setCasesRowsContent(response.data.results);
          this.searchResultsPagesCount = response.data.info.pages;
        });
    },

    inputSearch(event) {
      this.bye = event.value;
    },

    reload() {
      this.searchResultsOptions.page = 1;
      this.params = { page: 1 };
      this.bye = "";
      this.mode = "all";
      this.getCh();
    },

    search() {
      const key = this.filteredBy.toLowerCase();
      this.params[key] = this.bye;
      this.searchResultsOptions.page = 1;
      this.getCh();
    },

    items() {
      if (this.mode === "all") return this.tableRows;
      if (this.mode === "favorite") return this.favoriteArr;
    },

    lastEpisode(episodes) {
      axios.get(episodes[episodes.length - 1]).then((response) => {
        this.listEpisodes.push(response.data.episode);
      });
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

    inFavor(index) {
      // return this.favoriteArr.some((element) => element === this.tableRows[index]);
      return this.favoriteArr.includes(this.tableRows[index]);
    },

    setCasesRowsContent(responseData) {
      return responseData.map((apiObj) => {
        return {
          name: apiObj.name,
          image: apiObj.image,
          id: apiObj.id,
          gender: apiObj.gender,
          species: apiObj.species,
          episode: this.lastEpisode(apiObj.episode),
        };
      });
    },
  },
};
