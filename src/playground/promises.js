const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'Eric',
      age: 22
    })
    // reject('something went wrong.')
  }, 1000)
})

console.log('before')

promise
  .then(data => {
    console.log('1', data)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('other promise')
      }, 3000)
    })
  })
  .then(str => console.log('does this run?', str))
  .catch(e => {
    console.log('error:', e)
  })

console.log('after')
