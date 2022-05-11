const draggableList =  document.getElementById('draggable-list')
const check = document.getElementById('check')

const prime59 = [ 2, 3, 5, 7, 13, 29, 2, 3, 5, 7, 13, 29, 2, 3, 5, 7, 13, 29, 2, 3, 5, 7, 13, 29, 2, 3, 5, 7, 13, 29, 2, 3, 5, 7, 13, 29 ]

//store items 
const listItems = []

let dragStartIndex 

createList()


//Insert numbers into DOM
function createList() {
  [...prime59]
  //We are setting a random number for all the values within the Prime 59 Array 
  .map(a => ({value: a, sort: Math.random() }))
  //Sorting the values based on the ascending random values 
  .sort((a,b) => a.sort - b.sort)
  //This will map it back to an array for strings 
  .map(a => a.value)
  .forEach((person, index) => {
 
    const listItem  = document.createElement('li')

    listItem.setAttribute('data-index', index)
    listItem.innerHTML = `
        <span class="number">${index}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        </div>`

    listItems.push(listItem)
    draggableList.appendChild(listItem)
  
  })
}

