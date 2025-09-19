function selection(arr) {
    let size = arr.length;

    for (let i = 0; i < size; ++i) {
        let minIndex = i;
        for (let j = i + 1; j < size; ++j) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}

const arr = [9, 1, 2, 4, 7];

console.log(selection(arr));