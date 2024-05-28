import style from './style';

const styled = style({
  // theme: 'rain',
  colors: {
    rain: {
      redRain: 'somecolor'
    }
  }
});

const output = [
  "*Never* gonna give you !up!",
  `@Never@ gonna let you %down%`,
  `$Never$ gonna run around and desert you`
]
  ;
styled.autumn.chocolate`hello`;

styled.crayons.carrot`caroor`;
// styled.crayons.carrot`rhere`;


// console.log(styled```@Never gonna ~give~ you !up!@`);
// console.log(styled.purple`@Never gonna let you %down%!@`);
// console.log(styled.pink`@$Never$ *gonna* run around and desert you@`);
// console.log('\x1b[32;9mhello\x1b[32;29m there my old friend');
