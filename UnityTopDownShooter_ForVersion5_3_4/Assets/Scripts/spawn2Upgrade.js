#pragma strict

var readyNow : boolean = true;
private var timeToDelay : float = 0.05;
var bulletPrefab : Rigidbody;

function Start () {

}

function Update () {

	if (Input.GetMouseButton(0) && readyNow && globalVariables.bulletUpgrade != 1 && globalVariables.currentWeapon == false){
	
		if (globalVariables.bulletUpgrade == 2){//checks bullet upgrade level
			timeToDelay = 0.1;
			Shoot2();
		}
		if (globalVariables.bulletUpgrade == 3){// checks bullet upgrade level
			timeToDelay = 0.03;
			Shoot3();
		}

	}
}

function Shoot2 (){
	
	if (globalVariables.mana > globalVariables.manaCost){
	readyNow = false;
	//creating and shooting bullet
	var bullet = Instantiate (bulletPrefab, transform.position, transform.rotation);
	bullet.GetComponent.<Rigidbody>().AddForce (transform.forward * globalVariables.bulletSpeed);
	yield WaitForSeconds (timeToDelay);
	readyNow = true;
	}
	
}

function Shoot3 (){
	
	if (globalVariables.mana > globalVariables.manaCost){
	readyNow = false;
	//creating and shooting bullet
	var bullet = Instantiate (bulletPrefab, transform.position, transform.rotation);
	bullet.GetComponent.<Rigidbody>().AddForce (transform.forward * globalVariables.bulletSpeed);
	yield WaitForSeconds (timeToDelay);
	readyNow = true;
	}
	
}