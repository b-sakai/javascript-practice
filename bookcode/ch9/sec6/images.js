// echo -n

'use strict'

const loadImage = url => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    const callback = () => {
      if (request.status == 200) { 
        const blob = new Blob([request.response], {type: 'image/png'})
        const img = document.createElement('img')
        img.src = URL.createObjectURL(blob)
        resolve(img)
      } else {
        reject(Error(`${request.status}: ${request.statusText}`))
      }
    }

    request.open('GET', url)
    request.responseType = 'blob'
    request.addEventListener('load', callback)
    request.addEventListener('error', event => reject(Error('Network error')));
    request.send()
  })  
}

const brokenImage = () => { 
  const uri = 'data:image/png;base64,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
  const img = document.createElement('img')
  img.setAttribute('src', uri)
  return img
}

document.addEventListener('DOMContentLoaded', () => {  
  // then method call with rejection handler
  {
    const imgdiv = document.getElementById('images1')

    const url = '../../hanafuda/1-1.png'    
    loadImage(url)
      .then(
        img => { // Promise has settled
          imgdiv.appendChild(img)
        },
        reason => { // Promise was rejected
          console.log({reason})
          imgdiv.appendChild(brokenImage())
        })
  }
  {
    const imgdiv = document.getElementById('images2')

    const url = '../../hanafud/1-1.png'    
    loadImage(url)
      .then(
        img => { // Promise has settled
          imgdiv.appendChild(img)
        },
        reason => { // Promise was rejected
          console.log({reason})
          imgdiv.appendChild(brokenImage())
        })
  }
  
  
  // Usually better to use the catch method
  {
    const imgdiv = document.getElementById('images3')
    
    const url = '../../hanafuda/1-1.png'    
    loadImage(url)
      .then(
        img => { // Promise has settled
          imgdiv.appendChild(img)
        })
      .catch(
        reason => { // A prior promise was rejected
          console.log({reason})
          imgdiv.appendChild(brokenImage())
        })
  }
  {
    const imgdiv = document.getElementById('images4')

    const url = '../../hanafud/1-1.png'    
    loadImage(url)
      .then(
        img => { // Promise has settled
          imgdiv.appendChild(img)
        })
      .catch(
        reason => { // A prior promise was rejected
          console.log({reason})
          imgdiv.appendChild(brokenImage())
        })
  }

  // Pipeline with single catch
  {
    const imgdiv = document.getElementById('images5')
    
    const url1 = '../../hanafuda/1-1.png'    
    const url2 = '../../hanafud/1-1.png'    
    Promise.resolve()
      .then(() => loadImage(url1))
      .then(img => imgdiv.appendChild(img)) 
      .then(() => loadImage(url2))
      .then(img => imgdiv.appendChild(img)) 
      .catch(reason => console.log({reason}))
  }
  {
    const imgdiv = document.getElementById('images6')
    
    const url1 = '../../hanafud/1-1.png'    
    const url2 = '../../hanafuda/1-1.png'    
    Promise.resolve()
      .then(() => loadImage(url1))
      .then(img => imgdiv.appendChild(img)) 
      .then(() => loadImage(url2))
      .then(img => imgdiv.appendChild(img)) 
      .catch(reason => console.log({reason}))
  }

  // The finally method
  {
    const imgdiv = document.getElementById('images7')

    const doCleanup = text => imgdiv.appendChild(document.createTextNode(text))

    const url = '../../hanafuda/1-1.png'    
    Promise.resolve()
      .then(() => loadImage(url))
      .then(img => imgdiv.appendChild(img)) 
      .finally(() => { doCleanup('All done. ') })
      .catch(reason => console.log({reason}))
  }
  {
    const imgdiv = document.getElementById('images8')

    const doCleanup = text => imgdiv.appendChild(document.createTextNode(text))

    const url = '../../hanafud/1-1.png'    
    Promise.resolve()
      .then(() => loadImage(url))
      .then(img => imgdiv.appendChild(img)) 
      .finally(() => { doCleanup('All done. ') })
      .catch(reason => console.log({reason}))
  }      
})
