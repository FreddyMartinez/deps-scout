import { get } from "https";

export function httpGet(url: string) {
  return new Promise<string>((resolve, reject) => {
    get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(`Error: ${error.message}`);
    });
  });
}