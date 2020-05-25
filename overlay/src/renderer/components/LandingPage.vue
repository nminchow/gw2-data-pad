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
  import { mapActions, mapGetters } from 'vuex';
  import { VueTabs, VTab } from 'vue-nav-tabs/dist/vue-tabs.js';
  import itemTemplate from './LandingPage/ItemTemplate';
  import wikiTab from './LandingPage/WikiTab';

  const wiki = wikijs({
    apiUrl: 'https://wiki.guildwars2.com/api.php',
  });

  const goToTab = (tab, context) => {
    context.webTabs.push(tab);
    // eslint-disable-next-line no-return-assign
    setTimeout(() => context.activeTab = tab.title, 0);
  };

  const commands = context => [
    {
      text: 'help',
      icon: 'info-circle',
      onClick: () => {
        goToTab({ title: 'Welcome!', url: 'https://nminchow.github.io/gw2-overlay/' }, context);
      },
    },
    {
      text: 'clear',
      icon: 'eraser',
      onClick: () => {
        context.webTabs = [];
      },
    },
    {
      text: 'updates',
      icon: 'list-alt',
      onClick: () => {
        goToTab({ title: 'Game Updates', url: 'https://wiki.guildwars2.com/wiki/Game_updates' }, context);
      },
    },
    {
      text: 'bookmark',
      icon: 'bookmark',
      onClick: () => {
        if (!context.activeTab) return;
        context.addBookmark(context.activeTab);
      },
    },
    {
      text: 'clear bookmarks',
      icon: ['far', 'bookmark'],
      onClick: () => {
        context.clearBookmarks();
      },
    },
  ];

  // eslint-disable-next-line prefer-arrow-callback, func-names
  const callApi = debounce(function (text, context) {
    if (!text) return;
    wiki.search(text).then(({ results }) => {
      console.log('setting');
      context.searchResults = results.map(text => ({
        text,
        icon: ['fab', 'wikipedia-w'],
        onClick: () => {
          goToTab({ title: text, url: `https://wiki.guildwars2.com/wiki/${text}` }, context);
        },
      }));
    });
  }, 500);

  const loadingItem = {
    text: 'Searching...',
    icon: ['fas', 'cog'],
    spin: true,
    onClick: () => {},
  };

  export default {
    name: 'landing-page',
    components: {
      VueSuggestion, wikiTab, VueTabs, VTab,
    },
    data() {
      return {
        activeTab: 0,
        item: {},
        items: [],
        localItems: [],
        webTabs: [],
        searchResults: [],
        itemTemplate,
      };
    },
    mounted() {
      ipcRenderer.on('focused', () => {
        this.focusInput();
      });
    },
    computed: {
      displayedItems() {
        return this.localItems.concat(this.searchResults);
      },
    },
    methods: {
      ...mapActions('bookmarks', {
        addBookmark: 'add',
        clearBookmarks: 'clear',
      }),
      ...mapGetters('bookmarks', ['bookmarks']),
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      itemSelected(item) {
        item.onClick();
      },
      setLabel(item) {
        return item.name;
      },
      focusInput() {
        document.getElementsByClassName('vs__input')[0].focus();
      },
      inputChange(text) {
        this.localItems = [];
        this.searchResults = [];
        if (text.startsWith('>')) {
          const keyword = text.split('>')[1].trim().toLowerCase();
          this.localItems = commands(this).filter(({ text }) => text.includes(keyword));
        } else {
          const bookmarkMatches = this.bookmarks()
            .filter(bookmark => bookmark.toLowerCase().includes(text.toLowerCase()))
            .map(text => ({
              text,
              icon: ['far', 'bookmark'],
              onClick: () => {
                goToTab({ title: text, url: `https://wiki.guildwars2.com/wiki/${text}` }, this);
              },
            }));
          this.localItems = bookmarkMatches;
          this.searchResults.push(loadingItem);
          callApi(text, this);
        }
      },
      removeTab(index) {
        this.webTabs.splice(index, 1);
      },
    },
  };
</script>

<style>
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

  .vue-tabs .nav-tabs > li > a {
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
