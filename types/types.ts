export type DecoratorMap = {
    bold?: string;
    underline?: string;
    dim?: string;
    hidden?: string;
    invert?: string;
    blink?: string;
    italic?: string;
    strikeout?: string;
}

export type Decorators = {
    [key in keyof DecoratorMap]?: (color: string) => string;
}

type Color = string | number | number[];

export type Theme = {
    [key: string]: Color;
}

export type Colors = {
    red?: Color;
    green?: Color;
    blue?: Color;
    yellow?: Color;
    purple?: Color;
    pink?: Color;
    orange?: Color;
    marine?: Color;
    [key: string]: Color | Theme;
}

export type Config = {
    colors?: Colors | Theme;
    theme?: string;
    decorators?: DecoratorMap
}