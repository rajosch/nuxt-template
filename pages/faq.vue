<template>
  <div class="flex h-full">
    <div
      id="sidebar"
      class="w-1/4 p-5"
    >
      <div
        id="searchbar"
        class="mb-10"
      >
        <input  
          v-model="searchTerm" 
          class="text-xl w-5/6 rounded-lg p-1 text-black"
          border-color="transparent" 
          type="text"
          placeholder="look up your question..."
        >
      </div>

      <div class="w-full grid place-items-center">
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
      class="w-3/4 p-5"
    >
      <div
        v-if="searchTerm.length !== 0"
        id="searchbar-results"
        class="h-96 overflow-x-auto"
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
            title: 'domain',
            description: '',
            subtopics: [
              {
                title: 'What can I do with my domain?',
                description: [`All .${store.tld.value} domains are able to publish web pages and more with Cortex Press. 
                When holding a .${store.tld.value} domain you can register as many subdomains as you want. 
                Each page that you create under these domains has a corresponding wallet address. 
                You can use it to hold NFT tickets, publish pictures and more .${store.tld.value} domains are a way for you to communicate around NFT projects!`]
              },
              {
                title: `How can I get a .${store.tld.value} domain?`,
                description: [`Look up which .${store.tld.value} domain is available. If your domain is still available, you will need to connect a wallet to purchase it.`]
              },
              {
                title: `How is the price for a .${store.tld.value} calculated?`,
                description: [`The price to purchase a .${store.tld.value} domain is dependent on the amount of letters in the domain name you want to purchase.`,
                              `>= 8 letters: $100`,
                              `7 letters: $200`,
                              `6 letters: $400`,
                              `5 letters: $800`,
                              `4 letters: $1,600`,
                              `3 letters: $3,200`,
                              `2 letters: $6,400`,
                              `1 letters: $12,800`
                            ]
              },
              {
                title: 'Are there renewal fees?',
                description: ['No! Because these are normal NFTs, like the art and .jpeg NFTs, you know and love. The important point to remember is that because you will always have this domain until you sell.']
              },
              {
                title: 'What marketplaces will my domains be available in?',
                description: [' Anywhere normal NFTs are available, including OpenSea.']
              },
            ]
          },
          {
            title: 'subdomain',
            description: '',
            subtopics: [
              {
                title: 'Do I have to pay to register subdomains as well?',
                description: [
                  "No!",
                  `You do not have to purchase the subdomains like you have to with the original .${store.tld.value} domain.`,
                  'But you will have to pay the gas fees to register the subdomain. '
              ]
              }
            ]
          },
          {
            title: 'ens',
            description: '',
            subtopics: [
              {
                title: `Will I own an ENS domain when purchasing a .${store.tld.value} domain?`,
                description: [
                  `Yes! You will hold both example.${store.tld.value} and example.${store.ensTld.value}.`,
                  `.${store.tld.value} is bridged to a subdomain of ${store.ensTld.value} on ENS which you will have control over.`,
                  `Important:`,
                  `Transferring ownership of your .${store.ensTld.value} domain will also transfer the ownership of your bridged ENS subdomain.`,
                  `However, transferring your bridged ENS subdomain will NOT transfer the ownership of your .${store.ensTld.value} domain.`
                ]
              },
              {
                title: 'Are these domains ENS compatible?',
                description: ['Yes! These come with all the benefits of an ENS domain, plus much more!']
              },
              {
                title: 'Do subdomains also get registered on ENS?',
                description: [`No. Only your original .${store.tld.value} domain gets registered on ENS.`]
              },
              {
                title: 'Do they resolve in MetaMask?',
                description: [`Yes! yourname.${store.ensTld.value} will be your crypto address that will resolve in Metamask, and you can send and receive tokens, ERC20 coins, and anything from a normal ENS domain. `]
              }
            ]
          },
          {
            title: 'cortex press',
            description: '',
            subtopics: [
              {
                title: `How can I publish with my .${store.tld.value} domain using Cortex Press?`,
                description: ['Coming Soon!']
              }
            ]
          },
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