/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {

    let start=0;
    let maxSubLength = 0
    for(let i=0;i<s.length;i++){
    const len1=expandAroundCenter(s,i,i)
    const len2=expandAroundCenter(s,i,i+1)
    const len = Math.max(len1,len2)
    if(maxSubLength < len) {
    maxSubLength = len
    start = i - Math.floor((maxSubLength - 1) / 2);
    }
    }
    return s.substr(start, maxSubLength);
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}            //console.log(longestPalindrome ("babad"))

//Expandaround center method -
//Find center then check left right. For odd      - b a b a d
//						     i/j      -> then check left right - odd number I/J-equal	
//For even - baab 
//                    I  j   -> i-> i,i+1 check then around method 

//For find start -index -> find length/2 - 1          
