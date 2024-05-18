import { Colors, Config, DecoratorMap, Decorators, Theme } from './types/types';

const RESET = '\x1b[0m';

const colorMap: Colors = {
    reset: 0,
    red: [38, 5, 160],
    green: 32,
    yellow: [38, 5, 227],
    blue: 34,
    purple: 35,
    cyan: 96,
    pink: [38, 5, 219],
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
        orange: [38, 5, 209]
    },
    lush: {
        red: [38, 5, 196],
        green: [38, 5, 154],
        yellow: [38, 5, 226],
        blue: [38, 5, 57],
        purple: [38, 5, 128],
        cyan: [38, 5, 87],
        pink: [38, 5, 198],
        orange: [38, 5, 202]
    },
    standard: {
        red: [38, 5, 9],
        green: [38, 5, 10],
        yellow: [38, 5, 11],
        blue: [38, 5, 27],
        purple: [38, 5, 105],
        cyan: [38, 5, 123],
        pink: [38, 5, 200],
        orange: [38, 5, 214]
    },
    beach: {
        red: '#fe4a49',
        green: '#2ab7ca',
        yellow: '#fed766',
        blue: '#92C4EE',
        pink: '#de5285',
        purple: '#8277f9',
        cyan: '#00FFFF',
        orange: '#F77E02'
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
        bordeux: '#420c30'
    },
};

const decoratorMap: DecoratorMap = {
    bold: '*',
    underline: '!',
    dim: '~',
    hidden: '#',
    invert: '@',
    blink: '^',
    italic: '%',
    strikeout: '$'
};

const symbolsFunctions: Decorators = {
    bold: (color) => color.replace('m', ';1m'),
    dim: (color) => color.replace('m', ';2m'),
    italic: (color) => color.replace('m', ';3m'),
    underline: (color) => color.replace('m', ';4m'),
    blink: (color) => color.replace('m', ';5m'),
    invert: (color) => color.replace('m', ';7m'),
    hidden: (color) => color.replace('m', ';8m'),
    strikeout: (color) => color.replace('m', ';9m')
};

const decoratorFunctions: Decorators = {
    bold: (txt, ...args) => getValue(txt, ...args).replace('m', ';1m'),
    dim: (txt, ...args) => `\x1b[;2m${getValue(txt, ...args)}${RESET}`,
    italic: (txt, ...args) => getValue(txt, ...args).replace('m', ';3m'),
    underline: (txt, ...args) => getValue(txt, ...args).replace('m', ';4m'),
    blink: (txt, ...args) => getValue(txt, ...args).replace('m', ';5m'),
    invert: (txt, ...args) => getValue(txt, ...args).replace('m', ';7m'),
    hidden: (txt, ...args) => getValue(txt, ...args).replace('m', ';8m'),
    strikeout: (txt, ...args) => getValue(txt, ...args).replace('m', ';9m')
};

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }
        : null;
}

function rgbToAnsi(r: number, g: number, b: number, txt?: string) {
    return `\x1b[38;2;${r};${g};${b}m${txt || ''}${txt ? RESET : ''}`;
}

function getValue(txt: string | string[], ...args: string[]): string {
    const sanitizedArgs = args.filter((a) => a && a !== undefined);
    if (Array.isArray(txt) && sanitizedArgs.length > 0) {
        return txt.map((t, i) => t + (sanitizedArgs[i] || '')).join('');
    } else if (Array.isArray(txt)) {
        return txt.join('');
    } else {
        return txt;
    }
}

function makeColors(codes: Colors) {
    return Object.keys(codes).reduce((acc: any, code) => {
        let value = codes[String(code)];
        if (Array.isArray(value)) value = value.join(';');
        if (typeof value === 'string' && value.toString().includes('#')) {
            const { r, g, b } = hexToRgb(value);
            value = rgbToAnsi(r, g, b);
            acc[code] = value;
            return acc;
        }
        if (typeof value === 'object') {
            acc[code] = makeColors(value as Colors);
            return acc;
        }
        acc[code] = `\x1b[${value}m`;
        return acc;
    }, {});
}

function applySymbols(symbols: DecoratorMap, value: string, formattedColor: string) {
    const keys = Object.keys(symbols);
    return keys.reduce((acc: any, key: keyof DecoratorMap) => {
        const symbol = symbols[key];
        const regexString = `\\${symbol}(.*)\\` + symbol;

        const regex = new RegExp(regexString, 'gsm');
        if (acc.match(regex)) {
            const [subject, stripped] = regex.exec(acc);
            const replaced = symbolsFunctions[key](formattedColor + stripped + RESET + formattedColor);
            acc = acc.replace(subject, replaced);
        }

        return acc;
    }, value)
}

function makeFunctions(colors: Colors, symbols: DecoratorMap) {
    return Object.keys(colors).reduce((acc: any, color) => {
        if (typeof colors[color] === 'object') {
            acc[color] = makeFunctions(colors[color] as Colors, symbols);
            return acc;
        }
        acc[color] = function (txt: string, ...args: string[]) {
            const value = getValue(txt, ...args);
            const formattedColor = colors[color] as string;

            const formattedValue = applySymbols(symbols, value, formattedColor);

            return `${formattedColor}${formattedValue}${RESET}`;
        };
        return acc;
    }, {});
}

function style(config?: Config) {
    const { colors, theme, decorators } = config || { decorators: decoratorMap, colors: colorMap, theme: 'default' };

    const colorz = { ...colorMap, ...colors };
    const symbolz = { ...decoratorMap, ...decorators };

    const colorCodes = makeColors(colorz);
    const themedColors = theme ? Object.assign(colorCodes, colorCodes[theme]) : colorCodes;
    if (!themedColors) throw new Error(`no such theme ${theme}`);
    const functions = makeFunctions(themedColors, symbolz);
    return {
        colors: themedColors,
        symbols: symbolz,
        ...functions,
        ...decoratorFunctions,
        rgb: (r: number, g: number, b: number) =>
            (txt: string, ...args: string[]) => {
                const value = getValue(txt, ...args);
                return rgbToAnsi(r, g, b, value);
            },
        hex: (hex: string) =>
            (txt: string, ...args: string[]) => {
                const value = getValue(txt, ...args);
                const { r, g, b } = hexToRgb(hex);
                return rgbToAnsi(r, g, b, value);
            },
        ansi: (ansi: string) =>
            (txt: string, ...args: string[]) => {
                const value = getValue(txt, ...args);
                return `${ansi}${value}${RESET}`;
            }
    };
}

export default style;
