fn = v => {
  let memory = []
  memory.push(v)
  const fn2 = (...v) => {
    if (v.length) {
      memory.push(...v)
      return fn2
    } else {
      const res = memory
      memory = Array.from(memory)
      return res
    }
  }
  return fn2
}

const x = fn('1')('2')('3')('4')

// x('5')() //[ '1', '2', '3', '4', '5' ]
