import { exec } from "child_process";

export function asyncExec(command: string) {
  return new Promise<string>((resolve, reject) => {
    exec(command, (_, stdout, stderr) => {
      if (stderr !== "") {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}
