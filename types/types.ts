import { ColorFunctions, ColorUtils, Colors, ExportedColors } from '../colors/types';
import { DecoratorFunctions, DecoratorMap } from '../decorators/types';
import { ThemeColorFunctions, ThemeFunctions, ThemeWithColors, ThemeWithCustomColorsFunctions, ThemeWithCustomColors } from '../themes/types';
import type style from '../style';

export type TemplateStringFunction = (txt?: string | TemplateStringsArray, ...args: string[]) => string;

export type Config<T extends string, C> = {
    colors?: Partial<ExportedColors<T, C>>;
    theme?: keyof ThemeWithColors<T, C>;
    decorators?: Partial<DecoratorMap>;
    write?: boolean
}

export type Style<T extends string, C> = ColorUtils & Colors & ThemeWithColors<T, C> & ColorFunctions<T, C> & ThemeFunctions<T, C> &  ThemeWithCustomColors<C> & ThemeWithCustomColorsFunctions<T, C> & ThemeColorFunctions & DecoratorFunctions;
export default style;