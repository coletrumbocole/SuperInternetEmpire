
var game = angular.module('game', []);

game.controller('gameController', function($scope, $interval){
	
	//this.MolePic = 'mole.png';

	this.gameData = {
		gameLength: 11
		,time_remaining: 11
		,score: 0
		,Mole: {
			pos: -1
		}
		,Player: {
			pos: -1
		}
		,Src: {
			Asrc: 'mole.png'
			,Bsrc: 'normal.png'
			,Csrc: 'normal.png'
			,Dsrc: 'normal.png'
		}
	};

	function countdown(gData){
		gData.time_remaining--;
	}

	function randPos(){
		return Math.floor( Math.random() * (5) );
	}

	this.startGame = function startGame(Gdata){
		Gdata.score = 0;
		Gdata.time_remaining = 11;
		$interval( function(){
				updateMole(randPos(), Gdata);
				countdown(Gdata);
		}, 1000, Gdata.gameLength);
	}
	
	function updateMole(rand, Gdata){
		Gdata.Mole.pos = rand;
		// rand needs to corespong to a div. it is 0 or 1. 0 changes Asrc, 1 changes Bsrc.
		if(rand == 0){
			Gdata.Src.Asrc = 'mole.png';
			Gdata.Src.Bsrc = 'normal.png';
			Gdata.Src.Csrc = 'normal.png';
			Gdata.Src.Dsrc = 'normal.png';
		}
		else if(rand == 1){
			Gdata.Src.Asrc = 'normal.png';
			Gdata.Src.Bsrc = 'mole.png';
			Gdata.Src.Csrc = 'normal.png';
			Gdata.Src.Dsrc = 'normal.png';
		}
		else if(rand == 2){
			Gdata.Src.Asrc = 'normal.png';
			Gdata.Src.Bsrc = 'normal.png';
			Gdata.Src.Csrc = 'mole.png';
			Gdata.Src.Dsrc = 'normal.png';
		}
		else if(rand == 3){
			Gdata.Src.Asrc = 'normal.png';
			Gdata.Src.Bsrc = 'normal.png';
			Gdata.Src.Csrc = 'normal.png';
			Gdata.Src.Dsrc = 'mole.png';
		}
		else if(rand == 4){
			Gdata.Src.Asrc = 'normal.png';
			Gdata.Src.Bsrc = 'normal.png';
			Gdata.Src.Csrc = 'normal.png';
			Gdata.Src.Dsrc = 'normal.png';
		}
	}
	
	this.hit = function hit(gData){
		if(gData.Player["pos"] == gData.Mole["pos"]){ //once it's hit, hitting won't do anything. [0] || gData.Player["pos"] == gData.Mole["pos"][1]
			gData.score++;
			// go through each src, if its mole, change to deadpic.
			for(var k in gData.Src){
				if(gData.Src[k] == 'mole.png' ) gData.Src[k] = 'deadpic.png';
			}
			gData.Mole["pos"] = -1;
		}
	};
	
	this.Ppos = function update(pos_in){
		this.gameData.Player.pos = pos_in;
	};

});