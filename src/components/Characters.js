import axios from "axios";

export default {
  name: "Characters",
  props: ["msg"],
  data: () => ({
    tableRows: [],
    listEpisodes: [],
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
    ],
    searchResultsOptions: {
      page: 1, // UWAGA: v-pagination liczy od 1
      itemsPerPage: 20,
    },
    searchResultsPagesCount: 0,
    searchResultsVisiblePaginationItems: 6,
  }),
  watch: {
    searchResultsOptions: {
      deep: true,

      handler(newVal) {
        this.getCh(newVal.page);
        this.listEpisodes = [];
      },
    },
  },
  created() {
    this.getCh("1");
  },
  methods: {
    getCh(currentPage) {
      return axios
        .get("https://rickandmortyapi.com/api/character", {
          params: {
            page: currentPage,
          },
        })
        .then((response) => {
          console.log("response", response.data);
          // eslint-disable-next-line
          this.tableRows = this.setCasesRowsContent(response.data.results);
          this.searchResultsPagesCount = response.data.info.pages;
        });
    },

    lastEpisode(episodes) {
      axios.get(episodes[episodes.length - 1]).then((response) => {
        this.listEpisodes.push(response.data.episode);
      });
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
