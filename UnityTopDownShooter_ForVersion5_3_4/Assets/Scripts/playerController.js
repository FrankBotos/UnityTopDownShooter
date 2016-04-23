#pragma strict

Application.targetFrameRate = 20; // caps framerate at 120

//handles input and animation
var directionTracker : GameObject;
var jumpSpeed : float = 2300;//should be set to 1800
var dodgeSpeed : float = 500;//should be set to 500

var dodgedOnce : boolean = false;//checks to see if the player has dodged once already while in mid-air

var swordSwing : AudioClip;
var swinging : boolean = false;//used to wait between swordswing sounds

var footStep : AudioClip;
var stepping : boolean = false;//used to wait between footsteps

var jumpSound : AudioClip;
var jumpSound2 : AudioClip;

var anim : Animator; // used to hold animator component

function Start () {

	anim = gameObject.GetComponent("Animator");//calls animator component

}

function Update () {
	
	if (globalVariables.health < 0.9){
		globalVariables.health = 0.9;
		globalVariables.alive = false;
		anim.SetBool("alive", false);
	}
	
	if (globalVariables.health > globalVariables.maxHealth){
		globalVariables.health = globalVariables.maxHealth;
	}
	
if (globalVariables.alive == false){

	transform.eulerAngles.x = 0;//makes sure the death animation plays properly
	transform.eulerAngles.z = 0;

}

if (globalVariables.alive == true){	
	if (globalVariables.paused == false){
		//look at mouse - code block gotten from: http://youtu.be/-91SYkWezAM
		var playerPlane = new Plane (Vector3.up, transform.position);
		var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	
		var hitdist = 0.0;
	
		if (playerPlane.Raycast (ray, hitdist)){
	
			var targetPoint = ray.GetPoint (hitdist);
	
			var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
	
			transform.rotation = targetRotation;
		}
	}
	
//combat

 if (Input.GetMouseButton(0) && globalVariables.currentWeapon == true){
 	
 	//var attack = Random.Range(1,3);
 	
 	//if (attack == 1){
 	//	Attack1();
 	//}
 	//if (attack == 1){
 		Attack2();
 		
 		if (swinging == false && globalVariables.playerGrounded == true){
 			GetComponent.<AudioSource>().PlayOneShot(swordSwing);
 			WaitForSwing();
 		}
 		
 	//}
 	// if (attack == 2){
 	//	Attack3();
 	//}
 }
 
 if (Input.GetMouseButtonUp(0)){
 		anim.SetBool ("combo2", false);
 		anim.SetBool ("combo1", false);
 		anim.SetBool ("combo3", false);
 }

//block of code for player movement
var horizontalMove : float = Input.GetAxis ("horizontal");
var verticalMove : float = Input.GetAxis ("vertical");	
	//horizontal and vertical only
	if (horizontalMove > 0 && verticalMove == 0 && playerCollisionDetect.collision != 1){//player moves right
		transform.Translate (Vector3(horizontalMove, 0, 0) * (Time.deltaTime * globalVariables.speed), Space.World);
	}
	if (horizontalMove < 0 && verticalMove == 0 && playerCollisionDetect.collision != 2){//player moves left
		transform.Translate (Vector3(horizontalMove, 0, 0) * (Time.deltaTime * globalVariables.speed), Space.World);
	}
	if (verticalMove > 0 && horizontalMove == 0 && playerCollisionDetect.collision != 3){//player moves up
		transform.Translate(Vector3(0,0,verticalMove) * (Time.deltaTime * globalVariables.speed), Space.World);
	}
	if (verticalMove < 0 && horizontalMove == 0 && playerCollisionDetect.collision != 4){//player moves down
		transform.Translate(Vector3(0,0,verticalMove) * (Time.deltaTime * globalVariables.speed), Space.World);
	}
	
	//diagonal
	if (verticalMove < 0 && horizontalMove < 0 && playerCollisionDetect.collision !=5){//down and left
		transform.Translate(Vector3(horizontalMove,0,verticalMove) * (Time.deltaTime * globalVariables.speed) * 0.8, Space.World);
	}
	if (verticalMove < 0 && horizontalMove > 0 && playerCollisionDetect.collision !=6){//down and right
		transform.Translate(Vector3(horizontalMove,0,verticalMove) * (Time.deltaTime * globalVariables.speed) * 0.8, Space.World);
	}
	if (verticalMove > 0 && horizontalMove < 0 && playerCollisionDetect.collision !=7){//up and left
		transform.Translate(Vector3(horizontalMove,0,verticalMove) * (Time.deltaTime * globalVariables.speed) * 0.8, Space.World);
	}
	if (verticalMove > 0 && horizontalMove > 0 && playerCollisionDetect.collision !=8){//up and right
		transform.Translate(Vector3(horizontalMove,0,verticalMove) * (Time.deltaTime * globalVariables.speed) * 0.8, Space.World);
	}
	
	//footsteps sound
	if ((verticalMove != 0 || horizontalMove!= 0) && playerCollisionDetect.collision == 0){
		if (stepping == false && globalVariables.playerGrounded == true){
 			AudioSource.PlayClipAtPoint(footStep,transform.position,0.02);
 			WaitForStep();
 		}
	}
	
	
//player movement ends
	
	//dodging
	if (globalVariables.playerGrounded == true){
		if (Input.GetButtonDown ("dodge") && horizontalMove == -1 && globalVariables.stamina >= globalVariables.staminaCost){
			GetComponent.<Rigidbody>().AddForce (Vector3 (-1,1,0) * dodgeSpeed);
			globalVariables.stamina -= globalVariables.staminaCost;
		}
		if (Input.GetButtonDown ("dodge") && horizontalMove == 1 && globalVariables.stamina >= globalVariables.staminaCost){
			GetComponent.<Rigidbody>().AddForce (Vector3 (1,1,0) * dodgeSpeed);
			globalVariables.stamina -= globalVariables.staminaCost;
			
		}
		if (Input.GetButtonDown ("dodge") && verticalMove == -1 && globalVariables.stamina >= globalVariables.staminaCost){
			GetComponent.<Rigidbody>().AddForce (Vector3 (0,1,-1) * dodgeSpeed);
			globalVariables.stamina -= globalVariables.staminaCost;
		}
		if (Input.GetButtonDown ("dodge") && verticalMove == 1 && globalVariables.stamina >= globalVariables.staminaCost){
			GetComponent.<Rigidbody>().AddForce (Vector3 (0,1,1) * dodgeSpeed);
			globalVariables.stamina -= globalVariables.staminaCost;
		}
	}
	
	if (globalVariables.playerGrounded == false){
		if (Input.GetButtonDown ("dodge") && horizontalMove == -1 && globalVariables.stamina >= globalVariables.staminaCost && dodgedOnce == false){
			dodgedOnce = true;
			GetComponent.<Rigidbody>().AddForce (Vector3 (-1,1,0) * dodgeSpeed);
			globalVariables.stamina -= globalVariables.staminaCost;
		}
		if (Input.GetButtonDown ("dodge") && horizontalMove == 1 && globalVariables.stamina >= globalVariables.staminaCost && dodgedOnce == false){
			dodgedOnce = true;
			GetComponent.<Rigidbody>().AddForce (Vector3 (1,1,0) * dodgeSpeed);
			globalVariables.stamina -= globalVariables.staminaCost;
			
		}
		if (Input.GetButtonDown ("dodge") && verticalMove == -1 && globalVariables.stamina >= globalVariables.staminaCost && dodgedOnce == false){
			dodgedOnce = true;
			GetComponent.<Rigidbody>().AddForce (Vector3 (0,1,-1) * dodgeSpeed);
			globalVariables.stamina -= globalVariables.staminaCost;
		}
		if (Input.GetButtonDown ("dodge") && verticalMove == 1 && globalVariables.stamina >= globalVariables.staminaCost && dodgedOnce == false){
			dodgedOnce = true;
			GetComponent.<Rigidbody>().AddForce (Vector3 (0,1,1) * dodgeSpeed);
			globalVariables.stamina -= globalVariables.staminaCost;
		}
	}
	
	//jump
	if (Input.GetButtonDown("jump") && globalVariables.playerGrounded){
		globalVariables.playerGrounded = false;
		GetComponent.<Rigidbody>().AddForce(Vector3.up * jumpSpeed);
		
		var jumpSoundToPlay : int = Random.Range(1,3);
		
		if (jumpSoundToPlay == 1){
			AudioSource.PlayClipAtPoint(jumpSound,transform.position, 0.2);
		}
		else{
			AudioSource.PlayClipAtPoint(jumpSound2,transform.position, 0.2);
		}
		
	}
	
	//raycasting for collision detection with ground
	var up = transform.TransformDirection (Vector3.up);
	var floorHit : RaycastHit;
	Debug.DrawRay(transform.position, -up * 0.1, Color.red);
	
	if (Physics.Raycast (transform.position, -up, floorHit, 0.1)){
		globalVariables.playerGrounded = true;
	}
	else {
		globalVariables.playerGrounded = false;
	}
	
	
	//resets dodgedonce
	if (globalVariables.playerGrounded == true){
		dodgedOnce = false;
	}
	
	
}
//animations
	if (!globalVariables.playerGrounded){//checks if the player is in the air and adjusts animations accordingly
		anim.SetBool ("walkback", false);
		anim.SetBool("walking", false);
		anim.SetBool("jumping", true);
	}
	else {
		anim.SetBool ("jumping", false);
	}

if (globalVariables.speedUpgrade == 1){//checks if speed has been upgraded
	if (directionTracker.transform.position.z > transform.position.z){//if player is looking forward
		if (verticalMove > 0 && horizontalMove == 0 && globalVariables.playerGrounded && playerCollisionDetect.collision == 0){//if player presses up
			anim.SetBool ("walkback", false);
			anim.SetBool("walking", true);
		}
		else if (verticalMove > 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses up and right
			anim.SetBool ("walkback", false);
			anim.SetBool("walking", true);
		}
		else if (verticalMove > 0 && horizontalMove <0 && playerCollisionDetect.collision == 0){//if player presses up and left
			anim.SetBool ("walkback", false);
			anim.SetBool("walking", true);
		}
		else if (verticalMove < 0 && horizontalMove == 0 && playerCollisionDetect.collision == 0){//if player presses down
			anim.SetBool ("walkback", true);
			anim.SetBool("walking", false);
		}
		else if (verticalMove < 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses down and right
			anim.SetBool ("walkback", true);
			anim.SetBool("walking", false);/////////////////////////////////////////////
		}
		else if (verticalMove < 0 && horizontalMove < 0 && playerCollisionDetect.collision == 0){//if player presses down and left
			anim.SetBool ("walkback", true);
			anim.SetBool("walking", false);
		}
		else if (verticalMove == 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses right
			if (directionTracker.transform.position.x > transform.position.x){//if the player is looking right while pressing right
				anim.SetBool ("walkback", false);
				anim.SetBool("walking", true);
			}
			else if (directionTracker.transform.position.x < transform.position.x) {//if the player is looking left while pressing right
				anim.SetBool ("walkback", true);
				anim.SetBool("walking", false);
			}
		}
		else if (verticalMove == 0 && horizontalMove < 0 && playerCollisionDetect.collision == 0){//if player presses left
			if (directionTracker.transform.position.x > transform.position.x){//if the player is looking right while pressing left
				anim.SetBool ("walkback", true);
				anim.SetBool("walking", false);
			}
			else if (directionTracker.transform.position.x < transform.position.x){//if the player is looking left while pressing left
				anim.SetBool ("walkback", false);
				anim.SetBool("walking", true);
			}
		}
		else{
			anim.SetBool ("walkback", false);
			anim.SetBool("walking", false);
		}
	}
	
	if (directionTracker.transform.position.z < transform.position.z && globalVariables.playerGrounded){//if player is looking down
		if (verticalMove > 0 && horizontalMove == 0 && playerCollisionDetect.collision == 0){//if player presses up
			anim.SetBool("walking", false);
			anim.SetBool ("walkback", true);
		}
		else if (verticalMove > 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses up and right
			anim.SetBool ("walkback", true);
			anim.SetBool("walking", false);
		}
		else if (verticalMove > 0 && horizontalMove <0 && playerCollisionDetect.collision == 0){//if player presses up and left
			anim.SetBool ("walkback", true);
			anim.SetBool("walking", false);
		}
		else if (verticalMove < 0 && horizontalMove == 0 && playerCollisionDetect.collision == 0){//if player presses down
			anim.SetBool ("walkback", false);
			anim.SetBool("walking", true);
		}
		else if (verticalMove < 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses down and right
			anim.SetBool ("walkback", false);
			anim.SetBool("walking", true);
		}
		else if (verticalMove < 0 && horizontalMove < 0 && playerCollisionDetect.collision == 0){//if player presses down and left
			anim.SetBool ("walkback", false);
			anim.SetBool("walking", true);
		}
		else if (verticalMove == 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses right
			if (directionTracker.transform.position.x > transform.position.x){//if the player is looking right while pressing right
				anim.SetBool ("walkback", false);
				anim.SetBool("walking", true);
			}
			else if (directionTracker.transform.position.x < transform.position.x) {//if the player is looking left while pressing right
				anim.SetBool ("walkback", true);
				anim.SetBool("walking", false);
			}
		}
		else if (verticalMove == 0 && horizontalMove < 0 && playerCollisionDetect.collision == 0){//if player presses left
			if (directionTracker.transform.position.x > transform.position.x){//if the player is looking right while pressing left
				anim.SetBool ("walkback", true);
				anim.SetBool("walking", false);
			}
			else if (directionTracker.transform.position.x < transform.position.x){//if the player is looking left while pressing left
				anim.SetBool ("walkback", false);
				anim.SetBool("walking", true);
			}
		}
		else{
			anim.SetBool ("walkback", false);
			anim.SetBool("walking", false);
		}
	}
}
else{//if speed has been upgraded, plays running animations
	if (directionTracker.transform.position.z > transform.position.z && globalVariables.playerGrounded){//if player is looking forward
		if (verticalMove > 0 && horizontalMove == 0 && playerCollisionDetect.collision == 0){//if player presses up
			anim.SetBool ("runback", false);
			anim.SetBool("running", true);
		}
		else if (verticalMove > 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses up and right
			anim.SetBool ("runback", false);
			anim.SetBool("running", true);
		}
		else if (verticalMove > 0 && horizontalMove <0 && playerCollisionDetect.collision == 0){//if player presses up and left
			anim.SetBool ("runback", false);
			anim.SetBool("running", true);
		}
		else if (verticalMove < 0 && horizontalMove == 0 && playerCollisionDetect.collision == 0){//if player presses down
			anim.SetBool("running", false);
			anim.SetBool ("runback", true);
		}
		else if (verticalMove < 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses down and right
			anim.SetBool("running", false);
			anim.SetBool ("runback", true);
		}
		else if (verticalMove < 0 && horizontalMove < 0 && playerCollisionDetect.collision == 0){//if player presses down and left
			anim.SetBool("running", false);
			anim.SetBool ("runback", true);
		}
		else if (verticalMove == 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses right
			if (directionTracker.transform.position.x > transform.position.x){//if the player is looking right while pressing right
				anim.SetBool ("runback", false);
				anim.SetBool("running", true);
			}
			else if (directionTracker.transform.position.x < transform.position.x) {//if the player is looking left while pressing right
				anim.SetBool("running", false);
				anim.SetBool ("runback", true);
			}
		}
		else if (verticalMove == 0 && horizontalMove < 0 && playerCollisionDetect.collision == 0){//if player presses left
			if (directionTracker.transform.position.x > transform.position.x){//if the player is looking right while pressing left
				anim.SetBool("running", false);
				anim.SetBool ("runback", true);
			}
			else if (directionTracker.transform.position.x < transform.position.x){//if the player is looking left while pressing left
				anim.SetBool ("runback", false);
				anim.SetBool("running", true);
			}
		}
		else{
			anim.SetBool ("runback", false);
			anim.SetBool("running", false);
		}
	}
	
	if (directionTracker.transform.position.z < transform.position.z && globalVariables.playerGrounded){//if player is looking down
		if (verticalMove > 0 && horizontalMove == 0 && playerCollisionDetect.collision == 0){//if player presses up
			anim.SetBool("running", false);
			anim.SetBool ("runback", true);
		}
		else if (verticalMove > 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses up and right
			anim.SetBool("running", false);
			anim.SetBool ("runback", true);
		}
		else if (verticalMove > 0 && horizontalMove <0 && playerCollisionDetect.collision == 0){//if player presses up and left
			anim.SetBool("running", false);
			anim.SetBool ("runback", true);
		}
		else if (verticalMove < 0 && horizontalMove == 0 && playerCollisionDetect.collision == 0){//if player presses down
			anim.SetBool ("runback", false);
			anim.SetBool("running", true);
		}
		else if (verticalMove < 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses down and right
			anim.SetBool ("runback", false);
			anim.SetBool("running", true);
		}
		else if (verticalMove < 0 && horizontalMove < 0 && playerCollisionDetect.collision == 0){//if player presses down and left
			anim.SetBool ("runback", false);
			anim.SetBool("running", true);
		}
		else if (verticalMove == 0 && horizontalMove > 0 && playerCollisionDetect.collision == 0){//if player presses right
			if (directionTracker.transform.position.x > transform.position.x){//if the player is looking right while pressing right
				anim.SetBool ("runback", false);
				anim.SetBool("running", true);
			}
			else if (directionTracker.transform.position.x < transform.position.x) {//if the player is looking left while pressing right
				anim.SetBool("running", false);
				anim.SetBool ("runback", true);				
			}
		}
		else if (verticalMove == 0 && horizontalMove < 0 && playerCollisionDetect.collision == 0){//if player presses left
			if (directionTracker.transform.position.x > transform.position.x){//if the player is looking right while pressing left
				anim.SetBool("running", false);
				anim.SetBool ("runback", true);
			}
			else if (directionTracker.transform.position.x < transform.position.x){//if the player is looking left while pressing left
				anim.SetBool ("runback", false);
				anim.SetBool("running", true);
			}
		}
		else{
			anim.SetBool ("runback", false);
			anim.SetBool("running", false);
		}
	}
}

}//end update function

function Attack1(){
	anim.SetBool("combo1", true);
}
function Attack2(){
	anim.SetBool("combo2", true);
}
function Attack3(){
	anim.SetBool("combo3", true);
}


function WaitForSwing(){

	swinging = true;
	yield WaitForSeconds(0.6);
	swinging = false;

}

function WaitForStep(){

	stepping = true;
		if (globalVariables.speedUpgrade == 1){
			if (anim.GetBool("walking")){
				yield WaitForSeconds(0.5);
			}
			else{
				yield WaitForSeconds(0.4);
			}
		}
		else if (globalVariables.speedUpgrade == 2){
			if (anim.GetBool("running")){
				yield WaitForSeconds(0.4);
			}
			else {
				yield WaitForSeconds(0.3);
			}
		}
		else if (globalVariables.speedUpgrade == 3){
			if (anim.GetBool("running")){
				yield WaitForSeconds(0.4);
			}
			else{
				yield WaitForSeconds(0.3);
			}
		}
	
	stepping = false;

}