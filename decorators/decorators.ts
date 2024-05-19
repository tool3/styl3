import { RESET } from '../colors/colors';
import { DecoratorFunctions, DecoratorMap } from '../types/types';
import { getValue } from '../utils/utils';

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

const symbolsFunctions: DecoratorFunctions = {
    bold: (color: string) => color.replace('m', ';1m'),
    dim: (color: string) => color.replace('m', ';2m'),
    italic: (color: string) => color.replace('m', ';3m'),
    underline: (color: string) => color.replace('m', ';4m'),
    blink: (color: string) => color.replace('m', ';5m'),
    invert: (color: string) => color.replace('m', ';7m'),
    hidden: (color: string) => color.replace('m', ';8m'),
    strikeout: (color: string) => color.replace('m', ';9m')
};

const decoratorFunctions: DecoratorFunctions = {
    bold: (txt: TemplateStringsArray, ...args: string[]) => getValue(txt, ...args).replace('m', ';1m'),
    dim: (txt: TemplateStringsArray, ...args: string[]) => `\x1b[;2m${getValue(txt, ...args)}${RESET}`,
    italic: (txt: TemplateStringsArray, ...args: string[]) => getValue(txt, ...args).replace('m', ';3m'),
    underline: (txt: TemplateStringsArray, ...args: string[]) => getValue(txt, ...args).replace('m', ';4m'),
    blink: (txt: TemplateStringsArray, ...args: string[]) => getValue(txt, ...args).replace('m', ';5m'),
    invert: (txt: TemplateStringsArray, ...args: string[]) => getValue(txt, ...args).replace('m', ';7m'),
    hidden: (txt: TemplateStringsArray, ...args: string[]) => getValue(txt, ...args).replace('m', ';8m'),
    strikeout: (txt: TemplateStringsArray, ...args: string[]) => getValue(txt, ...args).replace('m', ';9m')
};

export { decoratorMap, symbolsFunctions, decoratorFunctions }