class Renderer {
    static Colours = class {
        static FG = class {
            static BLACK = '\x1b[30m'
            static RED = '\x1b[31m'
            static GREEN = '\x1b[32m'
            static YELLOW = '\x1b[33m'
            static BLUE = '\x1b[34m'
            static MAGENTA = '\x1b[35m'
            static CYAN = '\x1b[36m'
            static WHITE = '\x1b[37m'

            static rgb = (r, g, b) => `\x1b[38;2;${r};${g};${b}m`
        }

        static BG = class {
            static BLACK = '\x1b[40m'
            static RED = '\x1b[41m'
            static GREEN = '\x1b[42m'
            static YELLOW = '\x1b[43m'
            static BLUE = '\x1b[44m'
            static MAGENTA = '\x1b[45m'
            static CYAN = '\x1b[46m'
            static WHITE = '\x1b[47m'

            static rgb = (r, g, b) => `\x1b[48;2;${r};${g};${b}m`
        }

        static RESET = '\x1b[0m'

        static BOLD = '\x1b[1m'
        static ITALIC = '\x1b[3m'
        static UNDERLINE = '\x1b[4m'

        static BLINK = '\x1b[5m'
        static REVERSE = '\x1b[7m'

        static HIDDEN = '\x1b[8m'

        static CLEAR = '\x1b[H\x1b[2J\x1b[3J'

        static SET_CURSOR = (x, y) => `\x1b[${y};${x}H`
        static MOVE_CURSOR = (x, y) => `\x1b[${y};${x}f`
    }

    static clear() { process.stdout.write(Renderer.Colours.CLEAR) }
    static logo() { 
        const W = Renderer.Colours.FG.WHITE;
        const B = Renderer.Colours.FG.BLACK;
        const LG = Renderer.Colours.FG.rgb(153, 229, 80);
        const DG = Renderer.Colours.FG.rgb(75, 105, 47);

        const LOGO = `
00000WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW0
0000WWBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBWW
0000WBGggggggGBBBGggggggGBBGgggggggggggggggGBBGggggggGBBBGggggggGBBBBggggggggggggggggBBW
0000WBggggggggBBBggggggggBBgggggggggggggggggBBggggggggBBBggggggggBBBggggggggggggggggggBW
0000WBggggggggBBBggggggggBGgggggggggggggggggBBggggggggBBBggggggggBBBggggggggggggggggggBW
0000WBggggggggBBBggggggggBggggggggBBBgggggggBBggggggggBBBggggggggBBBggggggggBBBgggggggBW
0000WBggggggggBBBggggggggBggggggggBBBgggggggBBggggggggBBBggggggggBBBggggggggBBBgggggggBW
0000WBggggggggBBBggggggggBggggggggBBBgggggggBBggggggggBBBggggggggBBBggggggggBBBBBBBBBBBW
0000WBggggggggBBBggggggggBggggggggBBBgggggggBBggggggggBBBggggggggBBBggggggggBBBBBBBBBBBW
0000WBgggggggggggggggggggBggggggggggggggggggBBggggggggBBBggggggggBBBgggggggggggggggggGBW
0000WBgggggggggggggggggggBggggggggggggggggggBBggggggggBBBggggggggBBBggggggggggggggggggBW
0000WBgggggggggggggggggggBggggggggggggggggggBBggggggggBBBggggggggBBBGgggggggggggggggggBW
0000WBggggggggGGGggggggggBggggggggGGGgggggggBBggggggggBBBggggggggBBBBGGGGGGGGGGgggggggBW
000WWBggggggggBBBggggggggBggggggggBBBgggggggBBggggggggBBBggggggggBBBBBBBBBBBBBBgggggggBW
00WWBgggggggggBBBggggggggBggggggggBBBgggggggBBggggggggggBggggggggggBggggggggBBBgggggggBW
WWWBBgggggggggBBBggggggggBggggggggBBBgggggggBBggggggggggBggggggggggBgggggggggggggggggGBW
WBBBgggggggggGBBBGggggggGBGggggggGBBBGgggggGBBGggggggggGBGggggggggGBGgggggggggggggggGGBW
WBGGGGGGGGGGGGBBBGGGGGGGGBGGGGGGGGBBBGGGGGGGBBGGGGGGGGGGBGGGGGGGGGGBBGGGGGGGGGGGGGGGGBBW
WBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBWW
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW0
        `.trim();

        const terminalWidth = process.stdout.columns;
        const logoWidth = LOGO.split('\n')[0].length * 2; // each char is 2 pixels
        const x = Math.floor((terminalWidth - logoWidth) / 2);
        
        let centered;
        if (x >= 0) centered = LOGO.split('\n').map(line => ' '.repeat(x) + line).join('\n');
        else centered = LOGO.split('\n').map(line => line.slice(0, -x-2)).join('\n');

        process.stdout.write(centered.replaceAll('0', '  ').replaceAll('W', W + '██').replaceAll('B', B + '██').replaceAll('g', LG + '██').replaceAll('G', DG + '██'));
    }
}

module.exports = Renderer