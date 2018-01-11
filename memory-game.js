$(document).ready(function()
{
	var gameObject = {
		// Properties of the game object.
		_isGameOver: false,
		_numTurns: 0,
		
		gameBoard: {
			tiles: $(".board-square"),
//			rows: gameObject.gameBoard.tiles,
			randomNumber: function(){
				return Math.floor((Math.random() * 24) + 1);
			}
		}
	
	};
	
	console.log(gameObject.gameBoard.tiles[0]);
//	console.log(gameObject.gameBoard.rows);
//	gameObject.gameBoard.tiles;
	
});