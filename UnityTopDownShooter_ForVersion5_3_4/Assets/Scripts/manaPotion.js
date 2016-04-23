﻿#pragma strict
var player : GameObject;
var soundToPlay : AudioClip;

function Start(){
	player = gameObject.Find("player");
}

function Update(){
 	
 	var distanceFromPlayer : float = Vector3.Distance (player.transform.position, transform.position);

	if (distanceFromPlayer < 7){
		transform.position = Vector3.MoveTowards (transform.position, Vector3(player.transform.position.x,player.transform.position.y + 1.5,player.transform.position.z), Time.deltaTime * 12);
	}

}

function OnCollisionEnter(col : Collision){

	if (col.gameObject.name == "player"){
		AudioSource.PlayClipAtPoint(soundToPlay, transform.position);
		globalVariables.mana += 25;
		Destroy(gameObject);
	}

}