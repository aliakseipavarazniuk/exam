<template>
  <v-app>
    <div id="rick-and-morty">
      <div id="searchbox">
        <img
          class="main-logo"
          @click="reload()"
          width="240"
          src="../assets/logo.svg"
        />
        <div v-if="mode === 'all'" class="search-by ml-10">
          <span class="text">Search By</span>
          <v-autocomplete
            v-model="filteredBy"
            :items="itemsForFilter"
            :menu-props="{ contentClass: 'filter-open' }"
            dense
            filled
          ></v-autocomplete>
          <v-text-field
            :value="bye"
            class="input-search"
            @input="inputSearch({ value: $event })"
          ></v-text-field>
          <img
            class="search-icon"
            @click="search()"
            width="30"
            src="../assets/search.svg"
          />
        </div>
      </div>
      <div id="choose-mode">
        <div :class="{ active: mode === 'all' }" @click="changeAll()">
          All characters
        </div>
        <div :class="{ active: mode === 'favorite' }" @click="changeFav()">
          Favorites
        </div>
      </div>
      <v-data-table
        :items="items()"
        :headers="tableHeaders"
        :items-per-page="-1"
        :mobile-breakpoint="300"
        :must-sort="false"
        hide-default-footer
      >
        <template v-slot:item.gender="{ item }">
          <img
            v-if="item.gender === 'Male'"
            width="20"
            src="../assets/male.svg"
          />
          <img
            v-if="item.gender === 'Female'"
            width="20"
            src="../assets/female.svg"
          />
          <img
            v-if="item.gender === 'unknown'"
            width="20"
            src="../assets/remove.svg"
          />
          <img
            v-if="item.gender === 'Genderless'"
            width="20"
            src="../assets/close.svg"
          />
          {{ item.gender }}
        </template>
        <template v-slot:item.image="{ item }">
          <img width="68" :src="item.image" />
        </template>

        <template v-slot:item.favorite="{ index }">
          <v-btn
            :class="{
              'active-icon':
                favoriteArr.some(
                  (element) => element.id === tableRows[index].id
                ) || mode === 'favorite',
            }"
            @click="favor(index)"
          >
            FAVORITE</v-btn
          >
        </template>
      </v-data-table>
      <v-pagination
        v-if="mode === 'all'"
        v-model="searchResultsOptions.page"
        class="pagination"
        :length="searchResultsPagesCount"
        :total-visible="searchResultsVisiblePaginationItems"
      />
    </div>
  </v-app>
</template>

<script lang="ts" src="./Characters.js" />
<style lang="scss" scoped src="./Characters.scss" />
