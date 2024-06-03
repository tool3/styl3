import { Color, ColorFunctions, ExportedColors } from '../colors/types';
import { TemplateStringFunction } from '../types/types';
import themes from './themes';

export type CustomTheme<C = Record<string, Color>> = { [key in keyof C]: Color };

export type ThemeWithColors<T extends string, C> = {
    [key in keyof typeof themes]: Partial<ExportedColors<T, C>>;
} & { [key in T]: CustomTheme<T> } & { [key in keyof C]: CustomTheme<T> };


export type ThemeFunctions<T extends string, C> = {
    [key in keyof ThemeWithColors<T, C>]: ColorFunctions<T, C>;
}

export type ThemeColorFunctions = {
    [key in keyof typeof themes]: {
        [X in keyof typeof themes[key]]: TemplateStringFunction;
    }
}

export type ThemeWithCustomColorsFunctions<T extends string, C> = {
    [key in T]: {
        [X in keyof C]: TemplateStringFunction;
    }
} & { [key in keyof C]: TemplateStringFunction; }

export type ThemeWithCustomColors<C> = {
    [key in keyof C]: TemplateStringFunction;
}