class Star {
  constructor(image,x,y,size,angle, idx) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = angle
    this.clicked = false;
    setTimeout(() => this.show = true, idx * 50);
  }
  
  click() {
    var closeEnough = (this.x-mouseX)**2+(this.y-mouseY)**2 < (this.size*this.image.width)**2;
    if(closeEnough) {
      this.clicked = true;
      this.destination = 240;//random() * 100;
    }
    return closeEnough;
  }
  
  collide(other) {
    var distance = (this.x-other.x)**2 + (this.y-other.y)**2;
    return distance < ((this.size+other.size)*this.image.width)**2;
  }
  
  draw() {
    if(!this.show) return;
    push();
    var w = this.image.width * this.size;
    var h = this.image.height * this.size;
    translate(this.x,this.y);
    rotate(this.angle);
    image(this.image,0,0,w,h);
    pop();
    if(this.clicked) {
      this.y -= 2;
      this.angle += 0.1;
      // once we've reached a given threshold, we stop showing the star
      if(this.y < this.destination) {
        this.clicked = false;
        this.show = false;        
      }
    }
  }
}

