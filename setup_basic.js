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
        'assets/css'
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
        fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
        },
    },
    },
    files: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}"
    ],
    variants: {
    extend: {},
    }
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
        '@nuxtjs/tailwindcss',    
    ],
        tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        injectPosition: 0,
        viewer: true,
    },
})
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
