const RESET = '\x1b[0m';

const colorMap = {
  reset: 0,
  red: [38, 5, 160],
  green: 32,
  yellow: [38, 5, 227],
  blue: 34,
  purple: [38, 5, 57],
  cyan: 96,
  pink: 95,
  orange: [38, 5, 215],
  marine: 94,
  white: 97,
  black: 30,
  pastel: {
    red: 31,
    green: [38, 5, 49],
    yellow: [38, 5, 228],
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
    orange: [38, 5, 214],
  },
  pinkish: {
    thistle: '#E0BBE4',
    lavender: '#957DAD',
    violet: '#D291BC',
    candy: '#FEC8D8',
    lumber: '#FFDFD3',
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
    purple: '#8277f9',
    cyan: '#00FFFF',
    orange: '#F77E02',
  },
};

const decoratorMap = {
  bold: '*',
  underline: '!',
  dim: '~',
  hidden: '#',
  invert: '@',
  blink: '^',
  italic: '%',
  strikeout: '$',
};

const decoratorFunctions = {
  bold: (color) => color.replace('m', ';1m'),
  dim: (color) => color.replace('m', ';2m'),
  italic: (color) => color.replace('m', ';3m'),
  underline: (color) => color.replace('m', ';4m'),
  blink: (color) => color.replace('m', ';5m'),
  invert: (color) => color.replace('m', ';7m'),
  hidden: (color) => color.replace('m', ';8m'),
  strikeout: (color) => color.replace('m', ';9m'),
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToAnsi(r, g, b, txt) {
  return `\x1b[38;2;${r};${g};${b}m${txt || ''}${txt ? RESET : ''}`;
}

function getValue(txt, ...args) {
  // console.log(txt)
  let value = txt; 
  const sanitizedArgs = args.filter(a => a && a !== undefined);
  if (sanitizedArgs.length > 0) {
    value = txt.map((t, i) => t + (sanitizedArgs[i] || '')).join('');
  } else if (Array.isArray(txt)) {
    value = txt[0];
  }
  return value;
}

function makeColors(codes) {
  return Object.keys(codes).reduce((acc, code) => {
    let value = codes[String(code)];
    if (Array.isArray(value)) value = value.join(';');
    if (typeof value === 'string' && value.toString().includes('#')) {
      const { r, g, b } = hexToRgb(value);
      value = rgbToAnsi(r, g, b);
      acc[code] = value;
      return acc;
    }
    if (typeof value === 'object') {
      acc[code] = makeColors(value);
      return acc;
    }
    acc[code] = `\x1b[${value}m`;
    return acc;
  }, {});
}

function makeFunctions(colors, symbols) {
  return Object.keys(colors).reduce((acc, color) => {
    if (typeof colors[color] === 'object') {
      acc[color] = makeFunctions(colors[color], symbols);
      return acc;
    }
    acc[color] = function (txt, ...args) {
      let value = getValue(txt, ...args);
      let formattedColor = colors[color];
      
      Object.keys(symbols).forEach((key) => {
        const regexString = `\\${symbols[key]}(.*)\\` + symbols[key];
        const regex = new RegExp(regexString, 'gsm');
        if (value.match(regex)) {
          const [subject, stripped] = regex.exec(value);
          value = value.replace(
            subject,
            decoratorFunctions[key](
              formattedColor + stripped + RESET + formattedColor
            )
          );
        }
      });
      return `${formattedColor}${value}${RESET}`;
    };
    return acc;
  }, {});
}

function style(config = {}) {
  const { colors, theme, decorators } = config;
  const colorz = Object.assign({}, colorMap, colors);
  const symbolz = Object.assign({}, decoratorMap, decorators);
  const colorCodes = makeColors(colorz);
  const themedColors = theme ? Object.assign(colorCodes, colorCodes[theme]) : colorCodes;
  if (!themedColors) throw new Error(`no such theme ${theme}`);
  const functions = makeFunctions(themedColors, symbolz);
  return {
    colors: {...themedColors},
    ...functions,
    ...decoratorFunctions,
    ...symbolz,
    rgb: (r, g, b) => (txt, args) => {
      const value = getValue(txt, args);
      return rgbToAnsi(r, g, b, value);
    },
    hex: (hex) => (txt, args) => {
      const value = getValue(txt, args);
      const { r, g, b } = hexToRgb(hex);
      return rgbToAnsi(r, g, b, value);
    },
    ansi: (ansi) => (txt, args) => {
      const value = getValue(txt, args);
      return `${ansi}${value}${RESET}`
    },
  };
}

module.exports = style;
