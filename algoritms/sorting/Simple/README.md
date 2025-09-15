# Simple sorting algoritms

BUBBLE SORT

Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process continues until the array is sorted.

> How it works

1. Compare each pair of adjacent elements in the array.

2. Swap them if they are in the wrong order.

3. Repeat the process for each element until no swaps are needed.

> Time Complexity

.   Best case: O(n) – occurs when the array is already sorted. Only one pass is needed to check that no swaps are required.

.   Average case: O(n²) – occurs when the elements are in random order.

.   Worst case: O(n²) – occurs when the array is sorted in reverse order.

> Space Complexity

.   O(1) – Bubble Sort is an in-place sorting algorithm; it does not require additional memory proportional to the input size.

> Stability

.   Stable – equal elements retain their original relative order.

-----------------------------------------------------------------------------------------------

INSERTION SORT

Insertion Sort is a simple comparison-based algorithm that builds the sorted array one element at a time. It picks elements from the unsorted part and inserts them into the correct position in the sorted part.

> How it works

1.   Start from the second element of the array.

2.   Compare it with elements in the sorted part and shift larger elements to the right.

3.   Insert the current element into its correct position.

4.   Repeat for all elements until the array is sorted.

> Time Complexity

.   Best case: O(n) – occurs when the array is already sorted. Only one pass is needed with no shifts.

.   Average case: O(n²) – occurs when elements are in random order, many shifts are needed.

.   Worst case: O(n²) – occurs when the array is sorted in reverse order; every element must be shifted.

> Space Complexity

.   O(1) – Insertion Sort is an in-place algorithm; it does not require extra memory proportional to the input size.

> Stability

.   Stable – equal elements retain their original relative order.

-----------------------------------------------------------------------------------------------

SELECTION SORT

Selection Sort repeatedly finds the minimum element from the unsorted part of the array and places it at the beginning.

> How it works

1.   Divide the array into sorted and unsorted parts.

2.   Find the minimum element in the unsorted part.

3.   Swap it with the first element of the unsorted part.

4.   Repeat until the array is completely sorted.

> Time Complexity

.   Best case: O(n²) – comparisons are always needed regardless of the initial order.

.   Average case: O(n²) – many comparisons are needed.

.   Worst case: O(n²) – array sorted in reverse order.

> Space Complexity

.   O(1) – Selection Sort is an in-place algorithm.

> Stability

.   Unstable – equal elements may change their relative order during swapping

-----------------------------------------------------------------------------------------------

COUNTING SORT

Counting Sort is a non-comparison-based sorting algorithm. It counts the occurrences of each distinct element and uses cumulative counts to place elements in the correct positions. It works best for arrays with a small range of integers.

> How it works

1.   Count the occurrences of each element in the array.

2.   Compute the cumulative count (prefix sum) to determine the correct index for each element.

3.   Place elements into the output array based on cumulative counts.

4.   The algorithm can be extended to handle negative integers by adjusting the count array using the minimum value.

> Time Complexity

.   Best case: O(n + k) – occurs when the algorithm counts elements and builds the output; independent of initial order.

.   Average case: O(n + k) – works efficiently when the range k is not much larger than the number of elements n.

.   Worst case: O(n + k) – still linear with respect to n + k.

> Space Complexity

.   O(n + k) – requires additional arrays for counting and output.

When is Counting Sort efficient?

Counting Sort is more efficient than comparison-based algorithms (like Quick Sort, Merge Sort, Bubble Sort, etc.) when:

The range of input values k is relatively small compared to the number of elements n.

The input consists of integers or elements that can be mapped to integers.

Stability is required, and you want an algorithm that guarantees it in linear time.

💡 Note: For very large ranges of numbers (large k relative to n), Counting Sort may consume a lot of memory, making comparison-based algorithms more practical.
___________________________________________________________________________________________
| Algorithm          | Best Case | Average Case | Worst Case | Space Complexity | Stable? |
| ------------------ | --------- | ------------ | ---------- | ---------------- | ------- |
| **Bubble Sort**    | O(n)      | O(n²)        | O(n²)      | O(1)             | Yes     |
| **Insertion Sort** | O(n)      | O(n²)        | O(n²)      | O(1)             | Yes     |
| **Selection Sort** | O(n²)     | O(n²)        | O(n²)      | O(1)             | No      |
| **Counting Sort**  | O(n + k)  | O(n + k)     | O(n + k)   | O(n + k)         | Yes     |
-------------------------------------------------------------------------------------------