const shellfie = require('shellfie');
const style = require('./dist/index.js')
const themes = require('./dist/themes/themes.js').default;

function createPhrases(styles, colors) {
    const maxLabelLength = colors.reduce((acc, key) => Math.max(acc, key.length), 0);
    return Object.keys(styles).reduce((acc, key) => {
        if (colors.includes(key)) {
            const space = ' '.repeat((maxLabelLength - key.length) + 2);
            acc.push(styles[key]`${key.toUpperCase() + space}██████████`);
        }
        return acc;
    }, []);
}

(async () => {
    for (const theme in themes) {
        const colors = Object.keys(themes[theme]);
        const custom = style({ theme });
        const data = createPhrases(custom, colors);
        console.log(data.join('\n'));
        await shellfie(data.join('\n'), { name: theme, location: `shellfies/themes/`, viewport: { width: 250, height: 300 } })
    }
})()
