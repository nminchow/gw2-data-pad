<template>
  <main>
      <vue-suggestion :items="displayedItems"
              v-model="item"
              :setLabel="setLabel"
              :itemTemplate="itemTemplate"
              @changed="inputChange"
              @selected="itemSelected">
      </vue-suggestion>
  </main>
</template>

<script>
  import { VueSuggestion } from 'vue-suggestion';
  import { ipcRenderer, clipboard } from 'electron';
  import SystemInformation from './LandingPage/SystemInformation';
  import itemTemplate from './LandingPage/ItemTemplate';


  export default {
    name: 'landing-page',
    components: { SystemInformation, VueSuggestion },
    data() {
      return {
        item: {},
        items: [
          { id: 1, name: 'Golden Retriever' },
          { id: 2, name: 'Cat' },
          { id: 3, name: 'Squirrel' },
        ],
        displayedItems: [],
        itemTemplate,
      };
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      itemSelected(item) {
        this.item = item;
        console.log(this.item);
        clipboard.writeText(item.name);
        ipcRenderer.send('close', true);
      },
      setLabel(item) {
        return item.name;
      },
      inputChange(text) {
        // your search method
        this.displayedItems = this.items.filter(item => item.name.includes(text));
        // now `items` will be showed in the suggestion list
      },
    },
  };
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  .vue-suggestion .vs__list {
      width: 45vw;
      text-align: left;
      border: none;
      border-top: none;
      max-height: 400px;
      overflow-y: auto;
      border-bottom: 1px solid #023d7b;
  }
  .vue-suggestion .vs__input {
    width: 45vw;
  }
  .vue-suggestion .vs__list .vs__list-item {
      background-color: #fff;
      padding: 10px;
      border-left: 1px solid #023d7b;
      border-right: 1px solid #023d7b;
  }
  .vue-suggestion .vs__list .vs__list-item:last-child {
      border-bottom: none;
  }
  .vue-suggestion .vs__list .vs__list-item:hover {
      background-color: #eee !important;
  }
  .vue-suggestion .vs__list,
  .vue-suggestion .vs__loading {
      position: absolute;
  }
  .vue-suggestion .vs__list .vs__list-item {
      cursor: pointer;
  }
  .vue-suggestion .vs__list .vs__list-item.vs__item-active {
      background-color: #f3f6fa;
  }
</style>
