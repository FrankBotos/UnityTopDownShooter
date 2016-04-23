#pragma strict

private var targetCameraAngle : float = 1;//will determine the angle of camera
private var originalCameraAngle : float;

private var collisionDetector : GameObject;
private var player : GameObject;

private var distance : float = 0;
var targetDistance : float = 0;

function Start(){

	originalCameraAngle = gameObject.Find("Main Camera").GetComponent(SmoothFollow).height;
	
	collisionDetector = gameObject.Find("playerCollisionDetect");
	player = gameObject.Find ("player");

}

function Update(){

	distance = Vector3.Distance (player.transform.position, transform.position);
		
	if (distance < targetDistance){
		collisionDetector.active = false;
	}
	else{
		collisionDetector.active = true;
	}

}


function OnTriggerEnter (col : Collider){

	if (col.gameObject.name == "player"){
	
		var camera : SmoothFollow = gameObject.Find("Main Camera").GetComponent(SmoothFollow);
		camera.height = targetCameraAngle;
		
	}

}

function OnTriggerExit (col : Collider){

	if (col.gameObject.name == "player"){
	
		var camera : SmoothFollow = gameObject.Find("Main Camera").GetComponent(SmoothFollow);
		camera.height = originalCameraAngle;
		
	}

}