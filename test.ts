import style from './style';

const styled = style({
  // theme: 'rain',
  // colors: {
  //   rain: {
  //     redRain: 'somecolor'
  //   }
  // }
  theme: 'crayons'
});


console.log(styled.neon.purple`@*Never* gonna give you !up!@`)
console.log(styled.pastel.pink`@Never gonna let you %down%@`),
console.log(styled.rainbow.amethyst`@$Never$ gonna run around and desert you@`)
// console.log(styled```@Never gonna ~give~ you !up!@`);
// console.log(styled.purple`@Never gonna let you %down%!@`);
// console.log(styled.pink`@$Never$ *gonna* run around and desert you@`);
// console.log('\x1b[32;9mhello\x1b[32;29m there my old friend');s
