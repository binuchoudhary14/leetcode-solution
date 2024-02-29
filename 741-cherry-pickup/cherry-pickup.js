/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function(grid) {
    let rows = grid.length;
    let cols = grid[0].length;

    const memo = new Map();

    const inBounds = (r,c) => {
        if(r >= 0 && c >= 0 && r < rows && c < cols)
            return true;
        return false;
    }

    let end = false;
    const helper = (r1, c1,r2,c2) => {
        if(!inBounds(r1, c1) || !inBounds(r2, c2) || grid[r1][c1] === -1 || grid[r2][c2] === -1)
            return -Infinity;

        if(r1 === rows - 1 && c1 === cols - 1) {
            end = true;
            return grid[r1][c1];
        }

        if(r2 === rows - 1 && c2 === cols - 1) {
            end = true;
            return grid[r2][c2];
        }
            

        let key = `${r1}#${c1}#${r2}#${c2}`;

        if(memo.has(key))
            return memo.get(key);

        let c = 0;
        if(r1 === r2 && c1 === c2) {
            c += grid[r1][c1];
        } else {
            c = c + grid[r1][c1] + grid[r2][c2];
        }

        let op1 = helper(r1, c1 + 1, r2, c2 + 1); //hh
        let op2 = helper(r1 + 1, c1, r2, c2 + 1); //vh;
        let op3 = helper(r1, c1 + 1, r2 + 1, c2); //hv;
        let op4 = helper(r1 + 1, c1, r2 + 1, c2); //vv;

        let res = c + Math.max(op1, op2, op3, op4);
        memo.set(key,res);
        return res;
    }

    let res = helper(0,0,0,0);
    if(end)
        return res;
    return 0;
};