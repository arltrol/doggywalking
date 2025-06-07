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
let playerDogs = [];
let cpuDogs = [];

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player_full_team.png');
    this.load.image('cpu', 'assets/player_full_team.png');
    this.load.image('dog1', 'assets/dog1.png');
    this.load.image('dog2', 'assets/dog2.png');
    this.load.image('dog3', 'assets/dog3.png');
}

function create() {
    this.add.image(400, 300, 'background').setScale(1);

    player = this.physics.add.sprite(200, 500, 'player').setScale(0.3).setCollideWorldBounds(true);
    cpu = this.physics.add.sprite(600, 700, 'cpu').setScale(0.3).setOrigin(0.5, 1);

    cursors = this.input.keyboard.createCursorKeys();

    // Add player dogs (scaled down, centered bottom)
    playerDogs.push(this.physics.add.sprite(200, 550, 'dog1').setScale(0.15).setOrigin(0.5, 1));
    playerDogs.push(this.physics.add.sprite(200, 600, 'dog2').setScale(0.15).setOrigin(0.5, 1));
    playerDogs.push(this.physics.add.sprite(200, 650, 'dog3').setScale(0.15).setOrigin(0.5, 1));

    // Add CPU dogs
    cpuDogs.push(this.physics.add.sprite(600, 750, 'dog1').setScale(0.15).setOrigin(0.5, 1));
    cpuDogs.push(this.physics.add.sprite(600, 800, 'dog2').setScale(0.15).setOrigin(0.5, 1));
    cpuDogs.push(this.physics.add.sprite(600, 850, 'dog3').setScale(0.15).setOrigin(0.5, 1));

    this.add.text(20, 20, 'Lea The Best', {
        fontSize: '28px',
        fill: '#222',
        fontFamily: 'Arial'
    });
}

function update() {
    // Player movement
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

    // CPU movement
    cpu.setVelocity(0, -100);
    if (cpu.y < -100) cpu.y = 700;

    // Dog trailing effect (with delay)
    followChain(this, player, playerDogs, 60);
    followChain(this, cpu, cpuDogs, 60);
}

function followChain(scene, leader, followers, spacing) {
    let target = leader;
    for (let i = 0; i < followers.length; i++) {
        scene.physics.moveToObject(followers[i], target, 100);
        const dist = Phaser.Math.Distance.Between(
            followers[i].x, followers[i].y,
            target.x, target.y
        );
        if (dist < spacing) {
            followers[i].body.reset(target.x, target.y);
        }
        target = followers[i];
    }
}
