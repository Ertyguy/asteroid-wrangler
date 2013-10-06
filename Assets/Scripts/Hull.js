#pragma strict

var explosion : GameObject;
var speed = 5.0;

private var asteroids;
private var ship: Transform;
private var game:Game;

function Start () {
	game = GameObject.Find("GUI Hud").GetComponent(Game);
	asteroids = LayerMask.NameToLayer("Asteroid");
	ship = transform.parent.gameObject.transform;
}

function Update () {

}

function OnCollisionEnter(target: Collision){
	if(target.gameObject.layer == asteroids){

		//draw small explosion near impact
		var e_position:Vector3 = ((transform.position - target.gameObject.transform.position) * 0.5f) + target.gameObject.transform.position;
		var explosion: GameObject = Instantiate(explosion, e_position, target.gameObject.transform.rotation);
		Destroy(explosion,1.5);

		//bump ship away
		var dir: Vector3 = (ship.position - e_position).normalized;
		ship.rigidbody.velocity = ship.rigidbody.velocity + (dir*speed);

		game.reduceHealth();
	}
}