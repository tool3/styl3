import { CustomTheme } from '../themes/types';
import { TemplateStringFunction } from '../types/types';

export type Color = string | number | number[];

export type Colors = {
    reset: Color;
    red: Color;
    green: Color;
    blue: Color;
    yellow: Color;
    cyan: Color;
    purple: Color;
    pink: Color;
    orange: Color;
    marine: Color;
    white: Color;
    black: Color;
} & { [key: string]: Color | CustomTheme };

export type ExportedColors<T extends string, C> = Colors & { [key in T]: Color | CustomTheme<C> }

export type ColorFunctions<T extends string, C> = {
    [key in keyof ExportedColors<T, C>]: TemplateStringFunction;
};

export type ColorUtils = {
    rgb(r: number, g: number, b: number): TemplateStringFunction;
    hex(hex: string): TemplateStringFunction;
    ansi(ansi: string): TemplateStringFunction;
}