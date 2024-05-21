import colorMap, { RESET } from './colors/colors';
import { Colors } from './colors/types';
import { decoratorFunctions, decoratorMap, symbolsFunctions } from './decorators/decorators';
import { DecoratorMap } from './decorators/types';
import { Config, Style } from './types/types';
import { getValue } from './utils/utils';

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

function makeColors(codes: Colors): Colors {
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
        acc[color] = function (text: string | TemplateStringsArray, ...args: string[]) {
            const formattedColor = colors[color] as string;
            const value = typeof text === "string" ? text : getValue(text, ...args);
            const formattedValue = applySymbols(symbols, value, formattedColor);

            return `${formattedColor}${formattedValue}${RESET}`;
        };
        return acc;
    }, {});
}


function rgb(r: number, g: number, b: number) {
    return function (text?: string | TemplateStringsArray, ...args: string[]): string {
        if (typeof text === "string") {
            return rgbToAnsi(r, g, b, text);
        } else {
            const value = getValue(text, ...args);
            return rgbToAnsi(r, g, b, value);
        }
    }
}

function hex(hex: string) {
    return function (text?: string | TemplateStringsArray, ...args: string[]): string {
        const { r, g, b } = hexToRgb(hex);
        if (typeof text === "string") {
            return rgbToAnsi(r, g, b, text);
        } else {
            const value = getValue(text, ...args);
            return rgbToAnsi(r, g, b, value);
        }
    }
}

function ansi(ansi: string) {
    return function (text?: string | TemplateStringsArray, ...args: string[]): string {
        if (typeof text === "string") {
            return `${ansi}${text}${RESET}`;
        } else {
            const value = getValue(text, ...args);
            return `${ansi}${value}${RESET}`;
        }
    }
}

function style<T extends string, C>(config?: Config<T, C>) {
    const { colors, theme, decorators } = config || { decorators: decoratorMap, colors: colorMap, theme: 'default' };

    const allColors = { ...colorMap, ...colors };
    const allSymbols = { ...decoratorMap, ...decorators };

    const colorCodes = makeColors(allColors);
    const themedColors = theme ? { ...colorCodes, ...(colorCodes[theme] as Colors) } : colorCodes;
    if (!themedColors) throw new Error(`no such theme ${theme}`);
    const functions = makeFunctions(themedColors, allSymbols);
    const styled: Style<T, C> = {
        colors: themedColors,
        symbols: allSymbols,
        ...functions,
        ...decoratorFunctions,
        rgb,
        hex,
        ansi
    };

    return styled;
}

export default style;
