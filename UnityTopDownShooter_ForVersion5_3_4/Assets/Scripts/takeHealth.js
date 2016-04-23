#pragma strict
var readyNow : boolean = true;
var blood : GameObject;//blood prefab
private var player : GameObject;
var hitSound : AudioClip;

function Start(){
	player = gameObject.Find("player");
}

function OnTriggerEnter (col : Collider){

	if (col.gameObject.name == "player" && readyNow == true){
		globalVariables.health -= 20;
		Instantiate(blood,Vector3(player.transform.position.x,player.transform.position.y + 1, player.transform.position.z), transform.rotation);
		AudioSource.PlayClipAtPoint(hitSound,transform.position, 0.2);
		Wait();

	}

}




function Wait(){
	readyNow = false;
	yield WaitForSeconds(2);
	readyNow = true;
}