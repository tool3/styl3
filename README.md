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

![](./shellfies/default.png)
![](./shellfies/pastel.png)
![](./shellfies/lush.png)
![](./shellfies/standard.png)
![](./shellfies/beach.png)     

# decorators
decorators are characters used to wrap a word and give it decorating features,
such as bold, italic, underline, strikeout, inverted and italic.

# usage
```javascript
const style = require('styl3');
const s = style();
// use as tag functions
s.red`this will be red`
// use decorators for bold, underline etc...
s.pastel.green`this will be pastel green and *bold*`

const ss = style({theme: 'pastel'});
// now the usual ss.green points to the pastel green
// allowing to change theme for the entire cli with one string
s.green`this will be pastel green`

// supports custom hex
ss.hex('#de5285')`this will be a slick pink`
// and rgb
ss.rgb(38, 5, 57)`this will be a rich blue`

```