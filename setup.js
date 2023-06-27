const fs = require('fs');
const { exec } = require('child_process');

// passed variables
let domainName = process.argv[2];
let ensBridge = process.argv[3];
let ensTld = process.argv[4];
let issuanceId = process.argv[5];


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
        });
        
        export default {
            ...toRefs(state),
        };
        
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
  // await createDirectories();
  createFiles();
}

main();
