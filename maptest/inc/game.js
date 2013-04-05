var score = 0;
var lives = 3;
var canvasElem = document.getElementById("game");
$("#lives").html(lives);

var world = boxbox.createWorld(canvasElem);

var player = {
    name: "player",
    shape: "circle",
    radius: 0.7,
    image: "images/game/player.png",
    imageStretchToFit: true,
    density: 4,
    restitution: 0.5,
    x: 20,
    onKeyDown: function(e) {
      if (e.keyCode == 88) {
        this.applyImpulse(200, 60);
      } else if (e.keyCode == 90) {
        this.applyImpulse(-200, 60);
      } else if (e.keyCode == 83) {
        this.applyImpulse(200, 90);
      } else if (e.keyCode == 82) {
        this.applyImpulse(-200, 90);
      } 
      $("#status").html(this.position.x);
    },
    onImpact: function(entity, force) {
      console.log(entity.name());
      if (entity.name() === "block" && entity.color != 'blue') {
          score +=100;
          document.getElementById("score").innerHTML = score;
      }
      if (entity.name() === "belowground") {
        // die - lose a life
          lives -=1;
          $("#lives").html(lives);
          world.createEntity(player);  
      }
    }
}

world.createEntity(player);
 
world.createEntity({
  name: "ground",
  shape: "square",
  type: "static",
  color: "rgb(0,100,0)",
  width: 20,
  height: .5,
  x: 14,
  y: 16
});

world.createEntity({
  name: "belowground",
  shape: "square",
  type: "static",
  color: "rgb(0,100,0)",
  width: 25,
  height: .5,
  x: 0,
  y: 25
});

world.createEntity({
  name: "topborder",
  shape: "square",
  type: "static",
  color: "rgb(0,0,0)",
  width: 960,
  height: .5,
  x: 0,
  y: 0
});

world.createEntity({
  name: "leftborder",
  shape: "square",
  type: "static",
  color: "rgb(0,0,0)",
  width: .5,
  height: 500,
  x: 0,
  y: 0
});

world.createEntity({
  name: "rightborder",
  shape: "square",
  type: "static",
  color: "rgb(0,0,0)",
  width: .5,
  height: 500,
  x: 950,
  y: 0
});
 
var block = {
  name: "block",
  shape: "square",
  color: "brown",
  width: .8,
  height: 4,
  onImpact: function(entity, force) {
    if (entity.name() === "player") {
      this.color("blue");
      console.log("Item: "+entity+" " + entity.y);
      }
     if (entity.name() === "belowground") {
      score +=200;
      }
    }
};

var solidblock = {
  name: "solidblock",
  shape: "square",
  type: "static",
  color: "red",
  width: .8,
  height: 4,
};

 
world.createEntity(block, {
  x: 14
});
 
world.createEntity(block, {
  x: 16
});

world.createEntity(block, {
  x: 18
});
 
world.createEntity(block, {
  x: 16,
  y: 1,
  width: 4,
  height: .5
});

world.createEntity(block, {
  x: 20,
  y: 1,
  width: 4,
  height: .5
});
