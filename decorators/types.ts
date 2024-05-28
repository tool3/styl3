import { TemplateStringFunction } from '../types/types';

export type DecoratorMap = {
    bold: string;
    underline: string;
    dim: string;
    hidden: string;
    invert: string;
    blink: string;
    italic: string;
    strikeout: string;
}

export type SymbolMap = {
    bold: number;
    underline: number;
    dim: number;
    hidden: number;
    invert: number;
    blink: number;
    italic: number;
    strikeout: number;
}

export type SymbolResetMap = SymbolMap;

export type DecoratorFunctions = {
    [key in keyof DecoratorMap]?: TemplateStringFunction;
};