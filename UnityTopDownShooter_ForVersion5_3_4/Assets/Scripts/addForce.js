#pragma strict


var forceToAdd : int;
var bigRockTarget : GameObject;
var falling : bigRockControl;
var forceAdded : boolean = false;
var rockFalling : boolean = false;
var distance : float = 0;

function Start(){

	falling = gameObject.Find("bigRockControl").GetComponent("bigRockControl");
	bigRockTarget = gameObject.Find("bigRockTarget");
	

}

function Update () {

	rockFalling = falling.rockFalling;

	distance = Vector3.Distance (bigRockTarget.transform.position, transform.position);

	if (rockFalling == true && forceAdded == false){	
		GetComponent.<Rigidbody>().AddForce(Vector3.back * 100000);
		forceAdded = true;
	}

	if (distance < 5){
		Destroy(gameObject.GetComponent("Rigidbody"));
	}

	if (rockFalling == true && distance > 5){
		transform.position = Vector3.MoveTowards (transform.position, bigRockTarget.transform.position, Time.deltaTime * 5);
	}

}

function OnCollisionEnter(col : Collision){

	if (col.gameObject.name == "player" && distance > 5){
	
		globalVariables.health -= globalVariables.maxHealth;
	
	}

}