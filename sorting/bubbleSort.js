const arr = [2, 2, 3, 1];

function bubbleSort (arr) {
    let size = arr.length;

    for (let i = 0; i < size - 1; ++i) {
        let swapped = false;
        for (let j = 0; j < size - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if(!swapped) {
            break;
        }
    }
    return arr;
}

console.log(bubbleSort(arr));