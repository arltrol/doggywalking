
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#aaddaa',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
}

function create() {
    this.add.image(400, 300, 'background').setScale(0.5);
}

function update() {
    // Game logic here
}
