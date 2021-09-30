<template>
  <v-app>
    <div id="rick-and-morty">
      <div id="searchbox">
        <img
          class="main-logo"
          @click="reload()"
          width="240"
          src="../../assets/logo.svg"
        />
        <div v-if="mode === 'all'" class="search-by ml-10">
          <span class="text">Search By</span>
          <v-autocomplete
            v-model="filteredBy"
            :items="itemsForFiltering"
            :menu-props="{ contentClass: 'filter-open' }"
            dense
            filled
          ></v-autocomplete>
          <v-text-field
            :value="inputValue"
            class="input-search"
            @input="inputSearch({ value: $event })"
          ></v-text-field>
          <img
            class="search-icon"
            @click="searchByFilter()"
            width="30"
            src="../../assets/search.svg"
          />
        </div>
      </div>
      <div id="choose-mode">
        <div :class="{ active: mode === 'all' }" @click="changeMode('all')">
          All characters
        </div>
        <div
          :class="{ active: mode === 'favorite' }"
          @click="changeMode('favorite')"
        >
          Favorites
        </div>
      </div>
      <v-data-table
        :items="items()"
        :headers="tableHeaders"
        :items-per-page="-1"
        mobile-breakpoint="750"
        :must-sort="false"
        class="characters-table"
        hide-default-footer
      >
        <template v-slot:item.gender="{ item }">
          <img width="22" class="gender-icon" :src="sourceImg(item.gender)" />
          {{ item.gender === "unknown" ? "Unknown" : item.gender }}
        </template>
        <template v-slot:item.image="{ item }">
          <img class="characters-image" width="68" :src="item.image" />
        </template>

        <template v-slot:item.favorite="{ index }">
          <div
            :class="[
              'favorite-icon',
              {
                'active-mode':
                  favoriteArr.some(
                    (element) => element.id === tableRows[index].id
                  ) || mode === 'favorite',
              },
            ]"
            @click="favoriteAction(index)"
          >
            <img
              v-if="
                favoriteArr.some(
                  (element) => element.id === tableRows[index].id
                ) || mode === 'favorite'
              "
              width="22"
              src="../../assets/grade_white.svg"
            />
            <img v-else width="22" src="../../assets/grade.svg" />
          </div>
        </template>
      </v-data-table>
      <v-pagination
        v-if="mode === 'all'"
        v-model="searchResultsOptions.page"
        class="pagination"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        :length="searchResultsPagesCount"
        :total-visible="searchResultsVisiblePaginationItems"
      />
    </div>
  </v-app>
</template>

<script lang="ts" src="./Characters.js" />
<style lang="scss" scoped src="./Characters.scss" />
