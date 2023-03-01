function getNeighbors(pos) {
    const [row, col] = pos;
    const neighbors = [[row+2, col+1], [row+2, col-1], 
                [row-2, col+1], [row-2, col-1], 
                [row+1, col+2], [row+1, col-2],
                [row-1, col+2], [row-1, col-2]];

    return neighbors.filter( el => el[0] < 8 && el[0] >= 0 && el[1] < 8 && el[1] >= 0);
}

function Node(pos, prev=null) {
    return {
        pos,
        prev,
        neighbors: getNeighbors(pos)
    }
}

function knightMoves(start, target) {
    const queue = [];
    const track = [];
    const [targetRow, targetCol] = target;
    let found;
    queue.push(Node(start));

    while (queue.length) {
        const current = queue.shift();
        const [row, col] = current.pos;
        if (row === targetRow && col === targetCol) {
            found = current
            break
        }
        for (let i = 0; i < current.neighbors.length; i++) {
            queue.push(Node(current.neighbors[i], current))
        }
    }

    while (found) {
        track.unshift(found.pos)
        found = found.prev
    }

    let finalMessage = `You made it in ${track.length - 1} moves! Here's your path: \n`
    track.forEach(pos => finalMessage += `[${pos[0]}, ${pos[1]}]\n`)

    console.log(finalMessage)
}

knightMoves([3,3],[0,0])