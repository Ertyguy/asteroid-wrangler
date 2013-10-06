#pragma strict

var asteroids: GameObject;
var guiasteroidcount: GUIText;
private var asteroidcount: int;

function Start () 
{
	asteroidcount = 0;
	setAsteroidCount();
}

function Update () 
{
	setAsteroidCount();
	
}

function setAsteroidCount()
{
	asteroidcount = asteroids.transform.childCount;
	guiasteroidcount.text = asteroidcount.ToString();
}

