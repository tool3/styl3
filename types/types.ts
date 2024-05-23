import { ColorFunctions, ColorUtils, ExportedColors } from '../colors/types';
import { DecoratorFunctions, DecoratorMap } from '../decorators/types';
import { ThemeFunctions, ThemeWithColors } from '../themes/types';
import type style from '../style';

export type TemplateStringFunction = (txt?: string | TemplateStringsArray, ...args: string[]) => string;

export type Config<T extends string, C> = {
    colors?: Partial<ExportedColors<T, C>>;
    theme?: keyof ThemeWithColors<T, C>;
    decorators?: Partial<DecoratorMap>;
}

export type Style<T extends string, C> = ColorUtils & ThemeWithColors<T, C> & ColorFunctions<T, C> & ThemeFunctions<T, C> & DecoratorFunctions;
export default style;