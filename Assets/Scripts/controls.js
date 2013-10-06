#pragma strict
@script RequireComponent(Rigidbody)

enum Speed { normal, alt }

var turnspeed = 100.0;
var alt_turnspeed = 90.0;
var speed = 60.0;
var rollSpeed = 30.0;

private var trueSpeed = 0.0;
private var trueTurn = turnspeed;



function Update () {

	var roll = Input.GetAxis("Roll");
	var pitch = Input.GetAxis("Pitch");
	var yaw = Input.GetAxis("Yaw");
	
	var power = Input.GetAxis("Power");
	
	//Truespeed controls
	
	if (trueSpeed < 10 && trueSpeed > -3){
	trueSpeed += power;
	}
	if (trueSpeed > 10){
	trueSpeed = 9.99;	
	}
	if (trueSpeed < -3){
	trueSpeed = -2.99;	
	}
	if (Input.GetKey("backspace")){
		trueSpeed = 0;
	}
	
	rigidbody.AddRelativeTorque(pitch*trueTurn*Time.deltaTime, yaw*trueTurn*Time.deltaTime, roll*rollSpeed*Time.deltaTime);
	rigidbody.AddRelativeForce(0,0,trueSpeed*speed*Time.deltaTime);

}

function setTrueTurn(state: Speed)
{
	switch (state) {
        case Speed.normal:
		trueTurn = turnspeed;
			break;
		case Speed.alt:
		trueTurn = alt_turnspeed;
			break;
			}
}