#pragma strict

//this healthbar script is strictly for use with melee enemies who use the script "EnemyAIMage"!!!!!!!

var parent : GameObject;//used to assign health bar to specific enemy

function Start () {
}

function Update () {

	if (parent != null){
		transform.position.x = parent.transform.position.x;
		transform.position.y = parent.transform.position.y + 2.5;
		transform.position.z = parent.transform.position.z;
		transform.localScale.x = ((parent.GetComponent(EnemyAIRanged01).health)/0.2) * 0.025;
		
		if (parent.GetComponent(EnemyAIRanged01).inCombat == false){//makes object disappear if character is not in combat
			GetComponent(MeshRenderer).enabled = false;
		}
		else{
			GetComponent(MeshRenderer).enabled = true;
		}
	}
	else {
		GameObject.Destroy(gameObject);
	}

	

}