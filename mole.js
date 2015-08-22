

var game = angular.module('game', []);

game.controller('gameController', function($scope, $interval){

	this.gameData = {
		time_remaining: 11
		,score: 0
		,Mole: {
			pos: -1
			,state: 'alive'
		}
		,Player: {
			pos: -1
		}
	};

	// function countdown(time){
	// 	time--;
	// 	if(time == 0){
	// 		stopGame();
	// 	}
	// }

	// function stopGame(){
	// 	//all intervals are stipped.
	// }

	function randPos(){
		return Math.floor( (Math.random()*2)+1 );
	}

	this.startGame = function startGame(Gdata){
		$interval( function(){
				updateMole(Gdata.Mole, randPos());
		}, 1000);
		// $interval( function(){
		// 		countdown(Gdata.time_remaining);
		// }, 1000);
	}

	function updateMole(mole, rand){
		console.log('updadint mole');
		mole["pos"] = rand;
	}
	
	this.hit = function hit(gData){
		if(gData.Mole["pos"] == gData.Player["pos"]){ //once it's hit, hitting won't do anything.
			gData.score++;
			gData.Mole["state"] = 'dead';
			gData.Mole["pos"] = 0;
		}
	};
	
	this.update = function update(pos_in){
		this.gameData["Player"].pos = pos_in;
	};

});