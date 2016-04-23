#pragma strict

var explosion : GameObject;

function OnCollisionEnter (col : Collision){
	if (col.gameObject.name == "player"){
	Instantiate(explosion, transform.position, transform.rotation);
	Destroy (gameObject);
	}
}