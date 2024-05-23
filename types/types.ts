import { ColorFunctions, ColorUtils, Colors, ExportedColors } from '../colors/types';
import { DecoratorFunctions, DecoratorMap } from '../decorators/types';
import { ThemeFunctions, ThemeWithColors } from '../themes/types';

export type TemplateStringFunction = (txt?: string | TemplateStringsArray, ...args: string[]) => string;

export type Config<T extends string, C> = {
    colors?: Partial<ExportedColors<T, C>>;
    theme?: keyof ThemeWithColors<T, C>;
    decorators?: Partial<DecoratorMap>
}

export type Style<T extends string, C> =
    // Colors &
    ColorUtils &
    ThemeWithColors<T, C> &

    ColorFunctions<T, C> &
    ThemeFunctions<T, C> &
    DecoratorFunctions
