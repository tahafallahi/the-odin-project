function findPath(root, goal, pastSteps = []) {
  if (pastSteps.length > 7) return null;
  let steps = pastSteps.slice();
  steps.push(root);
  let moves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];
  let validMoves = moves.map((move) => {
    move = [move[0] + root[0], move[1] + root[1]];
    if (move.every((v) => v >= 0 && v <= 7)) {
      return move;
    }
  });
  validMoves = validMoves.filter((move) => {
    if (move) {
      return steps.every((s) => s.toString() != move.toString());
    }
  });

  if (validMoves.some((move) => move.toString() == goal.toString())) {
    steps.push(goal);
    return steps;
  }

  let pathes = [];
  validMoves.forEach((move) => {
    let path = findPath(move, goal, steps);
    pathes.push(path);
  });
  
  pathes = pathes.filter(path => path);
  pathes.sort((a,b) => a.length - b.length);
  return pathes[0];
}

console.log(findPath([0,0], [7,6]));

