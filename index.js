const RESET = '\x1b[0m';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToAnsi(r, g, b, txt) {
  return `\x1b[38;2;${r};${g};${b}m${txt || ''}${txt ? RESET: ''}`;
}

function makeColors(codes) {
  return Object.keys(codes).reduce((acc, code) => {
    let value = codes[String(code)];
    if (Array.isArray(value)) value = value.join(';');
    if (typeof value === "string" && value.toString().includes('#')) {
      const {r, g, b} = hexToRgb(value);
      value = rgbToAnsi(r, g, b);
      acc[code] = value;
      return acc;
    };
    if (typeof value === 'object') {
      acc[code] = makeColors(value);
      return acc;
    }
    acc[code] = `\x1b[${value}m`;
    return acc;
  }, {});
}

function makeFunctions(colorMap) {
  return Object.keys(colorMap).reduce((acc, color) => {
    if (typeof colorMap[color] === 'object') {
      acc[color] = makeFunctions(colorMap[color]);
      return acc;
    }
    acc[color] = function (txt, ...args) {
      let value = txt;
      if (args.length > 0) {
        value = args.map((arg, i) => txt[i] + arg).join('');
      } else if (Array.isArray(txt)) { 
        value = txt[0]; 
      }
      let formattedColor = colorMap[color];
      Object.keys(symbols).forEach(key => {
        const regexString = `\\${key}(.*?)\\` + key;
        const regex = new RegExp(regexString, 'g');
        if (value.match(regex)) {
          const [subject, stripped] = regex.exec(value);
          value = value.replace(subject, decorators[symbols[key]](formattedColor + stripped + RESET + formattedColor))
        }
      });
      return `${formattedColor}${value}${RESET}`;
    };
    return acc;
  }, {});
}

const colors = {
  red: [38, 5, 160],
  green: 32,
  yellow: [38, 5, 227],
  blue: 34,
  purple: 35,
  cyan: 96,
  pink: 95,
  orange: 93,
  marine: 94,
  white: 97,
  black: 30,
  reset: 0,
  pastel: {
    red: 31,
    green: [38, 5, 49],
    yellow: 33,
    blue: [38, 5, 39],
    purple: [38, 5, 147],
    cyan: [38, 5, 159],
    pink: [38, 5, 219],
    orange: [38, 5, 209],
  },
  lush: {
    red: [38, 5, 196],
    green: [38, 5, 154],
    yellow: [38, 5, 226],
    blue: [38, 5, 57],
    purple: [38, 5, 128],
    cyan: [38, 5, 87],
    pink: [38, 5, 198],
    orange: [38, 5, 202],
  },
  standard: {
    red: [38, 5, 9],
    green: [38, 5, 10],
    yellow: [38, 5, 11],
    blue: [38, 5, 27],
    purple: [38, 5, 105],
    cyan: [38, 5, 123],
    pink: [38, 5, 200],
    orange: [38, 5, 202],
  },
  pinkish: {
    thistle: '#E0BBE4',
    lavender: '#957DAD',
    violet: '#D291BC',
    candy: '#FEC8D8',
    lumber: '#FFDFD3'
  },
  sunset: {
    yellow: '#ffb400',
    orange: '#e58637',
    darkOrange: '#d6423b',
    red: '#b41039',
    bordeux: '#420c30',
  },
  beach: {
    red: '#fe4a49',
    green: '#2ab7ca',
    yellow: '#fed766',
    blue: '#92C4EE',
    pink: '#de5285',
    purple: '#8277f9'
  }
};

const decorators = {
  bold: (color) => color.replace('m', ';1m'),
  blink: (color) => color.replace('m', ';5m'),
  dim: (color) => color.replace('m', ';2m'),
  hidden: (color) => color.replace('m', ';8m'),
  underline: (color) => color.replace('m', ';4m'),
  invert: (color) => color.replace('m', ';7m'),
}

const symbols = { 
  '*': 'bold',
  '!': 'underline',
  '~': 'dim',
  '#': 'hidden',
  '@': 'invert',
  '^': 'blink'
}

function ztyle(config) {
  const {colorMap, theme} = Object.assign({colorMap: colors, theme: ''}, config);
  const colorCodes = makeColors(colorMap);
  const themedColors = theme ? colorCodes[theme] : colorCodes;
  const functions = makeFunctions(themedColors);
  return {
    ...colorCodes,
    ...functions,
    ...decorators,
    ...symbols,
    rgb: (r, g, b) => txt => rgbToAnsi(r, g, b, txt),
    hex: (hex) => txt => { 
      const {r, g, b} = hexToRgb(hex);
      return rgbToAnsi(r, g, b, txt);
    },
    
  };
}

module.exports = ztyle