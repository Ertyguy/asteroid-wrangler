#pragma strict

var beam : Transform;
var ring : Transform;
var ship : Transform;
var hold_mass = 0.6;

private var beam_vis: visibility;
private var ring_vis: visibility;
private var holding:  GameObject;
private var cont: controls;
private var ast: Asteroid;


private var shoot: int;

private var press: boolean = false; //button pressed
private var threw: boolean = false; //button pressed to throw
private var hold:  boolean = false; //holding object


function Start () 
{
	cont = ship.GetComponent(controls);
	beam_vis = beam.GetComponent(visibility);
	ring_vis = ring.GetComponent(visibility);
}

function Update () 
{
	shoot = Input.GetAxis("Shoot");


	//Debug.Log("P: "+press+" , H: "+hold+" , T: "+threw);

	if(!hold)
	{
		cont.setTrueTurn(Speed.normal);
		beam_vis.Hide();
		ring_vis.Hide();
		
	}
	else
	{
		cont.setTrueTurn(Speed.alt);
		ring_vis.Show();	
	}
	

	//show beam
	if(shoot > 0 || hold)
	{
		beam_vis.Show();				
	}
	
	//let go
	if((shoot < 0 && hold) || (shoot > 0 && !press && hold))
	{
		
		RemoveJoint();
		hold = false;
		//throwing
		if(shoot > 0 && !threw)
		{
			Throw();
			threw = true;
		}
	}
	
	//press only happends once per keydown
	if(shoot == 1 && !press)
	{
		press = true;
	}
	else if(shoot != 1)
	{
		press = false;
		threw = false;
	}


	
}

function OnTriggerStay (trigger : Collider) 
{
	if(!threw && !hold && shoot > 0 && !trigger.gameObject.GetComponent(FixedJoint))
	{
		//set holding GO to trigger or parent
		holding = trigger.gameObject.tag == "Asteroid" ? trigger.gameObject : trigger.transform.parent.gameObject;
		
		//var joint: HingeJoint = holding.AddComponent(HingeJoint); //add fixed joint to 'trigger'
		//joint.connectedBody = GameObject.Find("ship").rigidbody;
		//joint.useSpring = true;
		//holding.rigidbody.mass = hold_mass;
		
		
		ast = holding.gameObject.GetComponent(Asteroid);
		ast.Held(this.gameObject);
		
		hold = true;
		Debug.Log("grab");
	}

}

function RemoveJoint()
{
	ast.LetGo();
	holding.rigidbody.mass = 1;
	//var joint: HingeJoint = holding.GetComponent(HingeJoint);
	//Destroy(joint);
	//Debug.Log("destroy joint");
}

function Throw()
{
	//Direction ship is facing
	
	//TODO /make this better
	var s: Vector3 = transform.parent.gameObject.transform.position;
	var dir: Vector3 = new Vector3(s.x, s.y+0.5, s.z);
	var direction:Vector3 = (gameObject.transform.position - dir);
    direction.Normalize();
    
	holding.rigidbody.AddForce(direction * 6f, ForceMode.Impulse);
	//Debug.Log("threw it");
}