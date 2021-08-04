let L1 = function () {
  ctx = this
  console.log(this, 'L1')
  return function L2 () {
    console.log(this, 'L2')
    return function L3 () {
      console.log(this, 'L3')
      return function L4 () {
        console.log(this, 'L4')
      }.bind(ctx)
    }.bind(ctx)
  }.bind(ctx)
}.bind({ ctx2: { L: 2 }, ctx3: { L: 3 }, ctx4: { L: 4 } })

L1()()()()

// { ctx2: { L: 2 }, ctx3: { L: 3 }, ctx4: { L: 4 } } L1
// { ctx2: { L: 2 }, ctx3: { L: 3 }, ctx4: { L: 4 } } L2
// { ctx2: { L: 2 }, ctx3: { L: 3 }, ctx4: { L: 4 } } L3
// { ctx2: { L: 2 }, ctx3: { L: 3 }, ctx4: { L: 4 } } L4