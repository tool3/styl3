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

export type DecoratorFunctions = {
    [key in keyof DecoratorMap]?: TemplateStringFunction;
};