declare type StyleConfiguration = {
    theme?: string;
    colors?: Record<string, number | number[]>;
};

declare function style(config: StyleConfiguration): Record<string, any>;

export = style; 