#pragma strict

var player : GameObject;

function Start () {

	player = gameObject.Find("player");

}

function Update () {

	transform.position.x = player.transform.position.x;
	transform.position.y = player.transform.position.y + 1;
	transform.position.z = player.transform.position.z;

}