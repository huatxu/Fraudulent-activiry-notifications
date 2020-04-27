'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {
    let notifications = 0
    let freq = []
    
    for(let i = 0; i < 201; i++) 
        freq[i] = 0
    

    let max = Number.MIN_SAFE_INTEGER
    let min = Number.MAX_SAFE_INTEGER
    for(let i = 0; i < d; i++) {
        if(expenditure[i] < min)
            min = expenditure[i]
        if (expenditure[i] > max) 
            max = expenditure[i]
        
        freq[expenditure[i]] = freq[expenditure[i]] + 1
    }

    for(let i = 0; i + d < expenditure.length; i++) {
        let day = expenditure[i + d]
        if(day > max) max = day
        if(day < min) min = day

        let median = getMedian([...freq], min, max, d)

        if(median*2 <= day)
            notifications++


        freq[expenditure[i]] = freq[expenditure[i]] > 0 ? freq[expenditure[i]] - 1 : 0
        freq[expenditure[d + i]] = freq[expenditure[d + i]] + 1
    }

    return notifications
} 

function getMedian(freq, min, max, number) {
    let median = Math.ceil(number / 2) 

    if(number % 2 !== 0) {
        let sum = 0
        let i = min
        while(sum < median) {
            sum += freq[i]
            i++
        }
        return i - 1
    } 

    let sum = 0
    let i = min

    while(sum < median) {
        sum += freq[i]
        i++
    }

    let first = i - 1

    while(sum < median + 1) {
        sum += freq[i]
        i++
    }

    let second = i
    return (first + second - 1) / 2
}



function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const expenditure = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    let result = activityNotifications(expenditure, d);

    ws.write(result + "\n");

    ws.end();
}
