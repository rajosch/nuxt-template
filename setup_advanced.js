const projectName = process.env.PROJECT_NAME;

const fs = require('fs');
const { exec } = require('child_process');

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
    await executeCommand('yarn add --dev tailwindcss @nuxtjs/tailwindcss');
  } catch (error) {
    console.error('Failed to install dependencies:', error);
  }
}

async function createDirectories() {
    console.log('Creating directories...');

    const directories = [
        'assets',
        'assets/css',
        'components',
        'components/Common',
        'layouts'
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
        path: 'tailwind.config.js',
        content: `const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
theme: {
    extend: {
    backgroundColor: {
        primary: "#222831",
        secondary: "#393E46",
        accent: "#00ADB5",
        light: "#EEEEEE",
    },
    textColor: {
        primary: "#222831",
        secondary: "#393E46",
        accent: "#00ADB5",
        light: "#EEEEEE",
    },
    borderColor: {
        primary: "#222831",
        secondary: "#393E46",
        accent: "#00ADB5",
        light: "#EEEEEE",
    },
    },
},
files: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
],
variants: {
    extend: {},
},
};
        `,
    },
    {
      path: 'assets/css/tailwind.css',
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;
        `,
    },
    {
      path: 'nuxt.config.ts',
      content: `export default defineNuxtConfig({
modules: [
    "@nuxtjs/tailwindcss"
],
tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true
}
});
        `,
    },
    {
      path: 'components/Common/Navbar.vue',
      content: `<template>
    <div class="rounded-md px-2 py-3 flex items-center justify-between text-light">
        <router-link to="/" class="text-4xl">
            ${projectName}
        </router-link>
    </div>
</template>
      
    `,
    },
    {
      path: 'components/Common/Bottom.vue',
      content: `<template>
    <div class="w-full grid place-items-center">
        <div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 flex flex-col sm:flex-row justify-between">
            <!-- Add your Bottom code here -->
            <router-link
                to="/privacy-policy"
                class="text-sm sm:text-base md:text-lg text-accent mb-2 sm:mb-0"
            >
                Privacy Policy
            </router-link>

            <router-link
                to="/terms-and-services"
                class="text-sm sm:text-base md:text-lg text-accent"
            >
                Terms and Services
            </router-link>
        </div>
    </div>
</template>
    `,
    },
    {
      path: 'pages/index.vue',
      content: `<template>
    <div class="px-2">
        Put your website content here!
    </div>
</template>
          
        `,
    },
    {
      path: 'layouts/default.vue',
      content: `<template>
    <Title>${projectName}</Title>
    <div class="relative h-screen bg-light flex flex-col mx-4">
        <main class="h-full w-full rounded-md mx-auto my-5 bg-secondary text-light drop-shadow-lg p-7 relative">
            <CommonNavbar class="mb-5" />
            <slot />
            <CommonBottom class="fixed bottom-5"/>
        </main>
    </div>
</template>
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
