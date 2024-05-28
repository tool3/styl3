import { symbolMap, symbolResets } from '../decorators/decorators';
import { SymbolMap } from '../decorators/types';

export function getValue(txt: TemplateStringsArray, ...args: string[]): string {
    const sanitizedArgs = args.filter((a) => a && a !== undefined);
    if (Array.isArray(txt) && sanitizedArgs.length > 0) {
        return txt.map((t, i) => t + (sanitizedArgs[i] || '')).join('');
    } else if (Array.isArray(txt)) {
        return txt.join('');
    }
}

export function replaceLast(subject: string, search: string, replace: string): string {
    const index = subject.lastIndexOf(search);
    if (index === -1) {
        return subject;
    }
    return subject.substring(0, index) + replace + subject.substring(index + search.length);
}

export function replaceColor(key: keyof SymbolMap, color: string): string {
    const [code] = [...color.match(/\[[0-9;]+/gsm)]
    const replaced = color.replace('m', `;${symbolMap[key]}m`)
    const value = replaceLast(replaced, code, `${code};${symbolResets[key]}`);
    return value;
}