# styl3
cli color manager

# features
- built-in themes available
- built-in decorators (bold, italic, hidden, underline, strikeout and inverted)
- supports hex, rgb, or ansi color codes
- supports custom colors
- easy and flexible api

# themes
5 unique built-in themes to get you started on easy cli styling    
[![](https://img.shields.io/static/v1?label=created%20with%20shellfie&message=📸&color=pink)](https://github.com/tool3/shellfie)  

<div>
  <img src="./shellfies/default.png" width="300" height="300" />
  <img src="./shellfies/standard.png" width="300" height="300" />
</div>
<div>
  <img src="./shellfies/pastel.png" width="300" height="300" />
  <img src="./shellfies/lush.png" width="300" height="300" />
  <img src="./shellfies/beach.png" width="300" height="300" />
</div>

## usage
```javascript
const style = require('./');
const shellfie = require('shellfie');
const s = style();

(async function () {
  const data = [];
  data.push(s.red`this will be a default red`);
  // access a theme specifically
  data.push(s.pastel.green`this will be a pastel green`);

  const ss = style({ theme: 'pastel' });
  // now `ss.green` points to the pastel green
  // allowing to change theme for the entire cli with one string
  data.push(ss.green`also a pastel green`);

  // supports custom hex
  data.push(ss.hex('#de5285')`this will be a slick pink`);
  // and rgb
  data.push(ss.rgb(15, 106, 251)`this will be a rich blue`);
  await shellfie(data, {
    viewport: { width: 300, height: 300 },
    name: 'themes',
  });
})();
```
<img src="./shellfies/themes.png" width="300" height="300" />

# decorators
decorators are characters used to wrap a word and give it decorating features,
such as bold, italic, underline, strikeout, inverted and italic.

more than one decorator can be applied to a word

## map
```javascript
{
  bold: '*',
  underline: '!',
  dim: '~',
  hidden: '#',
  invert: '@',
  blink: '^',
  italic: '%',
  strikeout: '$'
}
```

## usage
```javascript
const style = require('./');
const shellfie = require('shellfie');
const s = style({theme: 'pastel'});

(async function() {
  const data = [];
  // use decorators for bold, underline etc...
  data.push(s.red`lush *BOLD* @RED@`)
  // double decoratros
  data.push(s.cyan`this is !*important*!`)
  data.push(s.green`viva la %italia%`)
  data.push(s.pink`address: ~you@somewhere.earth~`)
  await shellfie(data, {
      viewport: { width: 300, height: 300 },
      name: 'decoratorz',
    });
})()
```
<img src="./shellfies/decorators.png" width="300" height="300" />