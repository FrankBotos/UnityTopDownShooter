#pragma strict

var tutorialProgress : int = 0;
var tutorialStyle : GUIStyle;

function Start () {

	tutorialProgress = 1;

}

function OnGUI (){
	
	//intro tutorial
	if (tutorialProgress == 1){
		GUI.BeginGroup(new Rect(Screen.width/2 - 512, Screen.height/1.5, 1024, 256));
			GUI.Box(new Rect(0,0,1024,256), " ", tutorialStyle);
			GUI.Box(new Rect(50,35,924,156), "To move, use W-A-S-D. And to jump, use Space.");
			if (GUI.Button(Rect(512-64,195,64,32),"Okay")){
				tutorialProgress++;
			}
		GUI.EndGroup();
	}
	
	if (tutorialProgress == 2){
		GUI.BeginGroup(new Rect(Screen.width/2 - 512, Screen.height/1.5, 1024, 256));
			GUI.Box(new Rect(0,0,1024,256), " ", tutorialStyle);
			GUI.Box(new Rect(50,35,924,156), "To fight, hold down the left mouse button. To dodge, right click. Time your enemies' attacks, and get out of the way!");
			if (GUI.Button(Rect(512-64,195,64,32),"Okay")){
				tutorialProgress++;
			}
		GUI.EndGroup();
	}
	
	if (tutorialProgress == 3){
		GUI.BeginGroup(new Rect(Screen.width/2 - 512, Screen.height/1.5, 1024, 256));
			GUI.Box(new Rect(0,0,1024,256), " ", tutorialStyle);
			GUI.Box(new Rect(50,35,924,156), "In the top left, the red bar represents your life force. The blue bar is your mana.");
			if (GUI.Button(Rect(512-64,195,64,32),"Okay")){
				tutorialProgress++;
			}
		GUI.EndGroup();
	}
	
	if (tutorialProgress == 4){
		GUI.BeginGroup(new Rect(Screen.width/2 - 512, Screen.height/1.5, 1024, 256));
			GUI.Box(new Rect(0,0,1024,256), " ", tutorialStyle);
			GUI.Box(new Rect(50,35,924,156), "The blue crystal shows your Soul Filaments. For every thousand you collect, you will be awarded a new upgrade point. Enemies and chests drop them.");
			if (GUI.Button(Rect(512-64,195,64,32),"Okay")){
				tutorialProgress++;
			}
		GUI.EndGroup();
	}
			
		if (tutorialProgress == 5){
		GUI.BeginGroup(new Rect(Screen.width/2 - 512, Screen.height/1.5, 1024, 256));
			GUI.Box(new Rect(0,0,1024,256), " ", tutorialStyle);
			GUI.Box(new Rect(50,35,924,156), "Press the ESC key to see the pause menu. Here you will find useful information.");
			if (GUI.Button(Rect(512-64,195,64,32),"Okay")){
				tutorialProgress++;
			}
		GUI.EndGroup();
	}
	//intro tutorial ends

}