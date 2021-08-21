const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

const getRandomPanel = () => {
    const panels = [
        red,
        green,
        yellow,
        blue
    ]
    return panels[parseInt(Math.random() * panels.length)];
};

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];
const flash = panel => {
    return new Promise(resolve => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);

        }, 1000);
    });
};
let canClick = false;
const panelClicked = panelClicked => {
    if (!canClick) return;

    const expectedPanel = sequenceToGuess.shift();
    if (expectedPanel === panelClicked) {
        if (sequenceToGuess.length === 0) {
            sequence.push(getRandomPanel());
            sequenceToGuess = [...sequence];
            startFlashing();
        }
    } else {
        alert('GAME OVER');
        alert('Please Refresh to restart');
    }
};

const startFlashing = async () => {
    canClick = false;
    for (let i = 0; i < sequence.length; i++) {
        await flash(sequence[i]);
    }
    canClick = true;
};
startFlashing();