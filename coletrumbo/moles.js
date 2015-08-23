var game = angular.module('game', []);
game.controller('gameController', ['$scope', '$interval', 
    function($scope, $interval){

	this.score= 0;
	//each square needs to have unique data, so that I can pass it in to the hit function, where I can get a point if it was a mole.
	
// MoleIsUp needs to change at random intervals, each square independent of others AND change to 0 when hit.
// Div needs to change CSS background-image depending on MoleIsUp. and hitMole.

// mole behavior: makes the mole "alive". 
//goes up every 2-3 seconds, unless already up.	a function called at random interval (2-3sec) to change mole to up.
//goes down 2-3 seconds after up, unless dead. stays up for .5 seconds when dead. a function called when mole is up or hit to put mole down in the corresponding time.
	
	var checkDeadMole = function checkDeadMole(moleData){ //will go in dead.
	    if(moleData["MoleIsUp"] == 'waitingDead'){
	        moleData["MoleIsUp"] = 'down';
	    }
	    else {
	    	moleData["MoleIsUp"] = 'waitingDead';
	        setTimeout( function() {
	        	checkDeadMole(moleData);
	        }, 1000); // check again in a second
	    }
	}

	var checkUpMole = function checkUpMole(moleData){ //its up coming into here
	console.log("in checkUpMole");
    	if(moleData["MoleIsUp"] == 'waiting'){
    		console.log("waiting case");
        	moleData["MoleIsUp"] = 'down';
        	console.log("should now be down");
        	return moleData.MoleIsUp;
    	}
    	else {
	    	moleData["MoleIsUp"] = 'waiting';

	        setTimeout(function() {
			    console.log("waited 3 sec");
			    moleData.MoleIsUp = checkUpMole(moleData); //this call should be the last time, but when called, it does the console log and stops, doesn't change MoleIsUp to down, even though it is waiting. When called recursively
			    console.log("called checkUpMole in setTimeout");
			}, 3000); // check again in 3 sec
    	}
	    
	}

	function moleDown(mole){
		if (mole["MoleIsUp"] == 'dead') {
			checkDeadMole(mole); //after this, mole is down --ASSUMPTION
		}
		else if(mole["MoleIsUp"] == 'up'){
			//ill put it back down unless it's hit.
			checkUpMole(mole); //after this, mole is down.  --ASSUMPTION
		}
		else if(mole["MoleIsUp"] == 'down'){
			setTimeout( function(){
				moleUp(moleHome);
			}, 3000);
		}
	}

	function moleUp(moleData){
		moleData["MoleIsUp"] = 'up';
		moleDown(moleData);
	}

	this.squareA = {
		MoleIsUp: 'up'
		,display: "You're on A"
	};
	
	var MoleA = function MoleA(moleHome){
		if(moleHome["MoleIsUp"] == 'up'){
			moleDown(moleHome);
		}
		else setTimeout( function(){
			moleUp(moleHome);
		}, 3000);
			
	};

	this.moleStart = function moleStart(){
		MoleA(this.squareA);
	}

	this.squareB = {
		MoleIsUp: 'up'

		,display: "You're on B"
	};

	this.allSquares = [this.squareA, this.squareB];
	
	this.currSquare = {
		MoleIsUp: 1,
		display: "You're on currSqu"
	};
	
	this.hit = function hit(inSquare){
		if(inSquare["MoleIsUp"] == 'waiting' || inSquare["MoleIsUp"] == 'up'){ //once it's hit, hitting won't do anything.
			this.score++;
			inSquare["MoleIsUp"] = 'dead';
			moleDown(inSquare);
		}
	};
	
	this.update = function update(mouseOnSquare){
		this.currSquare = mouseOnSquare;
	};

}]);