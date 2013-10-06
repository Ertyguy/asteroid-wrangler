#pragma strict


private var asteroids;
private var game:Game;

function Start () {
	asteroids = LayerMask.NameToLayer("Asteroid");
	game = GameObject.Find("GUI Hud").GetComponent(Game);
}

function Update () {

}


function OnTriggerEnter(target: Collider){
	Debug.Log(target.gameObject.tag);
	if(target.gameObject.layer == asteroids){
		
		game.createExplosion(target.gameObject);
		
		var rock = target.gameObject.tag == "Asteroid" ? target.gameObject : target.transform.parent.gameObject;
		Destroy(rock);

	}
	if(target.gameObject.tag == "Ship"){
		game.killHealth();
		game.createExplosion(target.gameObject);
	}
}

