/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
    
    //Create DP array containig possible results for each char in t
    let dp = Array(t.length+1).fill(0);
    
    //Base case - empty string 1 result
    dp[0] = 1;
    
    //Iterate s string
    for (let i = 0; i < s.length; i++) {
        //Iterate t string (from end to start so we don't process data that we've just entered)
        for (let j = dp.length-1; j >= 0; j--) {
          //Char match  
            if (s[i] === t[j]) {
                //Add this char count to next position
                dp[j+1] += dp[j]
            }
        }
    }
    
    return dp[t.length];
};