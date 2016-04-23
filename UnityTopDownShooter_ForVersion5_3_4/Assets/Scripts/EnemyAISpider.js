#pragma strict
var health : int = 5;//local health
var player : Transform;
var speed : int = 3;
var inCombat : boolean = false;
var origin : Vector3;//this variable will save the starting position of the enemy, to which he returns once he is out of combat

var readyNow : boolean = true;//used to wait a few seconds before returning to origin
var timeToDelay : float = 5;

var anim : Animation;

function Start () {

	anim = gameObject.GetComponent ("Animation");
	origin = transform.position;

}

function Update () {
	
	//Destroy self if health reaches 0
	if (health < 0){
		Destroy(gameObject);
	}
	
	

	
	//Move towards Player if within a certain ditsance
	var distanceFromPlayer : float = Vector3.Distance (player.transform.position, transform.position);

	if (distanceFromPlayer <=15 && distanceFromPlayer >=2.7){
		transform.position = Vector3.MoveTowards (transform.position, player.position, Time.deltaTime * speed);
	}
	
	if (distanceFromPlayer < 15){
		inCombat = true;
	}
	else{
		inCombat = false;
	}
	
	if (inCombat){
		//watch player
		transform.LookAt(player);
			if (distanceFromPlayer < 14 && distanceFromPlayer > 2.7){
				anim.CrossFade("run");
			}
			else{
				anim.CrossFade("attack1");
			}
	}
	else if (inCombat == false && readyNow == true){
		anim.CrossFade("idle");
	}	

}

function OnCollisionEnter (col : Collision){

	if (col.gameObject.name == "bullet01(Clone)"){
	health--;
	}
}
