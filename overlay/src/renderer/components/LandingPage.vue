/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
<template>
  <main>
      <span class="suggestionWrapper" >
        <vue-suggestion :items="displayedItems"
                v-model="item"
                :setLabel="setLabel"
                :itemTemplate="itemTemplate"
                @changed="inputChange"
                @selected="itemSelected">
        </vue-suggestion>
      </span>
      <br/>
      <vue-tabs v-model="activeTab">
        <v-tab v-for="(webTab, index) in webTabs" :key="index" :title="webTab.title">
          <div slot="title">{{webTab.title}} <span class="close" @click.stop="removeTab(index)"><font-awesome-icon icon="times" /></span></div>
          <wiki-tab :item="webTab"/>
        </v-tab>
      </vue-tabs>
  </main>
</template>

<script>
  import wikijs from 'wikijs';
  import { debounce } from 'lodash';
  import { VueSuggestion } from 'vue-suggestion';
  import { ipcRenderer } from 'electron';
  import { VueTabs, VTab } from 'vue-nav-tabs/dist/vue-tabs.js';
  import itemTemplate from './LandingPage/ItemTemplate';
  import wikiTab from './LandingPage/WikiTab';

  const wiki = wikijs({
    apiUrl: 'https://wiki.guildwars2.com/api.php',
  });

  const onClick = () => {};

  // eslint-disable-next-line func-names
  const callApi = debounce(function (text, context) {
    console.log('here');
    console.log(text);
    if (!text) return;
    wiki.search(text).then(({ results }) => {
      console.log('setting');
      console.log(this.webTabs);
      context.displayedItems = results.map((text, order) => ({
        text,
        icon: ['fab', 'wikipedia-w'],
        onClick: () => {
          context.webTabs.push({ title: text, order, url: `https://wiki.guildwars2.com/wiki/${text}` });
          // eslint-disable-next-line no-return-assign
          setTimeout(() => context.activeTab = text, 0);
        },
      }));
    });
  }, 500);

  export default {
    name: 'landing-page',
    components: {
      VueSuggestion, wikiTab, VueTabs, VTab,
    },
    data() {
      return {
        activeTab: 0,
        item: {},
        items: [
          { id: 1, text: 'Golden Retriever', onClick },
          { id: 2, text: 'Cat', onClick },
          { id: 3, text: 'Squirrel', onClick },
        ],
        displayedItems: [],
        webTabs: [],
        itemTemplate,
      };
    },
    mounted() {
      ipcRenderer.on('focused', () => {
        this.focusInput();
      });
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      itemSelected(item) {
        // this.item = item;
        // console.log(this.item);
        // clipboard.writeText(item.name);
        // ipcRenderer.send('close', true);
        item.onClick();
      },
      setLabel(item) {
        return item.name;
      },
      focusInput() {
        document.getElementsByClassName('vs__input')[0].focus();
      },
      inputChange(text) {
        this.displayedItems = [];
        callApi(text, this);
      },
      removeTab(index) {
        this.webTabs.splice(index, 1);
      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  .vue-tabs .nav-tabs {
    border-bottom: none;
  }

  .close {
    cursor: pointer;
    margin-left: 1rem;
  }

  .tab {
    font-weight: bold;
  }

  .vue-tabs .nav-tabs > li {
    background: black;
  }

  .vue-tabs .nav > li > a {
    padding: 5px 15px;
  }

  .vue-suggestion .vs__list {
      width: 45vw;
      text-align: left;
      border: none;
      border-top: none;
      max-height: 400px;
      overflow-y: auto;
      border-bottom: 1px solid #023d7b;
      display: inline-block;
      z-index: 100;
  }
  .suggestionWrapper {
    display: flex;
    align-items: center;
    flex-flow: column;
  }
  .vue-suggestion .vs__input {
    width: 45vw;
    font-size: 1.4rem;
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
