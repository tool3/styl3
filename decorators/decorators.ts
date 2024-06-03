import { getValue, replaceColor } from '../utils/utils';
import { DecoratorFunctions, DecoratorMap, SymbolMap, SymbolResetMap } from './types';

const decoratorMap: DecoratorMap = {
    bold: '*',
    dim: '~',
    italic: '%',
    underline: '!',
    blink: '^',
    invert: '@',
    hidden: '#',
    strikeout: '$'
};

export const symbolMap: SymbolMap = {
    bold: 1,
    dim: 2,
    italic: 3,
    underline: 4,
    blink: 5,
    invert: 7,
    hidden: 8,
    strikeout: 9
};

export const symbolResets: SymbolResetMap = {
    bold: 22,
    dim: 22,
    italic: 23,
    underline: 24,
    blink: 25,
    invert: 27,
    hidden: 28,
    strikeout: 29
};


const symbolsFunctions: DecoratorFunctions = {
    bold: (color: string) => replaceColor('bold', color),
    dim: (color: string) => replaceColor('dim', color),
    italic: (color: string) => replaceColor('italic', color),
    underline: (color: string) => replaceColor('underline', color),
    blink: (color: string) => replaceColor('blink', color),
    invert: (color: string) => replaceColor('invert', color),
    hidden: (color: string) => replaceColor('hidden', color),
    strikeout: (color: string) => replaceColor('strikeout', color),
};

const decoratorFunctions: DecoratorFunctions = {
    bold: (txt: TemplateStringsArray, ...args: string[]) => symbolsFunctions.bold(getValue(txt, ...args)),
    dim: (txt: TemplateStringsArray, ...args: string[]) => symbolsFunctions.dim(getValue(txt, ...args)),
    italic: (txt: TemplateStringsArray, ...args: string[]) => symbolsFunctions.italic(getValue(txt, ...args)),
    underline: (txt: TemplateStringsArray, ...args: string[]) => symbolsFunctions.underline(getValue(txt, ...args)),
    blink: (txt: TemplateStringsArray, ...args: string[]) => symbolsFunctions.blink(getValue(txt, ...args)),
    invert: (txt: TemplateStringsArray, ...args: string[]) => symbolsFunctions.invert(getValue(txt, ...args)),
    hidden: (txt: TemplateStringsArray, ...args: string[]) => symbolsFunctions.hidden(getValue(txt, ...args)),
    strikeout: (txt: TemplateStringsArray, ...args: string[]) => symbolsFunctions.strikeout(getValue(txt, ...args))
};

export { decoratorFunctions, decoratorMap, symbolsFunctions };
