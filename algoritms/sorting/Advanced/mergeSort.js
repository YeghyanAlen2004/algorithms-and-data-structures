function merge(arr, start, mid, end) {
    let a1 = arr.slice(start, mid + 1);
    let a2 = arr.slice(mid + 1, end + 1);
    let i = 0;
    let j = 0;
    let k = start;
    while (i < a1.length && j < a2.length) {
        if(a1[i] <= a2[j]) {
            arr[k++] = a1[i++];
        } else {
            arr[k++] = a2[j++];
        }
    }
    while (i < a1.length) {
        arr[k++] = a1[i++];
    }
    while (j < a2.length) {
        arr[k++] = a2[j++];
    }
}
function mergeSorting(arr, start, end) {
    if(start >= end) {
        return;
    }
    let mid = Math.floor(start + (end - start) / 2);
    mergeSorting(arr, start, mid);
    mergeSorting(arr, mid + 1, end);
    merge(arr, start, mid, end);
}


let arr = [3, 4, 5, 6, 7, 8, 9];

console.log(mergeSorting(arr, 0, arr.length - 1), arr);