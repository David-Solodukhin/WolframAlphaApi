var mRenderer, mScene;
var TWO_PI = Math.PI * 2;
var canvasWidth, 
    canvasHeight;
var compositeArray = ['source-over', 'source-in', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'copy', 'xor', 'multiply', 'overlay', 'screen', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
var colorsArray = ['#C3A16A', '#FCD63E', '#FF251A', '#B70E58', '#E2BCB6', '#C4A26B', '#FCD63E', '#FDB52C'];

//arrays
var barArray = [],
    barShadowArray = [],
    cubeArray = [];

var barWidthCalc = 0, 
    barWidthCount = 0;

var tempViewsize = 0;

var gui = new dat.GUI(); 
 dat.GUI.toggleHide();
var cubeCount = 16;
var barCount = 8; 
var barShadowCount = 6;

window.onload = init;

window.addEventListener('resize', resize);
function onld()
{


}
function resize() {
     mRenderer.resize();
     resizeNodes();
	  
	 
}

function init() {
	 var stored = localStorage.getItem("initiate");
	if(stored == null)
     {
		
		 window.location.href = "index.html";
		 return;
	 }
	 document.getElementById("test").style.visibility = "visible";
	window.location.href = '?#';
     initRenderer();
     initNodes();
	

     requestAnimationFrame(loop);
}

function initRenderer() {
     mRenderer = new Renderer('#canvas');
     mScene = new Node();
}

function initNodes() {
     var cube, 
         bar, 
         barShadow,
         barSizes = [],
         barSizesTotal = 0;
         
     // counting and setting random bar widths
     for (var i = 0; i < barCount; i++) {
          barSizes[i] = Math.random();
          barSizesTotal += barSizes[i];
     }

     // saving current viewWidth + viewHeight needed for resizing
     tempViewsize = mRenderer.viewWidth + mRenderer.viewHeight;
     
     // needed int to calculate correct bar widths
     barWidthCalc = (mRenderer.viewWidth + mRenderer.viewHeight) / barSizesTotal;
     
     //datgui
     var barControls = gui.addFolder('colored bars');
     
     //colored bars
     for (var i = 0; i < barSizes.length; i++) {
          var barWidth = barSizes[i] * barWidthCalc;
          var barHeight = calcLength(mRenderer.viewHeight, mRenderer.viewHeight) + barWidth;
          var rectangle = new Rect(barWidth, barHeight);
          bar = new Bar(rectangle);
          bar.pivotX = barWidth;
          bar.x = barWidthCount;
          bar.y = 0;
          bar.rotation = Math.PI / 4;
          barWidthCount += barWidth;
          
          //datgui
          barControls.addColor(rectangle, 'color');
          
          //adding to barArray for resizing
          barArray.push(bar);
          
          //adding bar to the scene
          mScene.add(bar);
     }
     
     var transbarControls = gui.addFolder('shadowy bars');
     
     //leftsided diagonal barShadow
     for (var i = 0; i < barShadowCount; i++) {
          var barWidth = randomRange(20, 100);
          var barHeight = calcLength(mRenderer.viewHeight, mRenderer.viewHeight) + barWidth;
          var rectangle = new Rect(barWidth, barHeight);
          barShadow = new BarShadow(rectangle);
          barShadow.x = randomRange(-mRenderer.viewHeight, mRenderer.viewWidth);
          barShadow.y = 0;
          barShadow.rotation = (Math.PI / -4);
          
          //datgui
          transbarControls.add(rectangle, 'composite', compositeArray);
          
          //adding to barShadowArray for resizing
          barShadowArray.push(barShadow);
          
          //adding barShadow to the scene
          mScene.add(barShadow);
     }
     
     //rightsided diagonal barShadow
     for (var i = 0; i < barShadowCount; i++) {
          var barWidth = randomRange(20, 100);
          var barHeight = calcLength(mRenderer.viewHeight, mRenderer.viewHeight) + barWidth;
          var rectangle = new Rect(barWidth, barHeight);
          barShadow = new BarShadow(rectangle);
          barShadow.pivotX = barWidth; 
          barShadow.x = randomRange(-mRenderer.viewHeight, mRenderer.viewWidth);
          barShadow.y = 0; 
          barShadow.rotation = (Math.PI / 4);
          
          //datgui
          transbarControls.add(rectangle, 'composite', compositeArray);
          
          //adding to barShadowArray for resizing
          barShadowArray.push(barShadow);
          
          //adding barShadow to the scene
          mScene.add(barShadow);
     }
     
     //datgui
     var cubesControls = gui.addFolder('floating cubes');
     
     //floating cubes
     for (var i = 0; i < cubeCount; i++) {
          var cubeFolder = cubesControls.addFolder('cube ' + i);
          var cubeSize = randomRange(20,200);
          var rectangle = new Rect(cubeSize, cubeSize);
          cube = new Cube(rectangle);       
          cube.anchorX = randomRange(0,mRenderer.viewWidth);
          cube.anchorY = randomRange(0,mRenderer.viewHeight);
          cube.rotation = Math.PI / 4;
          
          //datgui
          cubeFolder.add(rectangle, 'width', 10, 200);
          cubeFolder.add(rectangle, 'height', 10, 200);
          cubeFolder.add(rectangle, 'composite', compositeArray);
          cubeFolder.add(cube, 'speed', 0.001, 1);
          
          //adding to cubeArray for resizing
          cubeArray.push(cube);
          
          //adding cube to the scene
          mScene.add(cube); 
     }

}

//resize function
function resizeNodes () {
     var calcWidth = (mRenderer.viewWidth + mRenderer.viewHeight) / tempViewsize;
     var barHeight = calcLength(mRenderer.viewHeight, mRenderer.viewHeight);
     // resizing colored bars
     for (var i = 0; i < barArray.length; i++) {
          var a = barArray[i].graphics.width;
          barArray[i].graphics.height = barHeight + barArray[i].graphics.width;
          barArray[i].graphics.width = barArray[i].graphics.width * calcWidth;
          a = barArray[i].graphics.width / a; 
          barArray[i].x = a * barArray[i].x; 
          barArray[i].pivotX = barArray[i].graphics.width;
     }
     // resizing shadowy bars
     for (var i = 0; i < barShadowArray.length; i++) { 
          var a = barShadowArray[i].graphics.width;
          barShadowArray[i].graphics.height = barHeight + barShadowArray[i].graphics.width;
          barShadowArray[i].graphics.width = barShadowArray[i].graphics.width * calcWidth;
          a = barShadowArray[i].graphics.width / a;
          barShadowArray[i].x = a * barShadowArray[i].x;
          if(i > barShadowArray.length / 2) barShadowArray[i].pivotX = barShadowArray[i].graphics.width;
     }
     // repositioning floating cubes
     for (var i = 0; i < cubeArray.length; i++) { 
          cubeArray[i].anchorX = randomRange(0,mRenderer.viewWidth);
          cubeArray[i].anchorY = randomRange(0,mRenderer.viewHeight);
     }
     tempViewsize = mRenderer.viewWidth + mRenderer.viewHeight;
}

// GRAPHICS - rect

function Rect(width, height, color) {
     this.width = width;
     this.height = height;
     this.color = color ? color :"#000";
     this.composite = compositeArray[0];
}
Rect.prototype = {
     draw: function(ctx) {
          ctx.globalCompositeOperation = this.composite;
          ctx.fillStyle = this.color;
          ctx.fillRect(0, 0, this.width, this.height);
          ctx.fill();
     }
};

// LOOP

function draw() {
     mRenderer.render(mScene); 
}

function loop() {
     draw();
     requestAnimationFrame(loop);
}

// RENDERING

function Renderer(selector, width, height) {
     this.canvas = document.querySelector(selector);
     this.ctx = this.canvas.getContext('2d');

     this.resize(width, height)
}
Renderer.prototype = {
     resize: function(width, height) {
          this.viewWidth = canvasWidth = this.canvas.width = width || this.canvas.clientWidth;
          this.viewHeight = canvasHeight = this.canvas.height = height || this.canvas.clientHeight;
     },
     render: function(node) {
          this.ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);

          node.render(this.ctx);
     }
};

function Node(graphics) {
     this.graphics = graphics;
     this.x = 0;
     this.y = 0;
     this.pivotX = 0;
     this.pivotY = 0;
     this.scaleX = 1;
     this.scaleY = 1;
     this.rotation = 0;
     this.alpha = 1;
     this.children = [];
}
Node.prototype = {
     add: function(node) {
          this.children.push(node);
     },
     remove: function(node) { 
          var i = this.children.indexOf(node);

          if (i >= 0) {
               this.children.splice(i, 1);
          }
     },
     render: function(ctx) {
          this.update && this.update();
          
          ctx.save();

          ctx.translate(this.pivotX + this.x, this.pivotY + this.y);
          ctx.rotate(this.rotation);
          ctx.scale(this.scaleX, this.scaleY);
          ctx.translate(-this.pivotX, -this.pivotY);
          ctx.globalAlpha = this.alpha;
          
          this.graphics && this.graphics.draw(ctx);

          for (var i = 0; i < this.children.length; i++) {
               this.children[i].render(ctx);
          }

          ctx.restore();
     }
};

// LOGICS - cubes
function Cube(graphics) {
	Node.call(this, graphics);
     
     this.time = randomRange(mRenderer.viewWidth/2, mRenderer.viewWidth*2); 
     //this.time = 800;
     this.dt = (1/60);
     
     var diag = Math.PI * 0.25;
     graphics.composite = compositeArray[(randomRange(16, 19) | 0)]; 
     
     this.angle = ((Math.PI/2) * (randomRange(1, 4) | 0)) - diag;
     
     this.dirX = Math.cos(this.angle);
     this.dirY = Math.sin(this.angle);
     
     this.speed = randomRange(0.001, 0.01); 
     this.distanceX = mRenderer.viewWidth;
     this.distanceY = mRenderer.viewHeight;
     this.alpha = randomRange(0.1,0.5);
}
Cube.prototype = Object.create(Node.prototype);
Cube.prototype.update = function() {
     
     this.time += this.dt * this.speed;
     
     var p = Math.sin(this.time); 
     
     this.x = this.anchorX + this.dirX * (this.time * p);  
     this.y = this.anchorY + this.dirY * (this.time * p);
}

// LOGICS - bars
function Bar(graphics) {
	Node.call(this, graphics);
     
     this.graphics.color = randomFromArray(colorsArray); 
     this.height = graphics.height;
     this.width = graphics.width;
     var diag = Math.PI * 0.25; 

     this.angle = ((Math.PI/2) * (randomRange(1, 4) | 0)) - diag;
}
Bar.prototype = Object.create(Node.prototype);

// LOGICS - shadow bars
function BarShadow(graphics) {
	Node.call(this, graphics); 
     graphics.composite = compositeArray[(randomRange(9, 11) | 0)];
     
     var diag = Math.PI * 0.25; 
     
     this.angle = ((Math.PI/2) * (randomRange(1, 4) | 0)) - diag
     this.alpha = randomRange(0.1,0.3);
}
BarShadow.prototype = Object.create(Node.prototype);

// tools
function randomRange(min, max) {
     return min + Math.random() * (max - min);
}

function randomFromArray(array) {
     return array[randomRange(0, array.length) | 0];
}

function calcLength(a, b) {
     return Math.sqrt(a * a + b * b);
}