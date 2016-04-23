#pragma strict

var soundToPlay : AudioClip;
var volume : float = 1;

function Start () {

	AudioSource.PlayClipAtPoint(soundToPlay, transform.position, volume);

}
