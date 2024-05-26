import { expect } from 'chai';

import snap from 'snaptdout';
import style from './style'
import themes from './themes/themes';

const colorList = [
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'pink',
  'orange',
];

function createPhrases(styles: any, colors: string[] = colorList) {
  const maxLabelLength = colors.reduce((acc, key) => Math.max(acc, key.length), 0);
  return Object.keys(styles).reduce((acc: string[], key) => {
    if (colors.includes(key)) {
      const space = ' '.repeat((maxLabelLength - key.length) + 2);
      acc.push(styles[key]`${key.toUpperCase() + space}██████████`);
    }
    return acc;
  }, []);
}

describe('style', () => {
  describe('built-in themes', () => {
    it('should throw for non-existing theme', async () => {
      try {
        style({ theme: 'broccoli' });
      } catch (error) {
        expect(error.message).to.equal('no such theme broccoli')
      }
    });

    it('should create default theme', async () => {
      const d = style();
      const data = createPhrases(d);
      await snap(data.join('\n'), 'default');
    });

    it('should support all available themes', async () => {
      for (const theme in themes) {
        const colors = Object.keys(themes[theme as keyof typeof themes]);
        const custom = style({ theme });
        const data = createPhrases(custom, colors);
        await snap(data.join('\n'), `${theme} theme`);
      }
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

    it('should support partial custom color overrides with themes', async () => {
      const cc = style({
        theme: 'custom',
        colors: {
          custom: {
            blueish: '#89CFF0',
            orangish: '#FFA500',
          },
        }
      });

      const data = [cc.blueish`I am blueish`, cc.custom.blueish`still blueish! asd`, cc.orangish`but I am so !orangish!`];
      await snap(data.join('\n'), 'custom partial color theme');
    });
  });
});
