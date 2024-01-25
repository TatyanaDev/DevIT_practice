const arr = [
  [1, 2, 3, 4, 5],
  [2, 4, 6, 8, 10],
  [3, 6, 9, 12, 15],
  [4, 8, 12, 16, 20],
  [5, 10, 15, 20, 25]
]

function Create_mirror (arr) {
  const copy = JSON.parse(JSON.stringify(arr))
  return {
    mirrorX: function () {
      return copy
        .reverse()
        .map(subArr => subArr.reverse())
        .reverse()
    },
    mirrorY: function () {
      return copy.reverse()
    },
    mirror: function () {
      return copy.reverse().map(subArr => subArr.reverse())
    }
  }
}

const create = new Create_mirror(arr)

// console.log('mirrorX', create.mirrorX())
// mirrorX [
//   [ 5, 4, 3, 2, 1 ],
//   [ 10, 8, 6, 4, 2 ],
//   [ 15, 12, 9, 6, 3 ],
//   [ 20, 16, 12, 8, 4 ],
//   [ 25, 20, 15, 10, 5 ]
// ]

// console.log('mirrorY', create.mirrorY())
// mirrorY [
//   [ 5, 10, 15, 20, 25 ],
//   [ 4, 8, 12, 16, 20 ],
//   [ 3, 6, 9, 12, 15 ],
//   [ 2, 4, 6, 8, 10 ],
//   [ 1, 2, 3, 4, 5 ]
// ]

// console.log('mirror', create.mirror())
// mirror [
//   [ 25, 20, 15, 10, 5 ],
//   [ 20, 16, 12, 8, 4 ],
//   [ 15, 12, 9, 6, 3 ],
//   [ 10, 8, 6, 4, 2 ],
//   [ 5, 4, 3, 2, 1 ]
// ]
