import { SNAKE_API } from '@/settings';
import Vue from 'vue';

export function postCommand(SHA256Digest, scale, command, { format, timeout } = {}) {
  const data = {
    sha256_digest: SHA256Digest,
    scale,
    command,
    asynchronous: 'true',
  };
  if (format) {
    data[format] = format;
  }
  if (timeout) {
    data[timeout] = timeout;
  }
  return new Promise((resolve) => {
    Vue.http.post(`${SNAKE_API}/command`, data).then((response) => {
      resolve(response.data.data.command);
    }).catch((e) => {
      console.log(`An error occured - ${e}`);
      resolve(null);
    });
  });
}

export function getCommands(SHA256Digest) {
  let path = 'commands';
  if (typeof SHA256Digest !== 'undefined') {
    path = `${path}?sha256_digest=${SHA256Digest}`;
  }
  return new Promise((resolve) => {
    Vue.http.get(`${SNAKE_API}/${path}`).then((response) => {
      resolve(response.data.data.commands);
    }).catch((e) => {
      console.log(`An error occured - ${e}`);
      resolve(null);
    });
  });
}