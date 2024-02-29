/**
 * @param {string} s
 * @return {number}
 */
 //sliding window approach
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    let left = 0;
    let right = 0;
    let set = new Set();

    while (right < s.length) {
        if (!set.has(s.charAt(right))) {
            set.add(s.charAt(right));
            maxLength = Math.max(maxLength, right - left + 1);
            right++;
        } else {
            set.delete(s.charAt(left));
            left++;
        }
    }
    return maxLength;
}

//ab0c0ed

//a set->{'a'}
//ab -> {'a','b'}
//ab0
//ab0c -> 0 exist in set alreday then delete form begin 0 to end 
//c0 ->
//c0e
//c0ed

//time o(n)
//space o(n)
