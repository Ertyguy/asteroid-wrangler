#pragma strict

var asteroids: GameObject;
var guiasteroidcount: GUIText;
var guihealthtic: GUITexture;

var shipGO: GameObject;
var energyempty: Texture2D;
var explosion : GameObject;


var health: int = 4;
var maxHealth:int = 4;

private var healthXOffset = 6;
private var asteroidcount: int;

var shipT: Transform;
private var controlsjs: controls;
private var shipjs: Ship;

var style:GUIStyle;
var state: GameState = GameState.Title;

enum GameState 
{
	Title,
	Game,
	Restart,
}



function Start () 
{
	controlsjs = shipT.GetComponent(controls);
	shipjs = shipT.GetComponent(Ship);

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
	createExplosion(shipGO);
	Destroy(shipGO,.2);
	state = GameState.Restart;
}


function createExplosion(target: GameObject)
{
	Debug.Log("destroy");
	var explosion: GameObject = Instantiate(explosion, target.transform.position, target.transform.rotation);
	Destroy(explosion,1.5);
}

function OnGUI()
{
	//var style = new GUIStyle();
	//style.normal.textColor = GUI.skin.label.normal.textColor;
	//style.fontSize = 40;
	//style.
 	//GUI.skin.label.font = new Font();
 	if(state == GameState.Title)
 	{
 		GUI.BeginGroup (new Rect (Screen.width / 3, Screen.height / 4, Screen.width/2, Screen.height/2));
 		
 		GUI.Label (Rect (0, 0, 150, 20), "Asteroid Wranlger", style);
 		//makes a GUI start button
	    if(GUI.Button (Rect (50, 80, 150, 20), "< Start >", style))
	    {
	       //Load a level
	      state = GameState.Game;
	      controlsjs.enable = true;
	      shipjs.enable = true;
	    }
	    GUI.EndGroup();
 	}
 	if(state == GameState.Restart)
 	{
	    //makes a GUI reset button
	    if(GUI.Button (Rect (Screen.width/2 - 50, Screen.height/2 + 10, 100, 50), "< Restart >", style))
	    {
	       //Loads a level
	      Application.LoadLevel(0);
	    }
    }

}