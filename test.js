const keys = require('./snapshots/index.test');
const shellfie = require('shellfie');

(async function () {
  for (const key in keys) {
    await shellfie(key + '\n' + keys[key].join('\n'), {
      viewport: { width: 300, height: 300 },
      name: key,
    });
  }
})();
