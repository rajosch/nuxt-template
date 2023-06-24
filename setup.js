const fs = require('fs');
const { exec } = require('child_process');

// passed variables
let domainName = process.argv[2];


// Function to execute shell commands
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve(stdout);
      }
    });
  });
}

// Install dependencies
async function installDependencies() {
  console.log('Installing dependencies...');
  try {
    await executeCommand('yarn');
  } catch (error) {
    console.error('Failed to install dependencies:', error);
  }
}

async function createDirectories() {
    console.log('Creating directories...');

    const directories = [
        // 'composables',
        'layouts',
    ];

    for (const directory of directories) {
        try {
        await fs.promises.mkdir(directory);
        console.log(`Successfully created ${directory}`);
        } catch (error) {
        if (error.code === 'EEXIST') {
            console.log(`${directory} already exists.`);
        } else {
            console.error('Failed to create directory:', error);
        }
        }
    }
}

// Create and write to files
async function createFiles() {
  console.log('Creating and writing files...');

  const files = [
    {
        path: 'layouts/default.vue',
        content: `<template>
    <div class="bg-gradient-to-r from-primary-start to-primary-end relative text-white">
        <Title>.${domainName}</Title>

        <CommonNavbar />

        <main class="flex flex-1 flex-col">
            <slot />
        </main>

        <CommonBottom />
    </div>
</template>
        `,
    },
    {
        path: 'components/Common/Navbar.vue',
        content: `<template>
<div as="nav" class="shadow-md">
  <div class="flex justify-between items-center text-2xl sm:p-2 md:p-5">

    <div class="hidden sm:flex items-center">
        <img class="h-16 pr-10" src="~/assets/img/logo.svg" alt=" ${domainName} Domains" />
        <div class="text-3xl font-bold"> ${domainName}</div>
    </div>
    <div class="flex sm:hidden w-1/2 items-center py-4 pl-4">
        <img class="h-12 pr-5" src="~/assets/img/logo.svg" alt=" ${domainName} Domains" />
        <div class="text-2xl font-bold"> ${domainName}</div>
    </div>

    <!-- Navigation for desktop -->
    <div class="hidden lg:flex justify-center flex-grow">
      <div class="px-5" v-for="item in navigation">
        <div class="relative">
          <div class="flex items-center">
            <router-link
              :to="item[0]"
              class="text-xl p-2 py-3 px-3 hover:opacity-100"
              :class="{ 'opacity-100': $route.path === item[0] }, { 'opacity-50': $route.path !== item[0] }"
            >
              {{ item[1] }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
    data() {
        return {
        navigation: [
            ["/", "HOME"],
            ["/#features", "FEATURES"],
            ["/faq", "FAQ"],
        ]
        }
    },
}
</script>

<style>
html {
scroll-behavior: smooth;
}
</style>
        `,
    },
    {
        path: 'components/Section/Hero.vue',
        content: `<template>
<div class="overflow-x-hidden flex items-center justify-center" id="home">
    <div class="">
        <!-- COPY SECTION -->
        <div class="flex flex-col gap-y-10 sm:flex-row">
            <div class="text-left text-shadow w-full sm:w-3/5">
                <h1 class="text-4xl md:text-5xl uppercase">Secure Your ${domainName} Domain Today</h1>
                <div class="mt-5 text-lg md:text-xl">
                    Embrace the future with your ideal ${domainName} domain today. 
                    Make your mark in the crypto world and transform ideas into reality in your unique digital space.
                </div>
            </div>

            <!-- IMAGE SECTION -->
            <div class="hidden sm:flex justify-center w-2/5">
                <img class="w-full sm:w-3/4 md:w-1/2" src="~assets/img/logo.svg">
            </div>
        </div>
    </div>
</div>
</template>
        `,
    },
    {
        path: 'components/Section/Features.vue',
        content: `<template>
  <section id="features" class="min-h-screen relative flex">
      <div class="mx-auto">
          <h1 class="text-5xl font-bold text-center pb-16">Next Generation Utility</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="feature-card flex flex-col h-full" v-for="(feature, index) in featureTopic">
                  <div class="border border-white relative text-2xl p-4 rounded shadow-lg card content flex flex-col justify-between h-full">
                      <div class="mb-4">
                          <h2 class="text-2xl text-center mb-4">{{ feature.title }}</h2>
                          <p class="text-center md:text-left text-xl h-12">{{ feature.description }}</p>
                          <div class="h-54">
                              <img :src="feature.icon" alt="Icon description" class="mx-auto block h-56 w-56">
                          </div>
                          <p class="text-xl text-center md:text-left">{{ feature.data }}</p>
                      </div>
                      <div class="mt-auto grid place-items-center">
                          <a :href="feature.buttonUrl" target="_blank">
                              <button v-if="feature.button !== ''" 
                              class="mt-4 py-2 px-4 bg-white text-lg text-primary rounded-full">{{ feature.button }}</button>
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
    export default {
        data() {
            return {
                featureTopic: [
                    {
                        title: 'The NFT',
                        description: 'Buy it once, own it forever.',
                        icon: Image1,
                        data: 'Once your own your domain, it\\'s yours! No subscriptions, no renewals. Your NFT, your content, your data',
                        button: '',
                        buttonUrl:''
                    },
                    {
                        title: 'ENS Ready',
                        description: 'Your namespace for Web 3.0 and Web 2.0',
                        icon: Image2,
                        data: 'Built on the Cortex Network, and leveraging the Butterfly Protocol, you can use your .${domainName} domains just like other Web 3.0-enabled domains',
                        button: 'Learn More',
                        buttonUrl: 'https://crtx.app'
                    },
                    {
                        title: 'Publish',
                        description: 'Not your keys, not your content.',
                        icon: Image3,
                        data: 'Use Cortex Press to publish content to your .${domainName} domain. Your fans can even access your site in Web 2.0 environments! yourname. ${domainName}.fans',
                        button: 'Learn More',
                        buttonUrl: 'https://cortex.press'
                    },
                    {
                        title: 'Subdomains',
                        description: 'Mint an infinite amount.',
                        icon: Image4,
                        data: 'Want to build a community around your .${domainName}? Mint subdomains for members, customers, projects, activations, and more',
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
`,
    },
  ];

  files.forEach((file) => {
    fs.writeFile(file.path, file.content, (error) => {
      if (error) {
        console.error('Failed to write file:', error);
      } else {
        console.log(`Successfully created ${file.path}`);
      }
    });
  });
}

async function main() {
  await installDependencies();
  await createDirectories();
  createFiles();
}

main();
