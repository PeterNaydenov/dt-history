'use strict'



function createName ( prefix, max ) {   // Creates a name from random symbols
  // Arguments 'prefix' and 'max' are optional
  // Note: 'max' doesn't include prefix length
  const 
          firstSymbol = 'abcdefghijklmnopqrstuvwxyz'
        , symbols    = 'abcdefghijklmnopqrstuvwxyz0123456789_?-!#%&~'
        , ln         = max ? max : Math.floor(Math.random() * 10) + 10
        , r          = prefix ? prefix.split() : []
        ;
  let ch = ''; 
  ch = firstSymbol[Math.floor(Math.random() * firstSymbol.length)]
  r.push ( ch )
  Array.from({length:ln-1}, () => {
                ch = symbols[Math.floor(Math.random() * symbols.length)]
                r.push ( ch )
        })
  return r.join ('')
} // createName func.



export default createName


