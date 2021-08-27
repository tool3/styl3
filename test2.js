const style = require('./');
const shellfie = require('shellfie');
const s = style();
const data = [];

(async function() {


    // use as tag functions
    data.push(s.red`this will be red`)
    // access a theme specifically
    data.push(s.pastel.green`this will be a pastel green`)
    
    const ss = style({theme: 'pastel'});
    // now `ss.green` points to the pastel green
    // allowing to change theme for the entire cli with one string
    data.push(ss.green`also be a pastel green`)
    
    // supports custom hex
    data.push(ss.hex('#de5285')`this will be a slick pink`)
    // and rgb
    data.push(ss.rgb(15, 106, 251)`this will be a rich blue`)
    
    await shellfie(data, {
        viewport: { width: 300, height: 300 },
        name: 'themes',
      });
})()