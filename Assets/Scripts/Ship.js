#pragma strict


var jet_l  : Transform;
var jet_r  : Transform;
var jet_u  : Transform;
var jet_d  : Transform;
var jet_fr : Transform;
var jet_fl : Transform;

private var j_l_vis  : visibility;
private var j_r_vis  : visibility;
private var j_u_vis  : visibility;
private var j_d_vis  : visibility;
private var j_fr_vis : visibility;
private var j_fl_vis : visibility;

var enable: boolean = false;
	
function Start () 
{
	//Get Jet js files
	j_l_vis  =  jet_l.GetComponent(visibility);
	j_r_vis  =  jet_r.GetComponent(visibility);
	j_u_vis  =  jet_u.GetComponent(visibility);
	j_d_vis  =  jet_d.GetComponent(visibility);
 	j_fl_vis = jet_fl.GetComponent(visibility);
	j_fr_vis = jet_fr.GetComponent(visibility);
	

}

function Update () 
{

	
	//Hide by default
	j_u_vis.Hide();
	j_d_vis.Hide();
	j_l_vis.Hide();
	j_r_vis.Hide(); 
	
	j_fl_vis.Hide();
	j_fr_vis.Hide(); 
	
	if(!enable) return;
	
	var yaw = Input.GetAxis("Yaw"); 
	var power = Input.GetAxis("Power");
	var pitch = Input.GetAxis("Pitch");
	
	//Left / Right
	if(yaw > 0)
		j_l_vis.Show();
	else if (yaw < 0)
		j_r_vis.Show();	
		
	//Back
	if(power > 0 || pitch > 0)
		j_d_vis.Show();
	if(power > 0 || pitch < 0)
		j_u_vis.Show();
	 
	//Front
	if(power < 0 && yaw > 0)
		j_fr_vis.Show();
	if(power < 0 && yaw < 0)
		j_fl_vis.Show();
		
	if(power < 0 && yaw == 0) 
	{
	 	j_fr_vis.Show();
		j_fl_vis.Show();
	}

}


