#pragma strict

private var player : GameObject;

static var collision = 0;//1 = right, 2 = left, 3 = up, 4 = down, 5 = down/left, 6 = down/right, 7 = up and left, 8 = up and right

function Start(){
	player = gameObject.Find("player");
}

function Update () {

	gameObject.transform.position.x = player.transform.position.x;
	gameObject.transform.position.y = player.transform.position.y+0.1;
	gameObject.transform.position.z = player.transform.position.z;

	if (Input.GetAxis("vertical") > 0 && Input.GetAxis("horizontal") == 0){//up
		var forward = transform.TransformDirection (Vector3.forward);
		var forwardHit : RaycastHit;
		Debug.DrawRay(transform.position, forward * 0.7, Color.red);
	
		if (Physics.Raycast (transform.position, forward, forwardHit, 0.7)){
		collision = 3;
		}
		else{
		collision = 0;
		}
	}
	
	if (Input.GetAxis("horizontal") > 0 && Input.GetAxis("vertical") == 0){//right
		var right = transform.TransformDirection (Vector3.right);
		var rightHit : RaycastHit;
		Debug.DrawRay(transform.position, right * 0.8, Color.red);
	
		if (Physics.Raycast (transform.position, right, rightHit, 0.8)){
		collision = 1;

		}
				else{
		collision = 0;
		}
	}
	
	if (Input.GetAxis("horizontal") < 0 && Input.GetAxis("vertical") == 0){//left
		var left = transform.TransformDirection (Vector3.left);
		var leftHit : RaycastHit;
		Debug.DrawRay(transform.position, left * 0.8, Color.red);
	
		if (Physics.Raycast (transform.position, left, leftHit, 0.8)){
		collision = 2;
		}
				else{
		collision = 0;
		}
	}
	
	if (Input.GetAxis("vertical") < 0 && Input.GetAxis("horizontal") == 0){//down
		var back = transform.TransformDirection (Vector3.back);
		var backHit : RaycastHit;
		Debug.DrawRay(transform.position, back * 0.7, Color.red);
	
		if (Physics.Raycast (transform.position, back, backHit, 0.7)){
		collision = 4;

		}
				else{
		collision = 0;
		}
	}
	
	//diagonal
	if (Input.GetAxis("vertical") < 0 && Input.GetAxis("horizontal") < 0){//down and left
		var leftDown = transform.TransformDirection (Vector3(-1,0,-1));
		var leftDownHit : RaycastHit;
		Debug.DrawRay(transform.position, leftDown * 0.8, Color.red);
	
		if (Physics.Raycast (transform.position, leftDown, leftDownHit, 0.8)){
		collision = 5;

		}
				else{
		collision = 0;
		}
	}
	
	if (Input.GetAxis("vertical") < 0 && Input.GetAxis("horizontal") > 0){//down and right
		var rightDown = transform.TransformDirection (Vector3(1,0,-1));
		var rightDownHit : RaycastHit;
		Debug.DrawRay(transform.position, rightDown * 0.8, Color.red);
	
		if (Physics.Raycast (transform.position, rightDown, rightDownHit, 0.8)){
		collision = 6;

		}
				else{
		collision = 0;
		}
	}
	
	if (Input.GetAxis("vertical") > 0 && Input.GetAxis("horizontal") < 0){//up and left
		var upLeft = transform.TransformDirection (Vector3(-1,0,1));
		var upLeftHit : RaycastHit;
		Debug.DrawRay(transform.position, upLeft * 0.8, Color.red);
	
		if (Physics.Raycast (transform.position, upLeft, upLeftHit, 0.8)){
		collision = 7;

		}
				else{
		collision = 0;
		}
	}
	
	if (Input.GetAxis("vertical") > 0 && Input.GetAxis("horizontal") > 0){//up and right
		var upRight = transform.TransformDirection (Vector3(1,0,1));
		var upRightHit : RaycastHit;
		Debug.DrawRay(transform.position, upRight * 0.8, Color.red);
	
		if (Physics.Raycast (transform.position, upRight, upRightHit, 0.8)){
		collision = 8;

		}
				else{
		collision = 0;
		}
	}
}