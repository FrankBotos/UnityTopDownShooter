#pragma strict

var readyNow : boolean = true;
private var timeToDelay : float = 0.05;
var bulletPrefab : Rigidbody;

function Start () {

}

function Update () {

	if (Input.GetMouseButton(0) && readyNow && globalVariables.bulletUpgrade == 3  && globalVariables.currentWeapon == false){
			timeToDelay = 0.03;
			Shoot3();
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