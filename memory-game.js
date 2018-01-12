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
			// Properties of the game board object

			tiles: $(".board-square"),
			valueSet: [1,1,2,2,3,3,4,4,5,5,6,6,
					   7,7,8,8,9,9,10,10,11,11,12,12],
			randomizedSet: [],
			// Methods of the game board object
			
			randomizeValueSet: function(array)
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
			
			assignValue: function()
			{
				for (var currentTile in tiles)
				{// iterates over the randomized value set
					console.log(tiles[currentTile]);
				}
			},
			
			makeNewBoard: function()
			{// 1)  Randomize the value set and assign to randomizedSet array property of the gameBoard obj.
				gameObject.gameBoard.randomizedSet = gameObject.gameBoard.randomizeValueSet(gameObject.gameBoard.valueSet);
				gameObject.gameBoard.assignValue();
			//	2) assign randomized values to game tiles
			}
			
		}
	};

	$(".board-square").on("click", function(event)
	{
		console.log(event.target);
	});
	
	console.log(gameObject.gameBoard.tiles);

});