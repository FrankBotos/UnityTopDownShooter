#pragma strict

var explosion : GameObject;

function OnCollisionEnter (col : Collision){
	if (col.gameObject.tag == "enemy"){
	Instantiate(explosion, transform.position, transform.rotation);
	Destroy (gameObject);
	}
}