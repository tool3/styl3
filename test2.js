const style = require('./');
const s = style();
// use as tag functions
console.log(s.red`this will be red`)
// use decorators for bold, underline etc...
console.log(s.pastel.green`this will be pastel green and *bold*`)

const ss = style({theme: 'pastel'});
// now the usual ss.green points to the pastel green
// allowing to change theme for the entire cli with one string
console.log(ss.green`this will be pastel green`)

// supports custom hex
console.log(ss.hex('#de5285')`this will be a slick pink`)
// and rgb
console.log(ss.rgb(15, 106, 251)`this will be a rich blue`)