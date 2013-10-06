#pragma strict

var asteroids: GameObject;
var guiasteroidcount: GUIText;
var guihealthtic: GUITexture;

var ship: GameObject;
var energyempty: Texture2D;
var explosion : GameObject;


var health: int = 4;
var maxHealth:int = 4;

private var healthXOffset = 6;
private var asteroidcount: int;

function Start () 
{
	asteroidcount = 0;
	setAsteroidCount();
	
	setHealth(4);
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

function setHealth(amount)
{

	for (var child : Transform in gameObject.GetComponentsInChildren(Transform)) 
	{
	    if (child.CompareTag("Health")) 
		{
			Destroy(child.gameObject);
		} 	
	}

	for(var i=0; i < maxHealth; i++)
	{

		var guiHealth: GUITexture = Instantiate(guihealthtic);
		guiHealth.transform.parent = transform;
		guiHealth.guiTexture.pixelInset.x += guihealthtic.guiTexture.pixelInset.width * i - healthXOffset * i;
		if(i >= health)
		{
			guiHealth.texture = energyempty;
		}
		
	}
	
}

function reduceHealth()
{
	if(--health <= 0)
		killHealth();
	else
		setHealth(health);
}

function killHealth()
{
	health = 0;
	setHealth(health);
	createExplosion(ship);
	Destroy(ship,.2);
}


function createExplosion(target: GameObject)
{
	Debug.Log("destroy");
	var explosion: GameObject = Instantiate(explosion, target.transform.position, target.transform.rotation);
	Destroy(explosion,1.5);
}