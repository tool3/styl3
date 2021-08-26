const { describe, it } = require('mocha');
const snap = require('snaptdout');
const style = require('./index');

function createPhrases(styles) {
  const colors = [
    'red',
    'green',
    'yellow',
    'blue',
    'purple',
    'cyan',
    'pink',
    'orange',
  ];
  return Object.keys(styles).reduce((acc, key) => {
      if (colors.includes(key)) {
        acc.push(styles[key]`Hello there, I should be ${key.toUpperCase()}`);
      }
      return acc;
  }, []);
}

describe('style', () => {
  it('should create default palette', async () => {
    const d = style();
    const data = createPhrases(d);
    await snap(data.join('\n'), 'default');
  });

  it('should support pastel palette', async () => {
    const pastel = style({ theme: 'pastel' });
    const data = createPhrases(pastel);
    await snap(data.join('\n'), 'pastel');
  });
  it('should support lush palette', async () => {
    const lush = style({ theme: 'lush' });
    const data = createPhrases(lush);
    await snap(data.join('\n'), 'lush');
  });
  it('should support standard palette', async () => {
    const standard = style({ theme: 'standard' });
    const data = createPhrases(standard);
    await snap(data.join('\n'), 'standard');
  });
});
