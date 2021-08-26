export type ColorMap = Record<string, number>;
export type StyleConfiguration = {
    theme?: string;
    colors?: Record<string, number | number[]>;
};

export default function style(config: StyleConfiguration): Record<string, any>;