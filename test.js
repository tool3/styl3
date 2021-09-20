const style = require('styl3');
// use decorators for bold, underline etc...
const s = style({theme: 'pastel', decorators: { bold: '_' }});
s.red`this is the new _BOLD_ @RED@`
// double decoratros
s.cyan`this is !*important*!`
s.green`viva la %italia%`
s.pink`address: ~you@somewhere.earth~`
  