import { readFile } from "fs";
import { messages } from "./constants";

export function readFileAsync(path: string, encoding: BufferEncoding) {
  return new Promise<string>((resolve, reject) => {
    readFile(path, encoding, (err, data) => {
      if (err) {
        reject(new Error(messages.fileNotFound(path)));
      } else {
        resolve(data);
      }
    });
  });
}
