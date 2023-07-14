const fs = require('fs');
const { exec } = require('child_process');

// imports
const colors = require('./assets/data/colors.json');


// passed variables
let domainName = process.argv[2];
let ensBridge = process.argv[3];
let ensTld = process.argv[4];
let issuanceId = process.argv[5];
let press = process.argv[6];
let zoneContract = process.argv[7];
let basePrice = process.argv[8];
let colorScheme = process.argv[9];


function getObject() {
  return colors[colorScheme] ? colors[colorScheme] : colors.BProto;
}

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

// async function createDirectories() {
//     console.log('Creating directories...');

//     const directories = [
//         // 'composables',
//         // 'layouts',
//     ];

//     for (const directory of directories) {
//         try {
//         await fs.promises.mkdir(directory);
//         console.log(`Successfully created ${directory}`);
//         } catch (error) {
//         if (error.code === 'EEXIST') {
//             console.log(`${directory} already exists.`);
//         } else {
//             console.error('Failed to create directory:', error);
//         }
//         }
//     }
// }

// Create and write to files
async function createFiles() {
  console.log('Creating and writing files...');

  const files = [
    {
        path: 'store.js',
        content: `import { reactive, toRefs } from "vue";

const state = reactive({
  tld: '${domainName}',
  ensBridge: ${ensBridge},
  ensTld: '${ensTld}',
  issuanceId: ${issuanceId},
  press: ${press},
  zoneContract: ${zoneContract},
  // pricing in dollars
  basePrice: ${basePrice},
  //event-notifictaion
  errorHappened: false,
  successHappened: false,
  message: '',
});

function setErrorHappened(value) {
  state.errorHappened = value;
}

function setSuccessHappened(value) {
    state.successHappened = value;
}

function setMessage(message) {
  state.message = message;
}

export default {
  ...toRefs(state),
  setErrorHappened,
  setSuccessHappened,
  setMessage,
};
`,
    },
    {
      path: 'tailwind.config.js',
      content: `/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    theme: {
        extend: 
          ${JSON.stringify(getObject(), null, 12)}
        ,
    },
    variants: {
        extend: {
            backgroundColor: ['dark'],
            textColor: ['dark'],
        },
    },
    plugins: [],
}`
    }
  ];

  files.forEach((file) => {
    if (fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
        console.log(`Successfully deleted ${file.path}`);
      } catch (error) {
        console.error(`Failed to delete file: ${error}`);
      }
    }
    
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
  // await createDirectories();
  createFiles();
}

main();
