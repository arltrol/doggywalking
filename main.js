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
    this.load.image('cpu', 'assets/sprites_player2_dogs_obstacles.png');
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
