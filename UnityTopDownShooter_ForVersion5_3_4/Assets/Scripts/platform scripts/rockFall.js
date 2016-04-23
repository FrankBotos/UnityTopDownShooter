#pragma strict

var player : GameObject;
var rigidBodyAdded = false;

function Start (){

	player = gameObject.Find("player");

}

function OnCollisionEnter(col : Collision){

	if (col.gameObject.name == "player" && player.transform.position.y > transform.position.y + 0.1 && rigidBodyAdded == false){
	
		AddRigidBody();
	
	}

}

function AddRigidBody(){

	rigidBodyAdded = true;
	yield WaitForSeconds(1);
	gameObject.AddComponent(Rigidbody);


}