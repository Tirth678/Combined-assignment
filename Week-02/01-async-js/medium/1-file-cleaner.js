// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

import fs from 'fs';

function fileCleaner(filepath, format){
    fs.writeFile(filepath, format, (err, res) => {
        if(err){
            console.log(`Error in appending file ${err}`);
        } else {
            console.log(`Contents appended in file ${res}`);
            let removedSpaces = format.replace(/\s+/g, ' ').trim();
            fs.appendFile(filepath, removedSpaces, (err, res) => {
                if(err){
                    console.log(`Error in appending file ${err}`);
                } else {
                    console.log(`Contents appended in file ${res}`);
                }
            })
        }
    })
}

let sampleData = 'hi   there\n'

fileCleaner('./test.txt', sampleData);