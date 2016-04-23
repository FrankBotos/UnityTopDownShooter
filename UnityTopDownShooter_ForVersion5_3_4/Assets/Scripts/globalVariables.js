#pragma strict

//health, mana, speed and all player attributes

static var alive : boolean = true;

static var health : int = 100;
static var maxHealth : int = 100;
static var mana : float = 100;
static var maxMana : float = 100;
static var manaCost : float = 1.4;
static var stamina : float = 1;
static var staminaCost : float = 0.9;
static var maxStamina : float = 1;
static var playerGrounded : boolean = false;//boolean to check wether the player is in the air or grounded

static var soulFilaments : int = 900;

static var bulletSpeed : float = 2000;

static var speed : int = 7;

static var paused : boolean = false;

//upgrades
static var upgradePoints : int = 12;
static var bulletUpgrade : int = 1;
static var speedUpgrade : int = 1;
static var manaUpgrade : int = 1;
static var healthUpgrade : int = 1;

//findable upgrades
static var shieldUpgrade : boolean = false;
static var swordUpgrade : boolean = true;
static var necklaceUpgrade : boolean = false;
//weapon slot
static var currentWeapon : boolean = false; //used to represent the two weapons in the game - false = staff, true = sword

function Start () {

}

function Update () {

}