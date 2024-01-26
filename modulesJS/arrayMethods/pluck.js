module.exports = function pluck (arr, path) {
  const pathSplit = path.split('.')
  return arr.map(item => {
    let sliceData = item
    for (const data of pathSplit) {
      sliceData = sliceData[data]
    }
    return this.make(sliceData)
  })
}
