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
    this.load.image('cpu', 'assets/player_full_team.png');  // temporary CPU sprite
}

function create() {
    // Add background
    this.add.image(400, 300, 'background').setScale(1);

    // Add player (left track)
    player = this.physics.add.sprite(200, 500, 'player');
    player.setScale(0.3);
    player.setCollideWorldBounds(true);

    // Add CPU walker (right track)
    cpu = this.physics.add.sprite(600, 500, 'cpu');
    cpu.setScale(0.3);
    cpu.setCollideWorldBounds(true);

    // Setup keyboard input
    cursors = this.input.keyboard.createCursorKeys();

    // Game title
    this.add.text(20, 20, 'Lea The Best', {
        fontSize: '28px',
        fill: '#222',
        fontFamily: 'Arial'
    });
}

function update() {
    // PLAYER MOVEMENT
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

    // CPU AUTO-MOVE UP
    cpu.setVelocity(0, -100);

    // Reset CPU to bottom if off screen
    if (cpu.y < -50) {
        cpu.y = 650;
    }
}
