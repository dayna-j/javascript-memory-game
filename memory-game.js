$(document).ready(function()
{
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
			gameObject.gameBoard.makeNewBoard();
			gameObject.gameBoard.numSelected = 0;
			gameObject.gameBoard.numSolved = 0;
			gameObject.gameBoard.firstSelected = '';
			gameObject.gameBoard.secondSelected = '';
			$(".display").val(0);
			
			$(".board-square").each(function()
			{
				if ($(this).hasClass("selected"))
				{// remove special classes from tiles; .selected , .solved
					$(this).removeClass("selected");
				}
				else if ($(this).hasClass("solved"))
				{
					$(this).removeClass("solved");
				}
			})
			
			
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
			//	2) assign randomized values to game tiles
			},
			
			compareTiles: function(event) // !!!!! WORKING HERE !!!!!
			{// if innerHTML of both selected tiles are equal, then give the tiles
			// a new class; " .solved "
				
//				var selectedTiles = $(".selected");
				
				if(gameObject.gameBoard.firstSelected == '')
				{// 
					gameObject.gameBoard.firstSelected = event.target.innerHTML;
				}
				else
				{
					gameObject.gameBoard.secondSelected = event.target.innerHTML;
				}
				// if the tiles match ...
				if (gameObject.gameBoard.firstSelected == gameObject.gameBoard.secondSelected)
				{// everything with a .selected class will have its .selected class removed and
				// it will be replaced with a .solved class
					
					console.log("match");
					
//					var selectedTiles = $(".selected");
					$(".selected").each(function()
					{
						$(this).removeClass(".selected");
						$(this).addClass("solved");
						
						gameObject.gameBoard.numSelected = 0;
						gameObject.gameBoard.numSolved = gameObject.gameBoard.numSolved + 1;
						$("#matchedDisplay").val(gameObject.gameBoard.numSolved)
						
						gameObject.gameBoard.firstSelected = '';
						gameObject.gameBoard.secondSelected = '';
					})
					
				}
				
				
				console.log(gameObject.gameBoard.firstSelected +" "+gameObject.gameBoard.secondSelected);

				
				
				
				//				console.log(selectedTiles);
				
				
				//				if(selectedTiles[0].innerHTML === selectedTiles[1].innerHTML)
//				{
//					alert	('t');
//				}
				
			}	
		}
	};

	$(".board-square").on("click", function(event)
	{
		
		if($(this).hasClass('solved'))
		{// is the tile has been solved, do nothing...
			return null;
		}
		
//		gameObject.gameBoard.compareTiles(event);
		
		if ($(this).hasClass("selected"))
		{// if its there already, remove it
			$(this).removeClass("selected");
			gameObject.gameBoard.numSelected = gameObject.gameBoard.numSelected - 1;
		}
		else if(gameObject.gameBoard.numSelected >= gameObject.gameBoard.maxSelected)
		{// if the number of selected tiles is greater than or equal 2...
		// do nothing
			return null;
		}
		else
		{
			$(this).addClass("selected");
			gameObject.gameBoard.numSelected = gameObject.gameBoard.numSelected + 1;	
		}	
		
		gameObject.gameBoard.compareTiles(event);
//		console.log(event.target);
	});
	
	$("p").on("click", function(event)
	{
		gameObject.resetGame();
	});	
	
//	console.log(gameObject.gameBoard.tiles[0]);
//	console.log(gameObject.gameBoard.tiles);
	gameObject.resetGame();
	
});