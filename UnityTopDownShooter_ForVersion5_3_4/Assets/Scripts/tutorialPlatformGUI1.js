#pragma strict

var player : GameObject;
var tutorialState : int = 0;
var shownTutorial : boolean = false;
var tutorialStyle : GUIStyle;
var distanceToDisplayMessage : float = 0;

function Start(){
	player = gameObject.Find("player");
}

function Update(){

	var distance : float = Vector3.Distance(player.transform.position, transform.position);
	Debug.Log(distance);
	
	if (distance < distanceToDisplayMessage && shownTutorial == false){
		tutorialState = 1;
	}

}

function OnGUI(){

	if (tutorialState == 1){
		GUI.BeginGroup(new Rect(Screen.width/2 - 512, Screen.height/1.5, 1024, 256));
			GUI.Box(new Rect(0,0,1024,256), " ", tutorialStyle);
			GUI.Box(new Rect(50,35,924,156), "If there is an obstacle in your way and it won't budge, try and jump over it. Beware of fire and other hazards!");
			if (GUI.Button(Rect(512-64,195,64,32),"Okay")){
				shownTutorial = true;
				tutorialState = 0;
			}
		GUI.EndGroup();
	}

}