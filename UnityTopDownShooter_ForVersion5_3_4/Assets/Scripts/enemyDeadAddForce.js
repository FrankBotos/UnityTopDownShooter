#pragma strict

function Start () {
	var force : float = Random.Range(100, 400);//generates random number
	GetComponent.<Rigidbody>().AddForce(Vector3(0,force,0));
}

function Update () {

}