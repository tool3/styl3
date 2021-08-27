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
      acc.push(styles[key]`${key.toUpperCase()} ██████████`);
    }
    return acc;
  }, []);
}

describe('style', () => {
  describe('built-in themes', () => {
    it('should create default theme', async () => {
      const d = style();
      const data = createPhrases(d);
      await snap(data.join('\n'), 'default');
    });

    it('should support pastel theme', async () => {
      const pastel = style({ theme: 'pastel' });
      const data = createPhrases(pastel);
      await snap(data.join('\n'), 'pastel');
    });
    it('should support lush theme', async () => {
      const lush = style({ theme: 'lush' });
      const data = createPhrases(lush);
      await snap(data.join('\n'), 'lush');
    });
    it('should support standard theme', async () => {
      const standard = style({ theme: 'standard' });
      const data = createPhrases(standard);
      await snap(data.join('\n'), 'standard');
    });
    it('should support beach theme', async () => {
      const standard = style({ theme: 'beach' });
      const data = createPhrases(standard);
      await snap(data.join('\n'), 'beach');
    });
  });

  describe('built-in decorators', () => {
    it('should support double decorators', async () => {
      const s = style();
      const data = s.pink`I am SO *!PINK!* `;
      await snap(data, 'double decorators');
    });
    it('should support all major decorators', async () => {
      const s = style();
      const data = s.lush.pink`*BOLD* !UNDERLINE! @INVERT@ $STRIEKOUT$ %ITALIC%`;
      await snap(data, 'major decorators');
    });
  });

  describe('customs', () => {
    it('should support custom color theme', async () => {
      const custom = style({
        theme: 'custom',
        colors: {
          custom: {
            red: '#750404',
            green: '#1b7504',
            yellow: '#929605',
            blue: '#041382',
            purple: '#620182',
            cyan: '#027678',
            pink: '#a3039b',
            orange: '#b37202',
          },
        },
      });
      const data = createPhrases(custom);
      await snap(data.join('\n'), 'custom');
    });
    it('should support custom symbols map', async () => {
      const custom = style({
        decorators: {
          bold: '-',
          underline: '&',
          dim: '%',
          hidden: '?',
          invert: '>',
          blink: '<',
        },
      });
      const data = [custom.green`this is -bold-`, custom.red`this is >inverted>`];
      await snap(data.join('\n'), 'custom symbols');
    });
    it('should support partial custom symbols map', async () => {
      const cc = style({
        decorators: {
          underline: '+'
        },
      });
      const data = [cc.purple`this is +underline+`, cc.blue`this is *bold*`];
      await snap(data.join('\n'), 'custom partial symbols');
    });
    it('should support partial custom color overrides', async () => {
      const cc = style({
        colors: {
          green: 35
        },
      });
      const data = [cc.green`I *should* be green`, cc.green`but I am so !purple!`];
      await snap(data.join('\n'), 'custom partial color replace');
    });
  });
});
