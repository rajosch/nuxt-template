<template>
  <div class="grid lg:flex h-full w-full">
    <div
      id="sidebar"
      class="w-full lg:w-1/4 px-3 py-5 lg:px-5"
    >
      <div
        id="searchbar"
        class="lg:flex grid place-items-center mb-10"
      >
        <input  
          v-model="searchTerm" 
          class="text-xl w-5/6 rounded-lg p-1 text-black"
          border-color="transparent" 
          type="text"
          placeholder="look up your question..."
        >
      </div>
  
      <div class="hidden w-full lg:grid place-items-center h-3/4 overflow-x-auto">
        <div
          v-for="topic in topics"
          id="topics"
          :key="topic"
          class="w-full"
        >
          <div class="uppercase text-xl font-semibold">
            {{ topic.title }}
          </div>
          <div
            v-for="subtopic in topic.subtopics"
            id="subtopics"
            :key="subtopic"
            class="ml-5 text-lg cursor-pointer my-1"
            @click="selectSubtopic(subtopic)"
          > 
            {{ subtopic.title }}
          </div>
        </div>
      </div>
    </div>
  
    <div
      id="main"
      class="w-full lg:w-3/4 p-3 lg:p-5"
    >
      <div
        v-if="searchTerm.length !== 0"
        id="searchbar-results"
        class="h-96 overflow-x-auto grid place-items-center"
      >
        <div
          v-for="subtopic in filteredSubtopic"
          :key="subtopic"
          class="mb-5 border w-5/6 rounded-md p-3 cursor-pointer"
          @click="selectSubtopic(subtopic)"
        >
          <div class="font-semibold mb-5">
            <Highlighter
              :search-words="splitSearch"
              :auto-escape="true"
              :text-to-highlight="subtopic.title"
            />
          </div>
          <div
            v-for="line in subtopic.description"
            :key="line"
            class="w-4/5"
          >
            <Highlighter
              :search-words="splitSearch"
              :auto-escape="true"
              :text-to-highlight="line"
            />
          </div>
        </div>
      </div>
      <div
        v-if="selectedSubtopic.length !== 0 && searchTerm.length === 0"
        id="description"
        class="text-xl"
      >
        <div class="font-semibold mb-5">
          {{ selectedSubtopic.title }}
        </div>
        <div
          v-for="line in selectedSubtopic.description"
          :key="line"
          class="w-4/5"
        >
          {{ line }}
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
    import store from '~/store';
    import Highlighter from 'vue-highlight-words'
  
    export default {
      components: {
        Highlighter
      },
      data() {
        return {
          ...store,
          searchTerm: '',
          selectedSubtopic: '',
          topics: [
            {
              title: 'Nuxt.js',
              description: 'Nuxt.js is a framework built on Vue.js, a popular JavaScript framework for building user interfaces. Nuxt.js simplifies the process of creating universal or server-rendered Vue.js applications, providing a higher-level application framework on top of Vue.js, incorporating many of the best practices for web development into a single, easy-to-use package.',
              subtopics: [
                {
                  title: 'Features',
                  description: [
                    'Nuxt.js provides features like Server Side Rendering, Static Site Generation, Automatic Routing, Single File Vue Components, Async Data, Middleware, Layouts, and powerful loading of assets.',
                    'These features are all built in and configurable, making development more consistent and predictable.'
                  ]
                },
                {
                  title: 'Ease of use',
                  description: [
                    'Nuxt.js is designed to be easy to use while still providing powerful features for building complex applications.',
                    'The default configuration provides good defaults for most applications, and configuration options allow for more customization where needed.'
                  ]
                },
                {
                  title: 'Ecosystem',
                  description: [
                    'Nuxt.js can be extended with a wide range of modules, allowing for features like PWA support, automatic sitemap generation, and more to be easily added.',
                    'The Nuxt.js community also provides a large number of components, modules, and plugins to speed up development.'
                  ]
                },
                {
                  title: 'Nuxt.js 3',
                  description: [
                    'Nuxt.js 3 includes a number of improvements and new features like faster cold start, better performance, fine-tuned rendering, and improved developer experience.',
                    'The Nitro Engine is a significant feature that provides faster server-side rendering and lighter deployments.'
                  ]
                }
              ]
            },
            {
              title: 'Vue.js Foundation',
              description: 'Nuxt.js is built on Vue.js, a popular JavaScript framework for building user interfaces.',
              subtopics: [
                {
                  title: 'Components',
                  description: [
                    'These are reusable Vue instances with a name.',
                    'Components are the building blocks of Vue.js applications.'
                  ]
                },
                {
                  title: 'Directives',
                  description: [
                    'These are special attributes with the `v-` prefix.',
                    'Directives apply special reactive behavior to the rendered DOM.'
                  ]
                },
                {
                  title: 'Vue Router',
                  description: [
                    'This is the official router for Vue.js.',
                    'Vue Router allows you to build Single Page Applications (SPAs) with Vue.js.'
                  ]
                },
                {
                  title: 'Vuex',
                  description: [
                    'Vuex is a state management pattern + library for Vue.js applications.',
                    'Vuex serves as a centralized store for all the components in an application.'
                  ]
                }
              ]
            },
            {
              title: 'Universal SSR (Server-Side Rendering)',
              description: 'Nuxt.js provides a streamlined, easy-to-use method for implementing SSR in a Vue.js application.',
              subtopics: [
                {
                  title: 'Server-Side Rendering (SSR)',
                  description: [
                    'SSR is a technique for rendering a normally client-side-only single page app (SPA) on the server and then sending a fully rendered page to the client.',
                    'This improves SEO and performance.'
                  ]
                }
              ]
            },
            {
              title: 'Page Routing',
              description: 'Nuxt.js simplifies routing by creating a `pages/` directory in your project root. Every `.vue` file you put in this folder will automatically become a route in your application.',
              subtopics: [
                {
                  title: 'Automatic Routing',
                  description: [
                    'In traditional Vue applications, you have to manually define all your routes within a router configuration file. With Nuxt, you simply place your Vue files in the pages directory and Nuxt automatically generates the router configuration for you.',
                    'This feature also includes dynamic route handling by naming your Vue files or folders with an underscore prefix.'
                  ]
                },
                {
                  title: 'Nested Routes',
                  description: [
                    'Nuxt supports nested routes, useful for creating multi-level routes. Simply create a directory structure that follows your desired URL path and Nuxt will automatically generate the nested routes.',
                    'For example, to achieve a path like `/user/1`, you create a `user` directory with an `_id.vue` file inside.'
                  ]
                }
              ]
            },
            {
              title: 'Async Data',
              description: 'Nuxt.js offers a more powerful system where you can add an `asyncData` method to any component, which Nuxt.js will call and await for before initializing the component. The object returned from `asyncData` will be merged with the component data.',
              subtopics: [
                {
                  title: 'asyncData Usage',
                  description: [
                    '`asyncData` allows you to handle asynchronous data operations before setting the component data. It can be used for fetching data and rendering it on the server-side.',
                    'It is called every time before loading the component (only for page components). It can be asynchronous and should return an object that will be merged with the component data.'
                  ]
                },
                {
                  title: 'Fetching External Data',
                  description: [
                    'You can use any modern library to fetch data in your `asyncData` method.',
                    'For example, using `axios` to fetch data from an API endpoint is common. The result can be set to a data property and will be automatically available in the template.'
                  ]
                }
              ]
            },
            {
              title: 'Middleware',
              description: 'Middleware lets you define custom functions that can run before rendering a page or a group of pages.',
              subtopics: [
                {
                  title: 'Middleware Usage',
                  description: [
                    'You can have a middleware function that checks if a user is authenticated before they are allowed to access certain routes.',
                    'Middleware can be defined at the layout level, the page level, or even for all routes.'
                  ]
                },
                {
                  title: 'Creating and Using Middleware',
                  description: [
                    'To create a middleware, simply add a `.js` file in the `middleware/` directory. The file will automatically be converted to a middleware function.',
                    'You can then apply this middleware to any page components by adding a `middleware` property to them.'
                  ]
                },
                {
                  title: 'Anonymous Middleware',
                  description: [
                    'Nuxt.js also supports defining middleware functions directly in the `middleware` property of a page component.',
                    'This is useful for middleware logic that is specifically tied to a certain page.'
                  ]
                }
              ]
            },
            {
              title: 'Modules',
              description: 'Nuxt\'s modular architecture lets you extend its core features via modules.',
              subtopics: [
                {
                  title: 'Module Usage',
                  description: [
                    'A module is a function that is called sequentially when booting Nuxt.',
                    'You can use modules to do everything from setting up HTTP/2 push headers and generating sitemaps, to turning your Nuxt.js application into a Progressive Web App (PWA).',
                    'Nuxt has a variety of community modules you can use, and you can also write your own.'
                  ]
                }
              ]
            },
            {
              title: 'Deployment and Static Site Generation',
              description: 'Nuxt.js supports various deployment options, including traditional server deployment, serverless deployment, and JAMstack-style deployment through static site generation.',
              subtopics: [
                {
                  title: 'Static Site Generation',
                  description: [
                    'Nuxt.js has a `nuxt generate` command for building a static version of your application.',
                    'This command will generate every route as a HTML file.',
                    'The Nuxt.js team has worked on improving the delivery of these static sites with features like payload extraction.'
                  ]
                },
                {
                  title: 'Server Deployment',
                  description: [
                    'For server deployments, you typically have a Node.js server running the Nuxt renderer.'
                  ]
                },
                {
                  title: 'Serverless Deployment',
                  description: [
                    'For serverless, each page of your application corresponds to a serverless function.',
                    'This setup is beneficial in cloud environments that support serverless computing, like AWS Lambda, Google Cloud Functions, and Vercel.'
                  ]
                }
              ]
            }
          ]
        }
      },
      computed: {
        splitSearch() {
          return (this.searchTerm.toLowerCase()).split(' ');
        },
        filteredSubtopic() {
          const subtopics = this.topics.flatMap(topic => topic.subtopics || []);
  
          return subtopics.filter((topic) => {
            const title = topic.title?.toLowerCase();
            return this.containsSearchTerm(title) || topic.description.find(line => this.containsSearchTerm(line));
          });
        }
      },
      methods: {
        selectSubtopic(subtopic) {
          this.searchTerm = '';
          this.selectedSubtopic = subtopic;
        },
        containsSearchTerm(item) {
          return this.splitSearch.find(term => item.includes(term)) ? true : false;
        },
      }
    }
  </script>