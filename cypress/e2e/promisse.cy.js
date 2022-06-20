it('Callback e Promises', () => {

})
//Utilizando 'callback'

const getSomethingCallback = callback => {
  setTimeout(() => {
    callback(1)
  }, 1000)
}

const systemCallback = () => {
  console.log("Function 'systemCallback' init")
  getSomethingCallback(something => {
    console.log(`the value of 'getSomethingCallback' is ${something}`)
    console.log("Function 'systemCallback' ended")
  }) 
}

//Utilizando 'async' e 'await' - Promises

function getSomethingAsync(){
  return new Promise((resolve, reject) =>{
      setTimeout(() => resolve(2) , 1000)
  })
}

const systemAsync = async() => {
  console.log("Function 'systemAsync' init")
  const something = await getSomethingAsync()
  console.log(`the value of 'getSomethingAsync' is ${something}`)
  console.log("Function 'systemAsync' ended")
  
}

//Utilizando 'then' - Promises

function getSomethingThen(){
  return new Promise((resolve, reject) =>{
      setTimeout(() => resolve(3) , 1000)
  })
}

const systemThen = () => {
  console.log("Function 'systemThen' init")
  getSomethingThen().then((something) => {
    console.log(`the value of 'getSomethingThen' is ${something}`)
    console.log("Function 'systemThen' ended")
  })
}

systemCallback();

systemAsync();

systemThen();