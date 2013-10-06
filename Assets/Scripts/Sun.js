#pragma strict


var explosion : GameObject;
private var asteroids;

function Start () {
	asteroids = LayerMask.NameToLayer("Asteroid");
}

function Update () {

}


function OnTriggerEnter(target: Collider){
	
	if(target.gameObject.layer == asteroids){
		var explosion: GameObject = Instantiate(explosion, target.gameObject.transform.position, target.gameObject.transform.rotation);
		Destroy(explosion,1.5);
		
		var rock = target.gameObject.tag == "Asteroid" ? target.gameObject : target.transform.parent.gameObject;
		Destroy(rock);

	}
}