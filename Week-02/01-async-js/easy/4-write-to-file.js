// ## Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

import fs from 'fs';

const data = 'new content appended in file\n';

fs.writeFile('test.txt', data , 'utf8', (err, res) => {
    if(err){
        console.log(`Error in appending content in file, ${err}`);
    } else {
        console.log(`Content appended in file, ${res}`)
    }
})