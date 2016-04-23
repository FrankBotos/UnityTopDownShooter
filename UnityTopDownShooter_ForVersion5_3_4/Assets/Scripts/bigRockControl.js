#pragma strict

//distance to stop running: 147

private var player : GameObject;

private var animControl : playerController;

var rockFalling : boolean = false;

var originalSpeed : int;

function Start () {

	player = gameObject.Find("player");
	animControl = player.GetComponent("playerController");

}

function Update () {

	var distance : float = Vector3.Distance (player.transform.position, transform.position);
	
	if (distance < 5 && rockFalling == false){
	
		
		originalSpeed = globalVariables.speedUpgrade;
		globalVariables.speedUpgrade = 3;
		rockFalling = true;
	
	}
	
	if (rockFalling == true && distance > 134){
		
		globalVariables.speedUpgrade = originalSpeed;
		animControl.anim.SetBool("running", false);
		animControl.anim.SetBool("runback", false);
		Destroy(gameObject);

	}
}