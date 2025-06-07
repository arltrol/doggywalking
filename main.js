const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#aaddaa',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cpu;
let cursors;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player_full_team.png');
    this.load.image('cpu', 'assets/player_full_team.png'); // same for now
}

function create() {
    this.add.image(400, 300, 'background').setScale(1);

    // Player setup
    player = this.physics.add.sprite(200, 500, 'player');
    player.setScale(0.3);
    player.setCollideWorldBounds(true);

    // CPU setup — anchor to bottom center for proper reset
    cpu = this.physics.add.sprite(600, 700, 'cpu'); // start a bit lower
    cpu.setScale(0.3);
    cpu.setCollideWorldBounds(false);
    cpu.setOrigin(0.5, 1);  // Bottom center

    // Input
    cursors = this.input.keyboard.createCursorKeys();

    // Title
    this.add.text(20, 20, 'Lea The Best', {
        fontSize: '28px',
        fill: '#222',
        fontFamily: 'Arial'
    });
}

function update() {
    player.setVelocity(0);
    if (cursors.left.isDown) {
        player.setVelocityX(-150);
    } else if (cursors.right.isDown) {
        player.setVelocityX(150);
    }
    if (cursors.up.isDown) {
        player.setVelocityY(-150);
    } else if (cursors.down.isDown) {
        player.setVelocityY(150);
    }

    cpu.setVelocity(0, -100);

    // Reset based on true position with origin taken into account
    if (cpu.y < -100) {
        cpu.y = 700;
    }
}
