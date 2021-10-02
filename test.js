const style = require('./');
const shellfie = require('shellfie');
const s = style({ theme: 'pastel' });

const data = [];
(async () => {
    // use decorators for bold, underline etc...
    data.push(s.red`lush red *BOLD* @INVERTED@`);
    // double decoratros
    data.push(s.cyan`this is !*bolderlined!*! get it? bold and underlined...😏`);
    data.push(s.green`viva la %italic%`);
    data.push(s.pink`address: ~you@somewhere.earth~`);
    await shellfie(data, { name: 'test', viewport: {width: 300, height: 300}});
})()