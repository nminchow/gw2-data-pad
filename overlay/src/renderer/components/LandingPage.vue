<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Welcome to your new project!
        </span>
        <system-information></system-information>
          <vue-suggestion :items="displayedItems"
                  v-model="item"
                  :setLabel="setLabel"
                  :itemTemplate="itemTemplate"
                  @changed="inputChange"
                  @selected="itemSelected">
          </vue-suggestion>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
          <button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import { VueSuggestion } from 'vue-suggestion';
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

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

  .vue-suggestion {
  width: 50%;
  max-width: 400px;
  margin: 0 auto;
}
.vue-suggestion .vs__input-group .vs__input {
  width: 100%;
  display: block;
  margin: 0 auto;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  line-height: 1.25;
  color: #464a4c;
  outline: none;
  background-color: #fff;.vue-suggestion {
  width: 50%;
  max-width: 400px;
  margin: 0 auto;
}
.vue-suggestion .vs__input-group .vs__input {
  width: 100%;
  display: block;
  margin: 0 auto;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  line-height: 1.25;
  color: #464a4c;
  outline: none;
  background-color: #fff;
  background-image: none;
  background-clip: padding-box;
  border: 1px solid #cecece;
  border-radius: 0.25rem;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.vue-suggestion .vs__input-group .vs__input:focus {
  border: 1px solid #023d7b;
}
.vue-suggestion .vs__list {
  width: 100%;
  text-align: left;
  border: none;
  border-top: none;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #023d7b;
}
.vue-suggestion .vs__list .vs__list-item {
  cursor: pointer;
  background-color: #fff;
  padding: 10px;
  border-left: 10px solid #023d7b;
  border-right: 1px solid #023d7b;
}
.vue-suggestion .vs__list .vs__list-item:last-child {
  border-bottom: none;
}
.vue-suggestion .vs__list .vs__list-item:hover {
  background-color: #eee !important;
}
  background-image: none;
  background-clip: padding-box;
  border: 1px solid #cecece;
  border-radius: 0.25rem;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.vue-suggestion .vs__input-group .vs__input:focus {
  border: 1px solid #023d7b;
}
.vue-suggestion .vs__list {
  width: 100%;
  text-align: left;
  border: none;
  border-top: none;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #023d7b;
}
.vue-suggestion .vs__list .vs__list-item {
  cursor: pointer;
  background-color: #fff;
  padding: 10px;
  border-left: 10px solid #023d7b;
  border-right: 1px solid #023d7b;
}
.vue-suggestion .vs__list .vs__list-item:last-child {
  border-bottom: none;
}
.vue-suggestion .vs__list .vs__list-item:hover {
  background-color: #eee !important;
}
</style>
