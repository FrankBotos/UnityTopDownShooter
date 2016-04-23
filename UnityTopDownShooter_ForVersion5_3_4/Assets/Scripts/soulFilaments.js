#pragma strict

private var speed : float = 0.1;
var player : GameObject;

var timeToWait : float = 0;
var waited : boolean = false;

function Start () {
	player = gameObject.Find("player");
	timeToWait = Random.Range (0.25, 1);	
}

function Update () {

	var distanceFromPlayer : float = Vector3.Distance (player.transform.position, transform.position);

		if (waited == false){
			Wait();
		}
		if (waited == true){
			GetComponent.<Rigidbody>().useGravity = false;
			speed += 0.02;
			transform.position = Vector3.MoveTowards (transform.position, Vector3(player.transform.position.x,player.transform.position.y + 1.25,player.transform.position.z), Time.deltaTime * (globalVariables.speed + speed));
		}

}

function OnCollisionEnter(col : Collision){
	if (col.gameObject.name == "player"){
		globalVariables.soulFilaments += Random.Range(8,15);
		Destroy(gameObject);
	}
}

function Wait(){
	yield WaitForSeconds(timeToWait);
	waited = true;
}