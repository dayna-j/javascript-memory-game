$(document).ready(function()
{
	var gameObject = 
	{
		// Properties of the game object
		
		_isGameOver: false,
		_numTurns: 0,
		
		// Methods of the game object

		resetGame: function()
		{// reset valueSet & generate new game board
			gameObject.gameBoard.valueSet = [1,1,2,2,3,3,4,4,5,5,6,6,
					   7,7,8,8,9,9,10,10,11,11,12,12],
			gameObject.gameBoard.makeNewBoard();
			gameObject.gameBoard.numSelected = 0;
			
			$(".board-square").each(function()
			{
				if ($(this).hasClass("selected"))
				{// if its there already, remove it
					$(this).removeClass("selected");
				}
			})
			
			
		},
		
		gameBoard: // game board object
		{
			// PROPERTIES OF THE GAME BOARD OBJECT

			tiles: $(".board-square"),// tiles contains what is returned by the jquery selector .board-square
			maxSelected: 2,
			numSelected: 0,
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
			
			assignValues: function()// !!!!! WORKING HERE !!!!!
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
			//	2) assign randomized values to game tiles
			},
			
			compareTiles: function()
			{
				return null;
			}
		}
	};

	$(".board-square").on("click", function(event)
	{
//		if(gameObject.gameBoard.numSelected >= gameObject.gameBoard.maxSelected)
//		{// do nothing
//			return null;	
//		}
		
		if ($(this).hasClass("selected"))
		{// if its there already, remove it
			$(this).removeClass("selected");
			gameObject.gameBoard.numSelected = gameObject.gameBoard.numSelected - 1;
		}
		else if(gameObject.gameBoard.numSelected >= gameObject.gameBoard.maxSelected)
		{
			return null;
		}
		else
		{
			$(this).addClass("selected");
			gameObject.gameBoard.numSelected = gameObject.gameBoard.numSelected + 1
		}	
		console.log(event.target);
	});
	
	$("p").on("click", function(event)
	{
	gameObject.resetGame();
	});	
	
//	console.log(gameObject.gameBoard.tiles[0]);
	gameObject.gameBoard.makeNewBoard();
//	console.log(gameObject.gameBoard.tiles);

});