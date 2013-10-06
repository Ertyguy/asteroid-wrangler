#pragma strict

static var moving: boolean;
var point: GameObject;
var isHeld: boolean;

function Start () {
	//Random rotation
	var xSpin = Random.Range(0.0,0.1);
	var ySpin = Random.Range(0.0,0.1);
	var zSpin = Random.Range(0.0,0.1);
	
	var rigidBody = this.GetComponent(Rigidbody);
	rigidBody.angularVelocity = new Vector3(xSpin, ySpin,zSpin);
}

function Update () 
{
	//Move to laser position
	if(isHeld)
	{
		var forward = point.transform.position + point.transform.forward*3;
		transform.position = Vector3.Lerp(transform.position, forward, 2);
	}	
}


function Held (hand: GameObject) {
	point = hand;
	isHeld = true;
}

function LetGo() 
{
	isHeld = false;
	point = null;
}

