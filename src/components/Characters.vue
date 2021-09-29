<template>
  <div id="rick">
    <v-btn @click="changeAll()">ALL</v-btn>
    <v-btn @click="changeFav()">FAVORITE</v-btn>
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
      <template v-slot:item.episode="{ index }">
        {{ listEpisodes[index] }}
      </template>
      <template v-slot:item.favorite="{ index }">
        <v-btn
          :class="{
            'active-icon':
              favoriteArr.includes(tableRows[index]) || mode === 'favorite',
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
</template>

<script lang="ts" src="./Characters.js" />
<style lang="scss" scoped src="./Characters.scss" />
