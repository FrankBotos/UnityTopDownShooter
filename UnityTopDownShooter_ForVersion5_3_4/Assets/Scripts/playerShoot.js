#pragma strict

var bulletPrefab : Rigidbody;
private var timeToDelay : float = 0.05;
var readyNow : boolean = true;
var waitForMana : boolean = true;

var spellSound : AudioClip;

function Update () {

if (globalVariables.alive == true){// only executes if player is alive

	if (globalVariables.paused == false && globalVariables.currentWeapon == false){
			if (Input.GetMouseButton(0)){ // subtracts mana based on mouse clicks and not amount of projectiles fired
	
			if ((globalVariables.mana + 1) > globalVariables.manaCost && waitForMana == true){//the plus one is to make sure the mana is totally depleted before regenerating so as not to have infinite supply of bullets
					WaitForMana();//waits in real time so that frame rates don't affect mana depletion rate
					globalVariables.mana -= globalVariables.manaCost;
				}
			}
	

			if (Input.GetMouseButton(0) && readyNow){
	
				if (globalVariables.bulletUpgrade == 1){//checks bullet upgrade level
					timeToDelay = 0.2;
					Shoot1();
				}
				if (globalVariables.bulletUpgrade == 2){// checks bullet upgrade level
					timeToDelay = 0.1;
					Shoot2();
				}
				if (globalVariables.bulletUpgrade == 3){// checks bullet upgrade level
					timeToDelay = 0.03;
					Shoot3();
				}
		
			}
		}
	}
}

function Shoot1 (){
	
	if (globalVariables.mana > globalVariables.manaCost){
	readyNow = false;
	//creating and shooting bullet
	var bullet = Instantiate (bulletPrefab, transform.position, transform.rotation);
	bullet.GetComponent.<Rigidbody>().AddForce (transform.forward * globalVariables.bulletSpeed);
	AudioSource.PlayClipAtPoint(spellSound, transform.position, 0.5);
	yield WaitForSeconds (timeToDelay);
	readyNow = true;
	}
	
}

function Shoot2 (){
	
	if (globalVariables.mana > globalVariables.manaCost){
	readyNow = false;
	//creating and shooting bullet
	var bullet = Instantiate (bulletPrefab, transform.position, transform.rotation);
	bullet.GetComponent.<Rigidbody>().AddForce (transform.forward * globalVariables.bulletSpeed);
	AudioSource.PlayClipAtPoint(spellSound, transform.position, 0.5);
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
	AudioSource.PlayClipAtPoint(spellSound, transform.position, 0.5);
	yield WaitForSeconds (timeToDelay);
	readyNow = true;
	}
	
}

function WaitForMana(){
	waitForMana = false;
	yield WaitForSeconds(0.01);
	waitForMana = true;
}