import { Color, ColorFunctions, ExportedColors } from '../colors/types';
import { TemplateStringFunction } from '../types/types';

export type CustomTheme<C = Record<string, Color>> = { [key in keyof C]: Color };

export type ThemeWithColors<T extends string, C> = {
    default: Partial<ExportedColors<T, C>>;
    pastel: Partial<ExportedColors<T, C>>;
    standard: Partial<ExportedColors<T, C>>;
    beach: Partial<ExportedColors<T, C>>;
    sunset: Partial<ExportedColors<T, C>>;
    neon: Partial<ExportedColors<T, C>>;
    lush: Partial<ExportedColors<T, C>>;
    nature: Partial<ExportedColors<T, C>>;
} & { [key in T]: CustomTheme<C> };


export type ThemeFunctions<T extends string, C> = {
    [key in keyof ThemeWithColors<T, C>]: ColorFunctions<T, C>;
}