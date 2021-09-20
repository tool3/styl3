declare type StyleConfiguration = {
    theme?: 'pastel' | 'lush' | 'standard' | 'default' | 'beach' | string;
    decorators?: Record<string, string>;
    colors?: Record<string, number | number[]>;
};

declare function style(config: StyleConfiguration): Record<string, any>;

export = style; 