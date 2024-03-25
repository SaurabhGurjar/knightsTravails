class Graph {
    constructor() {
        this.adjList = [];
        this.perpendicularMove = [2, -2];
        this.lateralMove = [1, -1];
        this.BOARD_WIDTH = 8;
        this.BOARD_HEIGH = this.BOARD_WIDTH; 
    }

    // Generate all valid moves for given knight's position.
    generateKnightMove(i, j) {
        let u, v, _u, _v = 0;
        const move = [];
        for(let p = 0; p < this.perpendicularMove.length; p++) {
            for(let l = 0; l < this.lateralMove.length; l++) {
                u = i + this.perpendicularMove[p];
                v = j + this.lateralMove[l];
                _u = i + this.lateralMove[l];
                _v = j + this.perpendicularMove[p];
                
                // Check if move is valid
                if (u >= 0 && v >= 0 && u <= this.BOARD_WIDTH - 1 && v <= this.BOARD_WIDTH - 1) {
                    move.push([u, v]);
                }
                if (_u >= 0 && _v >= 0 && _u <= this.BOARD_WIDTH - 1 && _v <= this.BOARD_WIDTH - 1) {
                    move.push([_u, _v]);
                }
            }
        }
        return move;
    }

    // Create an adjecent list for the all position of the knight no the board.
    generate() {
        for(let i = 0; i <= this.BOARD_WIDTH - 1; i++) {
            for (let j = 0; j <= this.BOARD_WIDTH - 1; j++) {
                const moves = this.generateKnightMove(i, j);
                this.adjList.push(moves);
            }
            
        }
    }

    // Returns all valid moves for the given move from adjecent list.
    findMoveIndex(i, j) {
        if(i > this.BOARD_WIDTH || i < 0 || j > this.BOARD_HEIGH || j < 0) {
            return null;
        }
        const index = (i * this.BOARD_WIDTH + j);
        return index;
    }

    // Return all valid moves for a given position.
    validMoves(i, j) {
        return this.adjList[this.findMoveIndex(i, j)];
    }
   
    // Returns the shortest path between two given positions
    knightMove(from, to) {
        if(
            from[0] > this.BOARD_WIDTH
            || from[1] > this.BOARD_HEIGH  
            || to[0] > this.BOARD_WIDTH  
            || to[1] > this.BOARD_HEIGH  
            || from[0] < 0  
            || from[1] < 0  
            || to[0] < 0  
            || to[1] < 0
            ) {
                return null
        }
        // const queue = [from];
        // const mPath = [[]]
        const queue = [
            [
                [from],
                []
            ]
        ];
        const visited = new Set();

        while(queue.length > 0) {
            // const currentMove = queue.shift();
            // const path = mPath.shift();
            const [[currentMove], path] = queue.shift();
            if (`${currentMove}` === `${to}`) {
                return path.concat([currentMove]);
            }
    
            if(!visited.has(`${currentMove}`)) {
                visited.add(`${currentMove}`);
                const nextMoves = this.generateKnightMove(...currentMove);

                for(let i = 0; i < nextMoves.length; i++) {
                    // queue.push(nextMoves[i]);
                    // mPath.push(path.concat([currentMove]));
                    queue.push([[nextMoves[i]], path.concat([currentMove])]);
                }
                
            } 

        }
        return null;
    }   
}

const board = new Graph();
board.generate();
const path = board.knightMove([1, 0], [1, 7])
console.log(path);