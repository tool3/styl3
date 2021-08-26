export type ColorMap = Record<string, number>;
export type Options = {
    theme?: string;
}

export default function ztyle(colorMap?: ColorMap, options?: Options): Record<string, any>;