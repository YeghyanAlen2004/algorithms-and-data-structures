const arr = [9, 1, 2, 4, 7];

function selection(arr) {
    let length = arr.length;

    for (let i = 0; i < length; ++i) {
        let min = i;
        for(let j = i + 1; j < length; ++j) {
            if(arr[min] > arr[j]) {
                min = j;
            }
        }
        if (i !== min) {
        [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
    return arr;
}

console.log(selection(arr));