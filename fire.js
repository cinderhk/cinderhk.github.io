
function f(){
  var audio = new Audio("bum.mp3");
  var song = new Audio("song.mp3");
  
  song.play();
  let canvas, width, height, ctx;
  let fireworks = [];
  let particles = [];
  let count = 0;
  function setup() {
    canvas = document.getElementById("canvas");
    setSize(canvas);
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#112";
    fireworks.push(new Firework(Math.random() * (width - 200) + 100));
    window.addEventListener("resize", windowResized);
  }
  
  setTimeout(setup, 1);
  setInterval(() => {
    count++;
  }, 1000);
  function loop() {
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
  
    for (let i = 0; i < fireworks.length; i++) {
      let done = fireworks[i].update();
      fireworks[i].draw();
      if (done) fireworks.splice(i, 1);
    }
  
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].lifetime > 800) particles.splice(i, 1);
    }
  
    if (Math.random() < 1 / 60)
      fireworks.push(new Firework(Math.random() * (width - 200) + 100));
  }
  setInterval(loop, 10);
  //setInterval(loop, 100/60);
  class Particle {
    constructor(x, y, col) {
      this.x = x;
      this.y = y;
      this.col = randomCol();
      this.vel = randomVec(5);
      this.lifetime = 0;
    }
  
    update() {
      this.x += this.vel.x;
      this.y += this.vel.y;
      this.vel.y += 0.02;
      this.vel.x *= 0.99;
      this.vel.y *= 0.99;
      this.lifetime++;
    }
  
    draw() {
      ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0);
      ctx.fillStyle = this.col;
      ctx.fillRect(this.x, this.y, 3, 3);
    }
  }
  
  class Firework {
    constructor(x) {
      this.x = x;
      this.y = height;
      this.isBlown = false;
      this.col = randomCol();
    }
  
    update() {
      this.y -= 3;
      if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
        this.isBlown = true;
        audio.play();
        console.log(count);
        if (count >= 40 && count<75) {
          text("黄倩 i love you", 300);
        }
        for (let i = 0; i < 120; i++) {
          particles.push(new Particle(this.x, this.y, this.col));
        }
      }
      return this.isBlown;
    }
  
    draw() {
      ctx.globalAlpha = 1;
      ctx.fillStyle = this.col;
      ctx.fillRect(this.x, this.y, 5, 5);
    }
  }
  
  function randomCol() {
    var letter = "0123456789ABCDEF";
    var nums = [];
  
    for (var i = 0; i < 3; i++) {
      nums[i] = Math.floor(Math.random() * 256);
    }
  
    let brightest = 0;
    for (var i = 0; i < 3; i++) {
      if (brightest < nums[i]) brightest = nums[i];
    }
  
    brightest /= 255;
    for (var i = 0; i < 3; i++) {
      nums[i] /= brightest;
    }
  
    let color = "#";
    for (var i = 0; i < 3; i++) {
      color += letter[Math.floor(nums[i] / 16)];
      color += letter[Math.floor(nums[i] % 16)];
    }
    return color;
  }
  
  function randomVec(max) {
    let dir = Math.random() * Math.PI * 2;
    let spd = Math.random() * max;
    return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
  }
  
  function setSize(canv) {
    canv.style.width = innerWidth + "px";
    canv.style.height = innerHeight + "px";
    width = innerWidth;
    height = innerHeight;
  
    canv.width = innerWidth * window.devicePixelRatio;
    canv.height = innerHeight * window.devicePixelRatio;
    canvas
      .getContext("2d")
      .scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  
  // function onClick(e) {
  //   fireworks.push(new Firework(e.clientX));
  // }
  
  function windowResized() {
    setSize(canvas);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
  }
  
  function text(text, font) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var bgCanvas = document.createElement("canvas");
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    var bgCtx = bgCanvas.getContext("2d");
    bgCtx.font = `${font}px impact`;
    bgCtx.fontStyle = "#ffffff";
    bgCtx.fillText(text, 150, 300);
    var imageData, pixel, width, height;
    imageData = bgCtx.getImageData(0, 0, bgCanvas.width, bgCanvas.height);
    console.log(imageData.data);
    var densess = 14;
    var circleRadius = 6;
    var clear = function () {
      setup();
    };
    clear();
    var circles = [];
    function init() {
      for (height = 0; height < bgCanvas.height; height += densess) {
        for (width = 0; width < bgCanvas.width; width += densess) {
          pixel = imageData.data[(width + height * bgCanvas.width) * 4 - 1];
          if (pixel == 255) {
            drawCircle(width, height);
          }
        }
      }
    }
    init();
  
    function drawCircle(x, y) {
      circles.push({ gX: x, gY: y, col: randomCol() });
    }
    drawCircle();
    function renderCircle(circles = {}) {
      for (var i = 0; i < circles.length; i++) {
        console.log(circles[i]);
        var circ = circles[i];
        ctx.beginPath();
        ctx.arc(circ.gX, circ.gY, circleRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = circles[i].col;
        ctx.closePath();
        ctx.fill();
      }
    }
    renderCircle(circles);
  }
}

var btn = document.querySelector(".button-64")
console.log(btn)
btn.onclick = function (){
  btn.style.display = "none";
  f()
}
