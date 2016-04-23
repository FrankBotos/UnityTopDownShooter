#pragma strict

function OnCollisionEnter (col : Collision){

	if (col.gameObject.name == "player"){
		globalVariables.health -= 20;
	}
}