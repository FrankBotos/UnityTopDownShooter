#pragma strict

//attach this script to the treasure box top

var player : GameObject;
var soundToPlay : AudioClip;

var playingSound : boolean = false;

function Start () {

	player = gameObject.Find("player");

}

function Update () {
	
	//opening chest with action button
	var distanceFromPlayer : float = Vector3.Distance (player.transform.position, transform.position);
	if (distanceFromPlayer < 4 && Input.GetButton("action") && transform.localRotation.x > -0.3){
		if (playingSound == false){
			GetComponent.<AudioSource>().PlayOneShot(soundToPlay);
			WaitForSound();
		}
		transform.localRotation.x -= 0.5 * Time.deltaTime;
	}

	//////////////////////////////////////
	
	
	
	
}

function WaitForSound(){

	playingSound = true;
	yield WaitForSeconds(1);
	playingSound = false;

}