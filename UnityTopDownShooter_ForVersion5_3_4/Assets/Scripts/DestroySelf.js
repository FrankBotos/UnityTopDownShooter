#pragma strict

var secondsToWait : float = 5;

function Start () {

yield WaitForSeconds (secondsToWait);
Destroy (gameObject);

}