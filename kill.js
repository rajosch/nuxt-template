const fs = require('fs');
const psTree = require('ps-tree');
const { promisify } = require('util');

const SAFE_PID_THRESHOLD = 500;  // Don't kill processes with PID below this value

async function killProcess(pid) {
    const fkill = (await import('fkill')).default;
    if (pid < SAFE_PID_THRESHOLD) {
        console.error(`Refusing to kill process ${pid} because its PID is below the safe threshold`);
        return;
    }
    try {
        await fkill(pid);
        console.log(`Killed process ${pid}`);
    } catch (err) {
        if (err.message.includes('No such process')) {
            console.log(`Process ${pid} does not exist`);
        } else {
            console.error(`Failed to kill process ${pid}:`, err);
        }
    }
}


async function killProcesses() {
    const pid = parseInt(fs.readFileSync('./tmp/pid.file'));
    const psTreePromise = promisify(psTree);
    const children = await psTreePromise(pid);
  
    for (const child of children) {
        await killProcess(parseInt(child.PID));
    }
  
    await killProcess(pid);

    if (fs.existsSync('./tmp/pid.file')) {
        fs.unlinkSync('./tmp/pid.file');
        console.log('Deleted PID file');
    }
}

killProcesses().catch(console.error);
