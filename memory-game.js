$(document).ready(function()
{
	var gameObject = 
	{
		// Properties of the game object.
		_isGameOver: false,
		_numTurns: 0,

		resetGame: function()
		{
			return null;
		},
		
		gameBoard: 
		{
			tiles: $(".board-square"),
			randomNumber: function()
			{
				return Math.floor((Math.random() * 12) + 1);
			}
		}
	};

//	alert(gameObject.gameBoard.randomNumber());
	console.log(gameObject.gameBoard.tiles[0]);
	console.log(gameObject.resetGame());
	
	$(".board-square").on("click", function(event)
	{
		console.log(event.target.id);
		
		
	});
	
	
	
	
	
	
	
	
});