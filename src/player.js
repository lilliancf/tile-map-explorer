/** @module Player
  * A class representing the player.
  */
export default class Player {
  /** @constructor
    * Constructs a new player instance
    * @param {float} x - the player's x position
    * @param {float} y - the player's y position
    */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.img = new Image(96, 128);
    this.img.src = "img/p.png";
    this.dir = 'd';
    this.v = .2;
    this.tx = 0;
    this.ty = 0;
    this.moving = false;
    this.frameTimer = 0;
    this.frame = 0;
  }

    /** @method update
    * Updates the player
    * @param {double} deltaT - the elapsed time
    * @param {Input} input - the input object
    */
  update(deltaT, input) {
    if(Math.floor(this.x+0.1)%32 !== 0 || Math.floor(this.y+0.1)%32 !== 0 ) {
      var move = deltaT*this.v;
      switch(this.dir) {
        case 'u':
          if(this.y-move < this.ty) {
            this.y = this.ty;
          }
          else {
            this.y -= move;
          }
          break;
        case 'd':
          if(this.y+move > this.ty) {
            this.y = this.ty;
          }
          else {
            this.y += move;
          }
          break;
        case 'l':
          if(this.x-move < this.tx) {
            this.x = this.tx;
          }
          else {
            this.x -= move;
          }
          break;
        case 'r':
          if(this.x+move > this.tx) {
            this.x = this.tx;
          }
          else {
            this.x += move;
          }
          break;
      }
    }
    else {
      if(input.keyPressed("ArrowLeft")) {
        this.dir = 'l';
        this.tx = Math.floor(this.x+0.1)-32;
        this.ty = Math.floor(this.y+0.1);
        if(global.map.layers[0].data[(this.tx/32)+(this.ty/32)*50]===1&&(!(this.tx<0))) {
          this.x -= deltaT*this.v;
          this.moving = true;
        }
        else {
          this.moving = false;
        }
      }
      else if(input.keyPressed("ArrowRight")) {
        this.dir = 'r';
        this.tx = Math.floor(this.x+0.1)+32;
        this.ty = Math.floor(this.y+0.1);
        if(global.map.layers[0].data[(this.tx/32)+(this.ty/32)*50]===1&&(!(this.tx>1024-32))) {
          this.x += deltaT*this.v;
          this.moving = true;
        }
        else {
          this.moving = false;
        }
      }
      else if(input.keyPressed("ArrowUp")) {
        this.dir = 'u'
        this.tx = Math.floor(this.x+0.1);
        this.ty = Math.floor(this.y+0.1)-32;
        if(global.map.layers[0].data[(this.tx/32)+(this.ty/32)*50]===1&&(!(this.ty<0))) {
          this.y -= deltaT*this.v;
          this.moving = true;
        }
        else {
          this.moving = false;
        }
      }
      else if(input.keyPressed("ArrowDown")) {
        this.dir = 'd'
        this.tx = Math.floor(this.x+0.1);
        this.ty = Math.floor(this.y+0.1)+32;
        if(global.map.layers[0].data[(this.tx/32)+(this.ty/32)*50]===1&&(!(this.ty>768-32))) {
          this.y += deltaT*this.v;
          this.moving = true;
        }
        else {
          this.moving = false;
        }
      }
      else {
        this.moving = false;
      }
    }
  }

  /** @method render
    * Renders the player
    * @param {double} deltaT - elapsed time
    * @param {Context2D} context - the rendering context
    */
  render(deltaT, context) {
    var row = 0;
    switch(this.dir) {
      case 'u':
        row = 32;
        break;
      case 'd':
        row = 0;
        break;
      case 'l':
        row = 96;
        break;
      case 'r':
        row = 64;
        break;
    }

    if (this.moving) {
      this.frameTimer += deltaT;
      if (this.frameTimer > 100) {
        this.frame += 32;
        if (this.frame > 64) {
          this.frame = 0;
        }
        this.frameTimer = 0;
      }
    }
    else {
      this.frame = 0;
      this.frameTimer = 100000;
    }
    context.drawImage(this.img,this.frame,row,32,32,this.x,this.y,32,32);
    /*context.fillStyle = "blue";
    context.beginPath();
    context.arc(this.x, this.y, 16, 0, 2*Math.PI);
    context.fill();*/
  }

}
