import shell from 'shelljs';

export async function execAsync(cmd: string) {
    console.log('$', cmd);

    const childProcess = shell.exec(cmd, { async: true });
    return new Promise<string>((resolve, reject) => {
        let stdout = '';
        childProcess.stdout?.on('data', (data) => {
            stdout += data;
        })

        childProcess.on('close', () => {
            if (childProcess.exitCode) {
                reject(new Error(childProcess.exitCode.toString()))
            } else {
                resolve(stdout)
            }
        })
    })
}
async function main() {
    const stdout = await execAsync('ls package.json');
    console.log({stdout});
}
main().catch(console.error);