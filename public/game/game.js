var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//var data = require("../../routes/apiRoutes")
//var db = require("../../models/");
var Score = [];
var player;
var coins;
var diamonds;
var bombs;
var cannonBalls;
var platforms;
var cursors;
var score = 0;
var finalScore = 0;
// var highScore = db.Todo.get({
//     where: {
//         id: 0,
//     }
// }).then(function (dbScore) {
//     res.json(dbScore);
// });
var gameOver = false;
var scoreText;
// var highScoreText;
// highScoreText = highScoreText.setText("High Score: " + highScore);

var game = new Phaser.Game(config);

function preload() {
    this.load.image("sky", "../assets/sky.png");
    this.load.image("ground", "../assets/platform.png");
    this.load.image("star", "../assets/star.png");
    this.load.image("diamond", "../assets/diamond.png");
    this.load.image('bomb', '../assets/bomb.png');
    this.load.image("cannonBall", "../assets/cannon_ball.png");
    this.load.spritesheet("dude", "../assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48
    });
    this.load.spritesheet("captain", "../assets/captain-m-001-light.png", {
        frameWidth: 49,
        frameHeight: 64
    });
}

function create() {
    //  A simple background for our game
    this.add.image(400, 300, "sky");

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms
        .create(400, 568, "ground")
        .setScale(2)
        .refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    // The player and its settings
    player = this.physics.add.sprite(100, 450, "captain");

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("captain", { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "turn",
        frames: [{ key: "captain", frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("captain", { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    diamonds = this.physics.add.group({
        key: "diamond",
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    diamonds.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();
    cannonBalls = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, "score: 0", {
        fontSize: "32px",
        fill: "#000"
    });

    //  Display the highest score
    highScoreText = this.add.text(16, 16, "High Score: " + highScore, {
        fontSize: "32px",
        fill: "#000"
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(diamonds, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(cannonBalls, platforms);

    //  Checks to see if the player overlaps with any of the diamonds, if he does call the collectDiamond function
    this.physics.add.overlap(player, diamonds, collectDiamond, null, this);
    //  Checks to see if the player overlaps with any of the bombs, if he does call the hitBomb function
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    //  Checks to see if the player overlaps with any of the cannon balls, if he does call the hitBomb function
    this.physics.add.collider(player, cannonBalls, hitBomb, null, this);
}

function update() {
    if (gameOver) {
        // saves the date/time of when the game ends in seconds
        // var timeStamp = Math.floor(Date.now()) / 1000;
        // // gets the userName from the player
        // var userName = window.prompt("Enter your name:");
        // //
        // finalScore = score;
        // app.post("/api/burgers", function (req, res) {
        // db.Score.create({
        //   userName: userName,
        //   score: finalScore,
        //   date: timeStamp
        // });
        //       .then(function(dbScore) {
        //         // We have access to the new score as an argument inside of the callback function
        //         res.json(dbTodo);
        //       })
        //         .catch(function(err) {
        //         // Whenever a validation or flag fails, an error is thrown
        //         // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        //           res.json(err);
        // });
        window.confirm("Would you like to play again?");
        // add call to start function again
        if (confirm("Press a button!")) {
            this.game.state.restart();
        } else {
            return;
        }
        //
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play("left", true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play("right", true);
    } else {
        player.setVelocityX(0);

        player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectDiamond(player, diamonds) {
    diamonds.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText("Score: " + score);

    if (diamonds.countActive(true) === 0) {
        //  A new batch of stars to collect
        diamonds.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);


        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
