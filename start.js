const { spawn } = require('child_process');
const fs = require('fs');

// Create the directory if it doesn't exist
const dir = './tmp';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Spawn the Nuxt process
const nuxtProcess = spawn(/^win/.test(process.platform) ? 'nuxt.cmd' : 'nuxt', ['dev'], {
  stdio: 'inherit', // Pass stdio to the parent process
  shell: true
});

// Write the PID to a file
fs.writeFileSync('./tmp/pid.file', nuxtProcess.pid.toString());

// When the Nuxt process ends, remove the PID file
nuxtProcess.on('exit', () => {
  fs.unlinkSync('./tmp/pid.file');
});
