#pragma strict

private var player : GameObject;

//GUI variables
var xHealth : float = 0;//x distance from screen edge
var yHealth : float = 0;//y distance from screen edge

var xMana : float = 0;
var yMana : float = 0;

var xStamina : float = 0;
var yStamina : float = 0;

var readyNow : boolean = true; //used for mana regen delay

var crosshair : Texture2D; // crosshair texture
var cursorSizeX : int = 64;// crosshair size x
var cursorSizeY : int = 64;// crosshair size y
//GUI variables


//more GUI variables
var healthBarStyle : GUIStyle;
var manaBarStyle : GUIStyle;
var emptyBarStyle : GUIStyle;
var staminaBarStyle : GUIStyle;
var portraitStyle : GUIStyle;
var soulFilamentsStyle : GUIStyle;

var pauseX : int = 1024;//pause menu's width
var pauseY : int = 768;//pause menu's height

var pauseMenuStyle : GUIStyle;
var smallerFontStyle : GUIStyle; //used for smaller font on the GUI

var swordIcon : Texture2D;//textures used to display inventory
var shieldIcon : Texture2D;
var staffIcon : Texture2D;
var emptyIcon : Texture2D;

///////////////////

//upgrade variables
var healthCost : int = 0;
var manaCost : int = 0;
var speedCost : int = 0;
var bulletCost : int = 0;

//weaponswitch variables
var sword : GameObject;
var staff : GameObject;
var scabbard : GameObject;
var scabbardEmpty : GameObject;
var staffBack : GameObject;

var shield : GameObject;

var weaponSwitch : AudioClip;
//

var waitForRegen : boolean = true;//used to delay mana regen so that it is dependant on time and not fps
var waitForStaminaRegen : boolean = true;

function Start () {

	Cursor.visible = false; //hides windows cursor
	player = gameObject.Find("player");

}

function OnGUI () {
//draws three bars, one for mana, one for health, and one for stamina - each bar varies in length depending on how far upgraded they are
	//health bars
	if (globalVariables.healthUpgrade == 1){
		GUI.Box (new Rect (xHealth-2, yHealth-2, (Screen.width / 5) + 4, 24), " ", emptyBarStyle);
		GUI.Box (new Rect (xHealth, yHealth, Screen.width / 5 / (globalVariables.maxHealth / globalVariables.health), 20), " " + globalVariables.health/*globalVariables.health + "/" + globalVariables.maxHealth*/, healthBarStyle);
	}
	else if (globalVariables.healthUpgrade == 2){
		GUI.Box (new Rect (xHealth-2, yHealth-2, (Screen.width / 4) + 4, 24), " ", emptyBarStyle);
		GUI.Box (new Rect (xHealth, yHealth, Screen.width / 4 / (globalVariables.maxHealth / globalVariables.health), 20), " " + globalVariables.health/*globalVariables.health + "/" + globalVariables.maxHealth*/, healthBarStyle);
	}
	else if (globalVariables.healthUpgrade == 3){
		GUI.Box (new Rect (xHealth-2, yHealth-2, (Screen.width / 3) + 4, 24), " ", emptyBarStyle);
		GUI.Box (new Rect (xHealth, yHealth, Screen.width / 3 / (globalVariables.maxHealth / globalVariables.health), 20), " " + globalVariables.health/*globalVariables.health + "/" + globalVariables.maxHealth*/, healthBarStyle);
	}
	
	//mana bars
	if (globalVariables.manaUpgrade == 1){
		GUI.Box (new Rect (xMana-2, yMana-2, (Screen.width / 5) + 4, 24), " ", emptyBarStyle);
		GUI.Box (new Rect (xMana, yMana, Screen.width / 5 / (globalVariables.maxMana / globalVariables.mana), 20), " " + globalVariables.mana /*globalVariables.mana + "/" + globalVariables.maxMana*/, manaBarStyle);
	}
	else if (globalVariables.manaUpgrade == 2){
		GUI.Box (new Rect (xMana-2, yMana-2, (Screen.width / 4) + 4, 24), " ", emptyBarStyle);
		GUI.Box (new Rect (xMana, yMana, Screen.width / 4 / (globalVariables.maxMana / globalVariables.mana), 20), " " + globalVariables.mana /*globalVariables.mana + "/" + globalVariables.maxMana*/, manaBarStyle);
	}
	else if (globalVariables.manaUpgrade == 3){
		GUI.Box (new Rect (xMana-2, yMana-2, (Screen.width / 3) + 4, 24), " ", emptyBarStyle);
		GUI.Box (new Rect (xMana, yMana, Screen.width / 3 / (globalVariables.maxMana / globalVariables.mana), 20), " " + globalVariables.mana /*globalVariables.mana + "/" + globalVariables.maxMana*/, manaBarStyle);
	}
	
	//stamina bar
	GUI.Box (new Rect (xStamina, yStamina, Screen.width / 10 / (globalVariables.maxStamina / globalVariables.stamina), 5), " " /*globalVariables.mana + "/" + globalVariables.maxMana*/, staminaBarStyle);
	//
	
	//soul filaments
	GUI.Box (new Rect(132,96,16,16), " ", soulFilamentsStyle);
	GUI.Label (Rect(148,94,100,20), " " + globalVariables.soulFilaments);
	
	//character portrait
	GUI.Box(new Rect(5,5,128,128), "", portraitStyle);
//bars end here

//pause menu
if (globalVariables.paused == true){
		/////////////////////////////////////////////////////
		GUI.BeginGroup (new Rect(Screen.width/2 - (pauseX/2), Screen.height/2 - (pauseY/2), pauseX,pauseY));//perfectly centers the group
		GUI.Box (new Rect(0,0,pauseX,pauseY), "- Paused -", pauseMenuStyle);//draws box to represent group
		
		
			///////////////////////////////////////////////new group for basic pause menu buttons
			GUI.BeginGroup(new Rect(Screen.width/2 - (pauseX/2) - 65,38,260,138));
			GUI.Box(new Rect(0,0,300,138), " ");
			if (GUI.Button(Rect(2, 2, 256,32), "Resume")){
				globalVariables.paused = false;
				Time.timeScale = 1;
			}
			
			if (GUI.Button(Rect(2, 36, 256,32), "Save")){
				globalVariables.paused = false;
				Time.timeScale = 1;
			}
			
			if (GUI.Button(Rect(2, 70, 256,32), "Load")){
				globalVariables.paused = false;
				Time.timeScale = 1;
			}
			
			if (GUI.Button(Rect(2, 104, 256,32), "Quit")){
				Application.Quit();
			}
			GUI.EndGroup();
			///////////////////////////////////////////////////////////////////////////
			
			
			//////////////////////////////Group for QUEST LOG//////////////
			GUI.BeginGroup(new Rect (64, 184, pauseX - 128, 200));
			GUI.Box(new Rect(0,0,pauseX-128, 200), "The Journey Thus Far...");
			GUI.EndGroup();
			////////////////////////////////////////////////////////////////
			
			
			//////////////group for UPGRADES///////////////////////////////////////
			GUI.BeginGroup(new Rect(64,395, 560,300));
			GUI.Box(new Rect(0,0,560,300), "Upgrades");
				//upgrade lables
				GUI.Label(Rect(12,32,128,30), "Health: " + globalVariables.healthUpgrade + "/3");
				GUI.Label(Rect(12,82,128,30), "Mana: " + globalVariables.manaUpgrade + "/3");
				GUI.Label(Rect(12,132,128,30), "Spellpower: " + globalVariables.bulletUpgrade + "/3");
				GUI.Label(Rect(12,182,128,30), "Speed: " + globalVariables.speedUpgrade + "/3");
				GUI.Label(Rect(205,240, 128, 30), "Points Available: " + globalVariables.upgradePoints);
				GUI.Label(Rect(5, 270, 300, 30), "Soul Filaments to next point: " + globalVariables.soulFilaments + "/1000");	
			
				//upgrade buttons
				if (globalVariables.healthUpgrade != 3 && globalVariables.upgradePoints >= healthCost){	
					if (GUI.Button(Rect(105,32,20,20),"+")){//upgrade health
						globalVariables.upgradePoints -= healthCost;
						globalVariables.healthUpgrade++;
					}
				}
				else{
					if (GUI.Button(Rect(105,32,20,20)," ")){
						}
				}
				
				
				if (globalVariables.manaUpgrade !=3 && globalVariables.upgradePoints >= manaCost){
					if (GUI.Button(Rect(105,82,20,20),"+")){//upgrade mana
						globalVariables.upgradePoints -= manaCost;
						globalVariables.manaUpgrade++;
					}
				}
				else{
					if (GUI.Button(Rect(105,82,20,20)," ")){
					}
				}
				
				
				
				if (globalVariables.bulletUpgrade !=3 && globalVariables.upgradePoints >= bulletCost){
					if (GUI.Button(Rect(105,132,20,20),"+")){//upgrade spellpower
						globalVariables.upgradePoints -= bulletCost;
						globalVariables.bulletUpgrade++;
					}
				}
				else{
					if (GUI.Button(Rect(105,132,20,20)," ")){
					}
				}
				
				
				
				
				if (globalVariables.speedUpgrade !=3 && globalVariables.upgradePoints >= speedCost){
					if (GUI.Button(Rect(105,182,20,20),"+")){//upgrade speed
						globalVariables.upgradePoints -= speedCost;
						globalVariables.speedUpgrade++;
					}
				}
				else{
					if (GUI.Button(Rect(105,182,20,20)," ")){
					}	
				}
				
				/*GUI Scrollview, perhaps for future reference
				GUI.BeginScrollView(Rect (152, 24, 400, 40), Vector2.zero, Rect (0, 0, 300, 300));
				GUI.TextArea(Rect(0,0,399,399), "You are inexperienced and fragile. Your armor helps you little. Upgrade to expand your life energy. (Cost: 2 points)");
				GUI.EndScrollView();
				*/
				
				//description
				//health
				if (globalVariables.healthUpgrade == 1){
					GUI.Label(Rect(152,22,400,64), "You are inexperienced and fragile. Your armor helps you little. Upgrade to expand your life energy. (Cost: 2 points)", smallerFontStyle);
				}
				if (globalVariables.healthUpgrade == 2){
					GUI.Label(Rect(152,22,400,64), "You have braved the dangers of Mount Izr'ah. Experience works in your favour as your body adapts to the harshness of the mountains. Upgrade to further expand your life energy. (Cost: 4 points)", smallerFontStyle);
						
				}
				if (globalVariables.healthUpgrade == 3){
					GUI.Label(Rect(152,22,400,64), "Your hunt for the Necromancer has rendered you a master of survival. Nothing fazes you any longer. You have reached the peak of your health, as you have reached the peaks of many mountains, and depths of many dungeons, time and time again.", smallerFontStyle);	
				}
				//mana
				if (globalVariables.manaUpgrade == 1){
					GUI.Label(Rect(152,73,400,64), "A young mage, eager in your search for the Necromancer, your mana reserves are limited. Many have told you that you have more, locked away within you. That it runs in your blood. Upgrade to unlock this potential. (Cost: 2 points)", smallerFontStyle);
				}
				if (globalVariables.manaUpgrade == 2){
					GUI.Label(Rect(152,73,400,64), "Time has made you wise. And with wisdom comes knowledge of the arcane. Your potential has been unlocked, but there is more within you, you can sense it beating in your bosom, from the inside out, wanting to be let out. Upgrade to see your true power. (Cost: 4 points)", smallerFontStyle);
				}
				if (globalVariables.manaUpgrade == 3){
					GUI.Label(Rect(152,73,400,64), "Together with knowledge, time, and natural talent, you have become a master at controlling your inner reserves of mana. Few, if any mages have ever reached such a level. The Necromancer, it is told, was born with his powers unlocked. How will he compare?", smallerFontStyle);
				}
				//spellpower
				if (globalVariables.bulletUpgrade == 1){
					GUI.Label(Rect(152,128,400,64), "Taken away from your training at a young age, your skills are rudimentary at best, your technique incomplete. This will not do. Upgrade to prepare yourself for the battle ahead. (Cost: 2 points)", smallerFontStyle);
				}
				if (globalVariables.bulletUpgrade == 2){
					GUI.Label(Rect(152,128,400,64), "You have taken the time to train yourself. Your near death experiences in combat have given you an edge that no training ever could. But it is not yet complete. Upgrade to reach the limit of your power. (Cost: 4 points)", smallerFontStyle);
				}
				if (globalVariables.bulletUpgrade == 3){
					GUI.Label(Rect(152,128,400,64), "A master wizard, no creature can stand before your spells. Legends are told about the ferocity of your relentless attacks, and none have matched the pure unbridled power of your energy bolts. The Necromancer shall be the final test.", smallerFontStyle);
				}
				//speed
				if (globalVariables.speedUpgrade == 1){
					GUI.Label(Rect(152,180,400,64), "Fear stiffens your limbs. The sight of a reanimated Skeleton terrifies you. Every step in the dark could be a step towards death. Upgrade to shed your fears and run. (Cost : 2 points)", smallerFontStyle);
				}
				if (globalVariables.speedUpgrade == 2){
					GUI.Label(Rect(152,180,400,64), "Realizing that a mere corpse cannot kill you, that you are much too quick to fall to a trap, much too powerful to lose to a minion of the Necromancer, your limbs are liberated. You feel confident in your speed, and are not afraid to run.", smallerFontStyle);
				}
				if (globalVariables.speedUpgrade == 3){
					GUI.Label(Rect(152,180,400,64), "Your very steps are infused with magic. You move so fast your enemies can barely keep up. Legends spread about you, saying you fly through the skies and that you strike before you are seen. Will the Necromancer see you coming, you wonder...", smallerFontStyle);
				}
			GUI.EndGroup();
			/////////////////////////////////////////////////////////////////////
			
			
			/////////////////////////Group for items/////////////////
			GUI.BeginGroup(new Rect(630, 395, 330, 300));
			GUI.Box(new Rect(0,0,330,300), "Items Recovered");
			
				GUI.Label(Rect(12,20,64,64), staffIcon);//draws staff icon no matter what - it's default weapon
				GUI.Label (Rect(80, 30, 250,64), "Family Staff : The staff of your father, and his father before him, this weapon holds great power that you have dedicated your entire life to unleashing.", smallerFontStyle);


				if (globalVariables.swordUpgrade == true){//checks if found sword
					GUI.Label(Rect(12,90,64,64), swordIcon);
					GUI.Label (Rect(80, 78, 250,64), "The Sword of Irazul : A simple steel sword with a not so simple history. It has been passed down through your family for generations, and now it has finally been found. Forged of steel, and the bones of a necromancer, making it particularly deadly against skeletons.", smallerFontStyle);
				}
				else{
					GUI.Label(Rect(12,90,64,64), emptyIcon);
					GUI.Label (Rect(80, 107, 250,64), "Empty Slot : Your hands ache for what has been lost, for what is rightfully yours.", smallerFontStyle);

				}
				
				if (globalVariables.shieldUpgrade == true){//checks if found shield
					GUI.Label(Rect(12,162,64,64), shieldIcon);
					GUI.Label (Rect(80, 164, 250,64), "Ancient Shield : An ancient shield infused with magic. It has belonged to your family for generations, but naught is known about it or its origins. All that is known, is that it alleviates magical damage, and physical damage alike.", smallerFontStyle);

				}
				else{
					GUI.Label(Rect(12,162,64,64), emptyIcon);
					GUI.Label (Rect(80, 176, 250,64), "Empty Slot : You feel vulnerable against attacks from all angles.", smallerFontStyle);

				}
				
				if (globalVariables.necklaceUpgrade == true){//checks if found necklace
					GUI.Label(Rect(12,234,64,64), emptyIcon);
					GUI.Label (Rect(80, 233, 250,64), "Enchanted Necklace : You found this in some catacombs. Something about it makes you uneasy, however something about it also makes you more powerful. Sometimes, you think you can hear it whispering.", smallerFontStyle);

				}
				else{
					GUI.Label(Rect(12,234,64,64), emptyIcon);
					GUI.Label (Rect(80, 246, 250,64), "Empty Slot : You feel as though your arsenal is not yet complete. You hear a voice from within the mountain, calling your name.", smallerFontStyle);

				}

			GUI.EndGroup();
			////////////////////////////////////////////////////////
			
		GUI.EndGroup();	
		////////////////////////////////////////////////////////	
}

//draws custom crosshair
	GUI.DrawTexture (Rect(Event.current.mousePosition.x-cursorSizeX/2, Event.current.mousePosition.y-cursorSizeY/2, cursorSizeX, cursorSizeY), crosshair);

}


function Update () {

	//pause and unpause game
	if (Input.GetButtonDown("pause")){
		if (globalVariables.paused == false){
			globalVariables.paused = true;
			Time.timeScale = 0;
		}
		else{
			globalVariables.paused = false;
			Time.timeScale = 1;
		}
	}
	
if (globalVariables.alive == true){//only executes if the player is alive
	//weapon switching
	if (globalVariables.swordUpgrade == true){
		if (Input.GetButtonDown("weaponswitch") && globalVariables.swordUpgrade == true){
			if (globalVariables.currentWeapon == false){//switch to sword
				globalVariables.currentWeapon = true;
				sword.active = true;
				staff.active = false;
				scabbard.active = false;
				scabbardEmpty.active = true;
				staffBack.active = true;
				
				AudioSource.PlayClipAtPoint(weaponSwitch, player.transform.position, 0.5);
				
			}
			else{//switch to staff
				globalVariables.currentWeapon = false;
				sword.active = false;
				staff.active = true;
				scabbard.active = true;
				scabbardEmpty.active = false;
				staffBack.active = false;
				
				AudioSource.PlayClipAtPoint(weaponSwitch, player.transform.position, 0.5);
				
			}
		}
	}
	else {
		
		globalVariables.currentWeapon = false;
		sword.active = false;
		staff.active = true;
		scabbard.active = false;
		scabbardEmpty.active = false;
		staffBack.active = false;
	
	}
	
	if (globalVariables.shieldUpgrade == true){
		shield.active = true;
	}
	else{
		shield.active = false;
	}
}		

	//set max mana based on upgrade level
	if (globalVariables.manaUpgrade == 1 && globalVariables.necklaceUpgrade == false){
		globalVariables.maxMana = 100;
	}
	else if (globalVariables.manaUpgrade == 2 && globalVariables.necklaceUpgrade == false){
		globalVariables.maxMana = 140;
	}
	else if (globalVariables.manaUpgrade == 3 && globalVariables.necklaceUpgrade == false){
		globalVariables.maxMana = 200;
	}
	else if (globalVariables.manaUpgrade == 1 && globalVariables.necklaceUpgrade == true){
		globalVariables.maxMana = 115;
	}
	else if (globalVariables.manaUpgrade == 2 && globalVariables.necklaceUpgrade == true){
		globalVariables.maxMana = 155;
	}
	else if (globalVariables.manaUpgrade == 3 && globalVariables.necklaceUpgrade == true){
		globalVariables.maxMana = 230;
	}
	
	//set max health based on upgrade level
	if (globalVariables.healthUpgrade == 1){
		globalVariables.maxHealth = 100;	
	}
	if (globalVariables.healthUpgrade == 2){
		globalVariables.maxHealth = 140;	
	}
	if (globalVariables.healthUpgrade == 3){
		globalVariables.maxHealth = 200;
	}
	
	//set movement speed based on upgrade level
	if (globalVariables.speedUpgrade == 1){
		globalVariables.speed = 6;	
	}
	if (globalVariables.speedUpgrade == 2){
		globalVariables.speed = 7;	
	}
	if (globalVariables.speedUpgrade == 3){
		globalVariables.speed = 8;
	}
	
	//upgrade points
	if (globalVariables.soulFilaments > 999){
		globalVariables.upgradePoints ++;
		globalVariables.soulFilaments = 0;
	}
	
				//calculates upgrade costs
			if (globalVariables.healthUpgrade == 1){
				healthCost = 2;
			}
			if (globalVariables.healthUpgrade == 2){
				healthCost = 4;
			}
				
			if (globalVariables.manaUpgrade == 1){
				manaCost = 2;
			}
			if (globalVariables.manaUpgrade == 2){
				manaCost = 4;
			}
			
			if (globalVariables.bulletUpgrade == 1){
				bulletCost = 2;
			}
			if (globalVariables.bulletUpgrade == 2){
				bulletCost = 4;
			}
			
			if (globalVariables.speedUpgrade == 1){
				speedCost = 2;
			}
			if (globalVariables.speedUpgrade == 2){
				speedCost = 4;
			}
			
			
	//mana regen and rounding off decimal place (only if game is unpaused)
	if (globalVariables.paused == false){
		if (globalVariables.mana < globalVariables.maxMana && waitForRegen == true){
			WaitForRegen();//basic waitforseconds function
			globalVariables.mana += 0.8;
		}
		globalVariables.mana = Mathf.Round(globalVariables.mana * 100f) / 100f; // rounds off mana to one decimal place
	
		//stamina regen
		if (globalVariables.stamina < globalVariables.maxStamina && waitForStaminaRegen == true){
			WaitForStaminaRegen();
			globalVariables.stamina += 0.05;
		}
	}

}

function WaitForRegen(){
	waitForRegen = false;
	yield WaitForSeconds(0.05);
	waitForRegen = true;
}

function WaitForStaminaRegen(){
	waitForStaminaRegen = false;
	yield WaitForSeconds(0.005);
	waitForStaminaRegen = true;
}