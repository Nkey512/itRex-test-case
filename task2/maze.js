const inputData = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

function mazeExit(maze) {
  const rows = maze.length;
  const columns = maze[0].length;

  class Node {
    constructor(symb, position, prevNode, visited) {
      this.symb = symb;
      this.position = position;
      this.prevNode = prevNode;
      this.visited = visited;
    }
  }

  const newMaze = [];
  for (let ind in maze) {
    newMaze.push(
      maze[ind].map((el, i) =>
        el === "+"
          ? new Node(
              el,
              (position = { row: Number(ind), column: Number(i) }),
              null,
              false
            )
          : new Node(
              el,
              (position = { row: Number(ind), column: Number(i) }),
              null,
              true
            )
      )
    );
  }

  // finding start position and exit
  function positionFinding(maze) {
    let start, end;
    positionFinding: for (let iY in maze) {
      for (let iX in maze[iY]) {
        if (
          Number(iY) === 0 ||
          Number(iY) === rows - 1 ||
          Number(iX) === 0 ||
          Number(iX) === columns - 1
        ) {
          if (maze[iY][iX].symb === "+") {
            end = maze[iY][iX];
          }
        }
        if (maze[iY][iX].symb === "0") {
          start = maze[iY][iX];
        }
        if (start !== undefined && end !== undefined) {
          break positionFinding;
        }
      }
    }
    return [start, end];
  }

  function searchPossibleWay(node) {
    if (!newMaze[node.position.row - 1][node.position.column].visited) {
      newMaze[node.position.row - 1][node.position.column].prevNode = node;
      queue.push(newMaze[node.position.row - 1][node.position.column]);
    }
    if (!newMaze[node.position.row][node.position.column + 1].visited) {
      newMaze[node.position.row][node.position.column + 1].prevNode = node;
      queue.push(newMaze[node.position.row][node.position.column + 1]);
    }
    if (!newMaze[node.position.row + 1][node.position.column].visited) {
      newMaze[node.position.row + 1][node.position.column].prevNode = node;
      queue.push(newMaze[node.position.row + 1][node.position.column]);
    }
    if (!newMaze[node.position.row][node.position.column - 1].visited) {
      newMaze[node.position.row][node.position.column - 1].prevNode = node;
      queue.push(newMaze[node.position.row][node.position.column - 1]);
    }
  }

  const queue = [];
  const [start, end] = positionFinding(newMaze);
  queue.push(start);

  let currentNode;
  while (queue.length > 0) {
    currentNode = queue.shift();
    currentNode.visited = true;
    if (currentNode === end) {
      break;
    }
    searchPossibleWay(currentNode);
  }

  const path = [];
  while (true) {
    currentPos = currentNode.position;
    prevPos = currentNode.prevNode.position;
    if (currentPos.row - prevPos.row === 1) {
      path.unshift("down");
    }
    if (currentPos.row - prevPos.row === -1) {
      path.unshift("up");
    }
    if (currentPos.column - prevPos.column === 1) {
      path.unshift("right");
    }
    if (currentPos.column - prevPos.column === -1) {
      path.unshift("left");
    }
    currentNode = currentNode.prevNode;
    if (currentNode.prevNode === null) {
      break;
    }
  }

  return path;
}

mazeExit(inputData);
