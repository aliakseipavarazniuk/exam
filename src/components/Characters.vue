<template>
  <div id="rick">
    <h3>{{ searchResultsOptions }}</h3>
    <v-data-table
      :items="tableRows"
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
    </v-data-table>
    <v-pagination
      v-model="searchResultsOptions.page"
      class="pagination"
      :length="searchResultsPagesCount"
      :total-visible="searchResultsVisiblePaginationItems"
    />
  </div>
</template>

<script lang="ts" src="./Characters.js" />
<style lang="scss" scoped src="./Characters.scss" />
