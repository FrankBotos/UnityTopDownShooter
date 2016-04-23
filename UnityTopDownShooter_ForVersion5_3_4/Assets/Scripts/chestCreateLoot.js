#pragma strict

private var randomLoot : boolean = true;
var healthPotion : GameObject;
var manaPotion : GameObject;
private var generatedLoot : boolean = false;
var boxTop : GameObject;

var player : GameObject;

var soulFilaments : GameObject;


function Start () {
	player = gameObject.Find("player");
}

function Update () {
	
	//turns revealing light on and off
	var distanceFromPlayer : float = Vector3.Distance (player.transform.position, transform.position);
	if (distanceFromPlayer < 12 && !generatedLoot){
		gameObject.GetComponent.<Light>().enabled = true;
	}
	else{
		gameObject.GetComponent.<Light>().enabled = false;
	}

	//generating loot if the container is opened, either randomly or predetermined depending on the variabe randomLoot;
	if (randomLoot && generatedLoot == false && boxTop.transform.localRotation.x < (-0.3)){
		var randomNum : int = Random.Range(1, 3); //generates random number
			if (randomNum == 1){
			//generate potion
			Instantiate (healthPotion, transform.position, transform.rotation);
			}
			else if (randomNum == 2){
			//generate potion
			Instantiate (manaPotion, transform.position, transform.rotation);
			}
			
		//adds soul filaments	
		Instantiate (soulFilaments, transform.position, transform.rotation);
			
			generatedLoot = true;
	}

}