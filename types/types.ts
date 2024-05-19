type Color = string | number | number[];
type TemplateStringFunction = (txt?: string | TemplateStringsArray, ...args: string[]) => string;

type Theme = Partial<Colors> & { [key: string]: Color; };
type DefaultThemes = {
    pastel: Theme;
    standard: Theme;
    beach: Theme;
    sunset: Theme;
    neon: Theme;
    lush: Theme;
    nature: Theme;

};

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


export type Colors = {
    red: Color;
    green: Color;
    blue: Color;
    yellow: Color;
    purple: Color;
    pink: Color;
    orange: Color;
    marine: Color;
    [key: string]: Color | Theme;
}

export type DecoratorFunctions = { [key in keyof DecoratorMap]?: TemplateStringFunction };
export type ColorFunctions = { [key in keyof Colors]: TemplateStringFunction };
export type ThemeFunctions = { [key in keyof DefaultThemes]: ColorFunctions };

export type ColorUtils = {
    rgb(r: number, g: number, b: number): TemplateStringFunction;
    hex(hex: string): TemplateStringFunction;
    ansi(ansi: string): TemplateStringFunction;
}

export type Config = {
    colors?: Partial<Colors>;
    theme?: string;
    decorators?: Partial<DecoratorMap>
}

export type Style =
    Colors &
    ColorUtils &
    ColorFunctions &
    ThemeFunctions & 
    DecoratorFunctions