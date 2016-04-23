#pragma strict

var health : int = 5;//local health
private var player : Transform;
var speed : float = 6.5;
var inCombat : boolean = false;

var death : GameObject;//gameobject used to represent death sequence
var blood : GameObject;//gameobject used for blood splatters
var selfBlood : GameObject;//gameobject used for blood splatters that come from the skeleton when he's attacked with a sword
var soulFilaments : GameObject;

var readyNow : boolean = true;//used to wait a few seconds before attacks
var readyForSword : boolean = true;//used to wait a few seconds after sword takes damage
var currentlyAttacking : boolean = false;//used to give player a chance to dodge attacks, so that enemy is not always looking directly at him

var swordHit : AudioClip;//sound to play when hit by sword

var readyToScream : boolean = true;
var scream : AudioClip;
var scream2 : AudioClip;

var deathScream : AudioClip;

var anim : Animation;

function Start () {

	anim = gameObject.GetComponent ("Animation");
	player = gameObject.Find("player").transform;
}

function Update () {

	//Destroy self if health reaches 0
	if (health < 1){
		Instantiate (soulFilaments, transform.position, transform.rotation);
		Instantiate(death,transform.position,transform.rotation);
		
		var shouldScream : int = Random.Range(1,4);
		
		if (shouldScream == 1){
			AudioSource.PlayClipAtPoint(deathScream, transform.position, 1.5);
		}
		
		Destroy(gameObject);
	}
	
	//Move towards Player if within a certain ditsance
	var distanceFromPlayer : float = Vector3.Distance (player.transform.position, transform.position);

	if (distanceFromPlayer <=15 && distanceFromPlayer >=3 && globalVariables.playerGrounded == true){
		transform.position = Vector3.MoveTowards (transform.position, player.position, Time.deltaTime * speed);
	}
	
	if (distanceFromPlayer < 15){
		inCombat = true;
	}
	else{
		inCombat = false;
	}
	
	if (inCombat){
		if (currentlyAttacking == false){//only looks at player if he is readying for an attack but is not actually
			//code block used to make the enemy look at the player rotating along the y axis
			//pointToLook takes the players position, then the y coordinate is zeroed out to avoid rotation
			//then looks at pointToLook, which is the same as player.transform.position, but the y is zeroed out
			var pointToLook : Vector3 = player.transform.position;
			pointToLook.y = transform.position.y;
			transform.LookAt(pointToLook);
			////////////////////////////////////////////////////////////////////////////////////////////////////
		}
		
		if (distanceFromPlayer < 14 && distanceFromPlayer > 3){
				anim.CrossFade("run");
		}
		else{
			if (readyNow == true){
				Attack();
			}
		}	
	}
	else if (inCombat == false){
		anim.CrossFade("waitingforbattle");
	}	

}

function OnCollisionEnter (col : Collision){

	if (col.gameObject.name == "bullet01(Clone)"){
		health--;
	}
}

function OnTriggerEnter (col : Collider){
	
	if (col.gameObject.name == "playerSword" && readyForSword == true){
		SwordTakeHealth();
	}
	
}






function Attack(){
	readyNow = false;
	yield WaitForSeconds (0.8);
	currentlyAttacking = true;
	anim.Play("attack");
	yield WaitForSeconds (0.8);
	anim.CrossFade("waitingforbattle");
	currentlyAttacking = false;
	yield WaitForSeconds (0.8);
	currentlyAttacking = true;
	readyNow = true;

}

function SwordTakeHealth(){
	readyForSword = false;

	AudioSource.PlayClipAtPoint(swordHit, transform.position);
	
	Instantiate(selfBlood, Vector3(transform.position.x,transform.position.y+1.5,transform.position.z), transform.rotation);
	health-=2;
	yield WaitForSeconds(0.4);
	readyForSword = true;
}

function Scream(){

	readyToScream = false;
	var whichScream : int = Random.Range(1,3);
	
	if (whichScream == 1){
		AudioSource.PlayClipAtPoint(scream, transform.position);
	}
	else if (whichScream ==2){
		AudioSource.PlayClipAtPoint(scream2, transform.position);
	}
	
	yield WaitForSeconds(Random.Range(4,8));
	
	readyToScream = true;

}