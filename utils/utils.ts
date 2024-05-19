export function getValue(txt: TemplateStringsArray, ...args: string[]): string {
    const sanitizedArgs = args.filter((a) => a && a !== undefined);
    if (Array.isArray(txt) && sanitizedArgs.length > 0) {
        return txt.map((t, i) => t + (sanitizedArgs[i] || '')).join('');
    } else if (Array.isArray(txt)) {
        return txt.join('');
    }
}