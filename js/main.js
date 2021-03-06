const draggableList =  document.getElementById('draggable-list')
const check = document.querySelector('#checkID')
const restart = document.querySelector('#restart')

check.addEventListener('click', checkOrder)
restart.addEventListener('click', siteReload)

function siteReload(){
  window.location.reload();
}

const winningCombinations = [
  [2,3,5,7,13,29],
  [2,3,5,7,19,23], 
  [2,3,5,13,17,19], 
  [2,3,7,11,13,23], 
  [2,3,7,11,17,19], 
  [2,3,5,7,11,31]
]

let chosenCombo = winningCombinations[(Math.floor(Math.random() * (5 + 1)))]
let randomizeChosenCombo = chosenCombo
.map(a => ({value: a, sort: Math.random() }))
.sort((a,b) => a.sort - b.sort)
.map(a => a.value)



const resultMatrix =  solutionMatrix(randomizeChosenCombo)

function solutionMatrix(randomizeChosenCombo){
 let arr = []
  for(let i=1; i<randomizeChosenCombo.length; i++){
    arr.push(randomizeChosenCombo.slice(i).concat(randomizeChosenCombo.slice(0,i) ) )
  }
  return arr
}
 

const prime59 = randomizeChosenCombo.concat(resultMatrix[0]).concat(resultMatrix[1]).concat(resultMatrix[2]).concat(resultMatrix[3]).concat(resultMatrix[4]) 
 

//store items 
const listItems = []

let dragStartIndex 
 
createList()

   
//Insert numbers into DOM
function createList() {

  let firstSix = [...prime59].slice(0,6)
  let nextSixty = [...prime59].slice(6)
  .map(a => ({value: a, sort: Math.random() }))
  .sort((a,b) => a.sort - b.sort)
  .map(a => a.value)
  let newArr = firstSix.concat(nextSixty)

  newArr
  .forEach((person, index) => {
 
    const listItem  = document.createElement('li')

    // <span class="number">${index}</span>
    listItem.setAttribute('data-index', index)
    listItem.innerHTML = `
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        </div>`
  
    listItems.push(listItem)
    draggableList.appendChild(listItem)
  
  })

  addEventListeners()
}

 

 



function checkOrder(){
  listItems.forEach((item, index) => {
    let number = item.querySelector('.draggable').innerText.trim()

    if(Number(number) == Number(prime59[index]))
    {
      item.classList.add('right')
    }
    else {
      item.classList.remove('right')
      item.classList.add('wrong')
    }
  })
}


function dragStart(){
  // console.log("start")
  //closest is a js method 
  dragStartIndex = +this.closest('li').getAttribute('data-index')
  console.log(dragStartIndex)
}


function dragOver(e){
  // console.log("over")
  e.preventDefault()

}

function dragDrop(){
  // console.log("drop")
  const dragEndIndex = +this.getAttribute('data-index')
  // console.log(dragEndIndex)
  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove('over')

}

function swapItems(dragStartIndex, dragEndIndex){
 const itemOne = listItems[dragStartIndex].querySelector('.draggable')
 const itemTwo = listItems[dragEndIndex].querySelector('.draggable')
//  console.log(itemOne, itemTwo)
 listItems[dragStartIndex].appendChild(itemTwo)
 listItems[dragEndIndex].appendChild(itemOne)

}

function dragEnter(){
  // console.log("enter")
  this.classList.add('over')
}

function dragLeave(){
  // console.log("leave")
  this.classList.remove('over')

}




function addEventListeners(){
  const draggables = document.querySelectorAll('.draggable')
  const dragListItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart)
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })


}


