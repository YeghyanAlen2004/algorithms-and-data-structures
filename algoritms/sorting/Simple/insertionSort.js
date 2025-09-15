const arr = [5, 4, 6, 7, 1, 2, 3];

function insertionSort(arr) {
    let length = arr.length;

    for (let i = 1; i < arr.length; ++i) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            console.log(arr);
        }
        arr[j + 1] = key;
        
    }
    return arr;
}

console.log(insertionSort(arr));