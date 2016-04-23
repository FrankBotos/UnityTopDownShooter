#pragma strict

var timeToDelay : float = 2;//time between projectiles
var enemyProjectile : GameObject;
var projectileSpeed : float = 1;//speed of projectile
var readyNow : boolean = true;//used for delay between shots
var player : Transform;

function Start () {
}

function Update () {

	var distanceFromPlayer : float = Vector3.Distance (player.transform.position, transform.position);
	
	if (distanceFromPlayer <= 10){
		
		if (distanceFromPlayer < 20 && readyNow){
			timeToDelay = 2;
			ShootPlayer();
		}			
	}	
}

function ShootPlayer (){
	readyNow = false;
	//creating and shooting bullet
	var bullet = Instantiate (enemyProjectile, transform.position, transform.rotation);
	bullet.GetComponent.<Rigidbody>().AddForce (transform.forward * projectileSpeed);
	yield WaitForSeconds (timeToDelay);
	readyNow = true;
}