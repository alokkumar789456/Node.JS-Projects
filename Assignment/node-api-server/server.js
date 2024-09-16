const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// A. Anagram Checker API:
// •   Description: This endpoint should accept two strings as input and return whether they are anagrams of each other.
// •   Request:
//     {
//         "string1": "listen",
//         "string2": "silent"
//     }
// •   Response:
//     {
//         "isAnagram": true
//     }

app.post('/anagram', (req, res) => {
    const { string1, string2 } = req.body;

    if (!string1 || !string2) {
        return res.status(400).json({ error: 'Both strings are required' });
    }

    const isAnagram = (str1, str2) => {
        const normalize = str => str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
        return normalize(str1) === normalize(str2);
    };

    const result = isAnagram(string1, string2);
    res.json({ isAnagram: result });
});


// B. Array Chunking API:
// •   Description: This endpoint should take an array and a chunk size
//     as input and return a new array containing arrays of the specified size.
// •   Request:
// {
//     "array": [1, 2, 3, 4, 5, 6, 7, 8],
//     "chunkSize": 3
// }
// •   Response:
//     {
//         "chunkedArray": [[1, 2, 3], [4, 5, 6], [7, 8]]
//     }

app.post('/chunk-array', (req, res) => {
    const { array, chunkSize } = req.body;

    if (!Array.isArray(array) || typeof chunkSize !== 'number' || chunkSize <= 0) {
        return res.status(400).json({ error: "Invalid input: Ensure 'array' is an array and 'chunkSize' is a positive number." });
    }

    function chunkArray(array, chunkSize) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            let arr = array.slice(i, i + chunkSize)
            result.push(arr);
        }
        return result;
    }

    const chunkedArray = chunkArray(array, chunkSize);

    res.json({ chunkedArray });
});

//   C.  Longest Substring Without Repeating Characters API:
//   •   Description: This endpoint should take a string as input and return the length of the longest substring without repeating characters.
//   •   Request:
    //   {
    //       "string": "abcabcbb"
    //   }
//   •   Response:
//       {
//           "length": 3
//       }

function LongestSubstring(s) {
    var obj = {};
    var start = 0;
    var maxLength = 0;

    for (var end = 0; end < s.length; end++) {
        var char = s[end];

        if (obj.hasOwnProperty(char) && obj[char] >= start) {
            start = obj[char] + 1;
        }
        obj[char] = end; 
        maxLength = Math.max(maxLength, end - start + 1); 
    }

    return maxLength;
}


app.post('/longestSubstring', (req, res) => {
    const { string } = req.body;

    if (typeof string !== 'string') {
        return res.status(400).json({ error: 'Invalid input. Please provide a string.' });
    }

    const length = LongestSubstring(string);
    res.json({ length });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
