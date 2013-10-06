#pragma strict

var scrollSpeed = 1.0;
var scrollSpeed2 = 0.0;
private var startTime = 0.0;
 
function Start() {
  startTime = Time.time;
}
 
function FixedUpdate()  {
    var offset = (Time.time - startTime) * scrollSpeed;
    var offset2 = (Time.time - startTime) * scrollSpeed2;
    renderer.material.mainTextureOffset = Vector2(offset2,offset);
}