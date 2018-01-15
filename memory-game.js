$(document).ready(function()
{
	$("#win").hide()

	var gameObject = 
	{
		// Properties of the game object
		
		isGameOver: false,
		numTurns: 0,
		numSolved: 0,
		
		// Methods of the game object

		resetGame: function()
		{// reset game to initial conditions
			gameObject.gameBoard.valueSet = [1,1,2,2,3,3,4,4,5,5,6,6,
					   7,7,8,8,9,9,10,10,11,11,12,12],
			gameObject.gameBoard.numSelected = 0;
			gameObject.gameBoard.numSolved = 0;
			gameObject.gameBoard.firstSelected = '';
			gameObject.gameBoard.secondSelected = '';
			gameObject.gameBoard.firstEventObj = {};
			gameObject.gameBoard.secondEventObj = {};
			$(".display").val(0);
			
			$(".board-square").each(function()
			{
				if ($(this).hasClass("selected"))
				{// remove special classeses from tiles ; .selected ,  .solved
					$(this).removeClass("selected");
				}
				else if ($(this).hasClass("solved"))
				{
					$(this).removeClass("solved");
				}
			})
			$("#win").hide();
			gameObject.gameBoard.makeNewBoard();
			
		},
		
		gameOver: function()
		{
			gameObject.isGameOver = true;
			$("#win").toggle(1100);
;
		},
		
		gameBoard: // game board object
		{
			// PROPERTIES OF THE GAME BOARD OBJECT

			tiles: $(".board-square"),// tiles contains what is returned by the jquery selector .board-square
			maxSelected: 2,
			numSelected: 0,
			numSolved: 0,
			firstSelected: '',
			secondSelected: '',
			// testing //
			firstEventObj: {},
			secondEventObj: {},
			
			valueSet: [1,1,2,2,3,3,4,4,5,5,6,6,
					   7,7,8,8,9,9,10,10,11,11,12,12],
			
			randomizedSet: [],
			
			// METHODS OF THE GAME BOARD OBJECT
			
			randomizeValueSet: function(array)// shuffle function for value set
			{
				var currentIndex = array.length, temporaryValue, randomIndex;
				// While there remain elements to shuffle...
  				while (0 !== currentIndex) 
				{
    				// Pick a remaining element...
    				randomIndex = Math.floor(Math.random() * currentIndex);
    				currentIndex -= 1;

					// And swap it with the current element.
    				temporaryValue = array[currentIndex];
    				array[currentIndex] = array[randomIndex];
    				array[randomIndex] = temporaryValue;
  				}
  				return array;
			},
			
			assignValues: function()
			{
				
				// use jquery each method to access each game tile and assign a value
				// from randomizedSet
								
				$(".board-square").each(function()
				{// this is a loop
					currentTile = $(this)[0];
					currentTile.innerHTML = gameObject.gameBoard.randomizedSet.pop();
//					console.log(currentTile);
				});
										
			},
			
			makeNewBoard: function()//combines many smaller functions to make the board ready for play
			{// 1)  Randomize the value set and assign to randomizedSet array property of the gameBoard obj.
//				console.log(gameObject.gameBoard.randomizedSet);
				gameObject.gameBoard.randomizedSet = gameObject.gameBoard.randomizeValueSet(gameObject.gameBoard.valueSet);
				gameObject.gameBoard.assignValues();
			},
			
			compareTiles: function(event) // !!!!! WORKING HERE !!!!!
			{
//				var selectedTiles = $(".selected");
//				
//				console.log(event.target.id);// print id attribute of the tile
				
				if(gameObject.gameBoard.firstSelected == '')
				{// if no tile has been selected yet,

					gameObject.gameBoard.firstSelected = event.target.innerHTML;
					gameObject.gameBoard.firstEventObj = event.target.id;
				}
				else
				{// firstSelected was not empty, fill secondSelected
					gameObject.gameBoard.secondSelected = event.target.innerHTML;
					gameObject.gameBoard.secondEventObj = event.target.id;
				}
				
				// if the are a valid match (same number, different ID)
				if (gameObject.gameBoard.firstSelected == gameObject.gameBoard.secondSelected 
					&& gameObject.gameBoard.firstEventObj != gameObject.gameBoard.secondEventObj)
				{// everything with a .selected class will have its .selected class removed and
				// it will be replaced with a .solved class
					
					console.log("match");
					
//					var selectedTiles = $(".selected");
					$(".selected").each(function()
					{
						$(this).removeClass(".selected");
						$(this).addClass("solved");
					})
					gameObject.gameBoard.numSelected = 0;
					gameObject.gameBoard.numSolved = gameObject.gameBoard.numSolved + 1;
					$("#matchedDisplay").val(gameObject.gameBoard.numSolved)
					gameObject.gameBoard.firstSelected = '';
					gameObject.gameBoard.secondSelected = '';
				}
				
				if (gameObject.gameBoard.numSelected === 2)
				{
					gameObject.numTurns = gameObject.numTurns + 1;
					$("#turnsDisplay").val(gameObject.numTurns);
				}
				
				if(gameObject.gameBoard.numSolved == 12)
				{
					gameObject.gameOver();
				}
				
				
				console.log(gameObject.gameBoard.firstSelected +" "+gameObject.gameBoard.secondSelected);
			},
			
			developerMode: function()
			{// turns off the noselect class for easy solving
				$(".board-square").each(function()
				{
					$(this).removeClass("noselect");
				});
			}
		}//end of gameBoard
	};//end of gameObject

	$(".board-square").on("click", function(event)
	{
		if($(this).hasClass('solved'))
		{// is the tile has been solved, do nothing...
			return null;
		}
		else if ($(this).hasClass("selected"))
		{// if selected class is there already, remove it
			$(this).removeClass("selected");
			// decrement numSelected
			gameObject.gameBoard.numSelected = gameObject.gameBoard.numSelected - 1;
			
			if(gameObject.gameBoard.firstSelected == event.target.innerHTML)
			{
				gameObject.gameBoard.firstSelected = '';
			}
			else if(gameObject.gameBoard.secondSelected == event.target.innerHTML)
			{
				gameObject.gameBoard.secondSelected = '';
			}
			return null;
		}
		else if(gameObject.gameBoard.numSelected >= gameObject.gameBoard.maxSelected)
		{// if the number of selected tiles is greater than or equal 2...
		// do nothing.  (deselect both currently selected tiles)
			gameObject.gameBoard.firstSelected = '';
			gameObject.gameBoard.secondSelected = '';
			gameObject.gameBoard.numSelected = 1;
			$(".selected").removeClass('selected');
			$(this).addClass('selected');
		}
		else
		{// otherwise, add the selected class and increment numSelected
			$(this).addClass("selected");
			gameObject.gameBoard.numSelected = gameObject.gameBoard.numSelected + 1;	
		}	
		
		gameObject.gameBoard.compareTiles(event);
//		console.log(event.target);
	});
	
	$("#win").on("click", function(event)
	{
		gameObject.resetGame();
	});	
//	console.log(gameObject.gameBoard.tiles[0]);
//	console.log(gameObject.gameBoard.tiles);
	gameObject.resetGame();
	
//	gameObject.gameBoard.developerMode();
	
	
//	console.log($(".board-square"));
});