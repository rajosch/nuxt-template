<template>
  <section
    id="features"
    class="min-h-screen relative flex"
  >
    <div class="mx-auto">
      <h1 class="text-5xl font-bold text-center pb-16">
        Next Generation Utility
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(feature, index) in featureTopic"
          :key="index"
          class="feature-card flex flex-col h-full"
        >
          <div class="border border-white relative text-2xl p-4 rounded shadow-lg card content flex flex-col justify-between h-full">
            <div class="mb-4">
              <h2 class="text-2xl text-center mb-4 font-semibold">
                {{ feature.title }}
              </h2>
              <p class="text-center md:text-left text-xl h-12">
                {{ feature.description }}
              </p>
              <div class="h-54">
                <img
                  :src="feature.icon"
                  alt="Icon description"
                  class="mx-auto block h-56 w-56"
                >
              </div>
              <p class="text-xl text-center md:text-left">
                {{ feature.data }}
              </p>
            </div>
            <div class="mt-auto grid place-items-center">
              <a
                :href="feature.buttonUrl"
                target="_blank"
              >
                <button
                  v-if="feature.button !== ''" 
                  class="mt-4 py-2 px-4 bg-white text-lg text-primary rounded-full"
                >{{ feature.button }}</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
  import Image1 from "@/assets/img/1.svg";
  import Image2 from "@/assets/img/2.svg";
  import Image3 from "@/assets/img/3.svg";
  import Image4 from "@/assets/img/subdomain.png";
  import store from "~/store";

  export default {
    data() {
      return {
        ...store,
        featureTopic: [
          {
              title: 'The NFT',
              description: 'Buy it once, own it forever.',
              icon: Image1,
              data: 'Once your own your domain, it\'s yours! No subscriptions, no renewals. Your NFT, your content, your data',
              button: '',
              buttonUrl:''
          },
          {
              title: 'ENS Ready',
              description: 'Your namespace for Web 3.0 and Web 2.0',
              icon: Image2,
              data: `Built on the Cortex Network, and leveraging the Butterfly Protocol, you can use your .${store.tld.value} domains just like other Web 3.0-enabled domains`,
              button: 'Learn More',
              buttonUrl: 'https://crtx.app'
          },
          {
              title: 'Publish',
              description: 'Not your keys, not your content.',
              icon: Image3,
              data: `Use Cortex Press to publish content to your .${store.tld.value} domain. Your fans can even access your site in Web 2.0 environments!`,
              button: 'Learn More',
              buttonUrl: 'https://cortex.press'
          },
          {
              title: 'Subdomains',
              description: 'Mint an infinite amount.',
              icon: Image4,
              data: `Want to build a community around your .${store.tld.value}? Mint subdomains for members, customers, projects, activations, and more`,
              button: '',
              buttonUrl: ''
          },
        ],
      }
    },
  }
</script>
  
  
<style scoped>
  @media (min-width: 768px) {
    .card-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
  }
</style>
