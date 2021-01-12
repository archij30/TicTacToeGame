(function () {
    "use strict"
    var GameController = function ($scope) {
        var gm = this;

        $scope.player = 'X';
        $scope.player = 'X';
        $scope.board = createBoard(3);


        gm.winner;
        gm.gameOver = false;

        function createBoard (boardsize) {
            var data = new Array(3);
            for (let i = 0; i < 3; i++) {
                data[i] = new Array(3);
            }
            return data;
        };

        gm.playTurn = function (indexI, indexJ) {
            if (gm.winner || gm.gameOver) return;
            $scope.board[indexI][indexJ] = $scope.player;
            $scope.player = ($scope.player == 'X') ? 'O' : 'X';
            var winner = calculateWinner();
            if (winner) {
                showWinner(winner);
            }

        }

        gm.resetGame = function () {
            gm.winner = null;
            gm.gameOver = false;
            $scope.player='X';
            $scope.board = createBoard(3);
        }

        function showWinner(winner) {
            gm.winner = (winner=='X')?1:2;
        }


        function setGameOver(filledCells) {
            if (filledCells == 3 * 3) {
                console.log("game over");
                gm.gameOver = true;
            } else {
                gm.gameOver = false;
            }
        }

        function calculateWinner() {
            let board = $scope.board;
            var filledCells = 0
            //check rows
            for (let i = 0; i < 3; i++) {
                let x = 0, o = 0;
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == 'X') {
                        filledCells++;
                        x++;
                    }
                    if (board[i][j] == 'O') {
                        filledCells++;
                        o++;
                    }
                    setGameOver(filledCells);
                    if (x == 3) return 'X';
                    if (o == 3) return 'O';
                }
            }

            //check columns
            for (let i = 0; i < 3; i++) {
                let x = 0, o = 0;
                for (let j = 0; j < 3; j++) {
                    if (board[j][i] == 'X') x++;
                    if (board[j][i] == 'O') o++;
                }
                if (x == 3) return 'X';
                if (o == 3) return 'O';
            }

            //check forward diagonal
            let i = 0, j = 0, x = 0, o = 0;
            while (i < 3 && j < 3) {

                if (board[i][j] == 'X') x++;
                if (board[i][j] == 'O') o++;
                i++;
                j++;
            }
            if (x == 3) return 'X';
            if (o == 3) return 'O';

            //check reverse diagonal
            i = 0;
            j = 3;
            x = 0;
            o = 0;
            while (i < 3 && j >= 0) {

                if (board[i][j] == 'X') x++;
                if (board[i][j] == 'O') o++;
                i++;
                j--;
            }
            if (x == 3) return 'X';
            if (o == 3) return 'O';

            return null;

        }

    };
    GameController.$inject = ["$scope"];
    angular.module("ticTacToe", []).controller("gameController", GameController);
})();