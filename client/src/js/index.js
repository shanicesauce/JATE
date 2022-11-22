import './database';
import '../css/style.css';

import { Workbox } from 'workbox-window';
// import { header } from './header';
import { installer } from './install';
import Editor from './editor';

const main = document.querySelector('#main');
main.innerHTML = '';


const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  const workboxSw = new Workbox( 'sw.js');

  workboxSw.register();
  // navigator.serviceWorker
  //   .register("./service-worker.js")
  //   .then(function (reg) {
  //     console.log("Successfully registered service worker", reg);
  //   })
  //   .catch(function (err) {
  //     console.warn("Error whilst registering service worker", err);
  //   });
}
else {
console.log('service worker is not supported');
};

installer();

