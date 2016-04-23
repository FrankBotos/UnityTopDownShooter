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
			GUI.Box(new Rect(50,35,924,156), "Certain obstacles may be poorly constructed. Such obsticles will easily give way to your spells. Experiment to see which obstacles are vulnerable!");
			if (GUI.Button(Rect(512-64,195,64,32),"Okay")){
				shownTutorial = true;
				tutorialState = 0;
			}
		GUI.EndGroup();
	}

}