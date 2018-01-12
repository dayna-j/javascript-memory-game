$(document).ready(function()
{
	var gameObject = 
	{
		// Properties of the game object
		_isGameOver: false,
		_numTurns: 0,
		// Methods of the game object
		resetGame: function()
		{
			return null;
		},
		
		gameBoard: // game board object
		{
			// PROPERTIES OF THE GAME BOARD OBJECT

			tiles: $(".board-square"),// tiles contains what is returned by the jquery selector .board-square
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
//				for (var currentTile in gameObject.gameBoard.tiles)
//				{// iterates over the randomized value set
//					console.log(gameObject.gameBoard.tiles[currentTile]);
//				}
				
				// use jquery each method to access each game tile and assign a value
				// from randomizedSet
				
//				gameObject.gameBoard.tiles.each(function()
//				{
//					$('this').innerHTML = 'y';
//				});
				
//				$.each(gameObject.gameBoard.tiles, function(){
//					
//				});
				
				
				$(".board-square").each(function(){
					currentTile = $(this);
					currentTile.innerHTML = gameObject.gameBoard.randomizedSet.pop();
					console.log(currentTile);
					
					
				});
				
				
				
			},
			
			makeNewBoard: function()//combines many smaller functions to make the board ready for play
			{// 1)  Randomize the value set and assign to randomizedSet array property of the gameBoard obj.
				gameObject.gameBoard.randomizedSet = gameObject.gameBoard.randomizeValueSet(gameObject.gameBoard.valueSet);
				gameObject.gameBoard.assignValues();
			//	2) assign randomized values to game tiles
			}
		}
	};

	$(".board-square").on("click", function(event)
	{
		console.log(event.target);
		event.target.innerHTML = "y";
	});
	
	console.log(gameObject.gameBoard.tiles);
//	console.log(gameObject.gameBoard.tiles[0]);
	gameObject.gameBoard.makeNewBoard();

});