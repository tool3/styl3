import themes from '../themes/themes';
import { Colors } from '../colors/types';


const colors = {
    reset: 0,
    red: [38, 5, 160],
    green: 32,
    yellow: [38, 5, 227],
    blue: 34,
    purple: 35,
    cyan: 96,
    pink: [38, 5, 219],
    orange: [38, 5, 215],
    marine: 94,
    white: 97,
    black: 30,
    ...themes
};

export const RESET = '\x1b[0m';
export default colors;