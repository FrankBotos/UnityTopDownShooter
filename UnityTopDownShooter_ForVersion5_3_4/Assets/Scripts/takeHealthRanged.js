#pragma strict

var hit : boolean = false;
var blood : GameObject;
var hurt : AudioClip;

function Start(){
	Wait();
}

function OnCollisionEnter (col : Collision){
	if (col.gameObject.name == "player" && hit == false){
		AudioSource.PlayClipAtPoint(hurt, transform.position, 0.3);
		Instantiate (blood, transform.position, transform.rotation);
		globalVariables.health -= 10;
	}
}

function Wait(){
	yield WaitForSeconds (1.5);
	hit = true;
}