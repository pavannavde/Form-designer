const addInput = document.getElementById('add-input');
const addSelect = document.getElementById('add-select');
const addTextarea = document.getElementById('add-textarea');
const saveBtn = document.getElementById('save');

//event listener for buttons
addInput.addEventListener('click',()=>addElement('input'))
addSelect.addEventListener('click',()=>addElement('select'))
addTextarea.addEventListener('click',()=> addElement('textarea'))
saveBtn.addEventListener('click',()=>save())

//sample data
 let data=[
    {
        "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample placeholder"
    },
    {
        "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
        "type": "select",
        "label": "Sample Label",
        "options": ["Sample Option", "Sample Option", "Sample Option"]
    },
    {
        "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    },
    {
        "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
        "type": "textarea",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    },
]

//add element
function addElement(type){
    const id = Math.random().toString(16).slice(2);
    console.log(id)
    if(type==='input')
    {
        data.push( {
            "id": id,
            "type": "input",
            "label": "Sample Label",
            "placeholder": "Sample placeholder"
        })
    }
    else if(type==='select')
    {
        data.push( {
            "id": id,
            "type": "select",
            "label": "Sample Label",
            "options": ["Sample Option", "Sample Option", "Sample Option"]
        })
    }
    else if(type==='textarea')
    {
        data.push( {
            "id": id,
            "type": "textarea",
            "label": "Sample Label",
            "placeholder": "Sample Placeholder"
        })
    }
    CreateFormElement()
}

//remove element
function removeElement(id){
  data = data.filter((ele)=>id!==ele.id)
  CreateFormElement(); 
}

//create form elements
function CreateFormElement() {
    document.getElementById('form-container').innerHTML=''
    data.forEach(element => {
   const li = document.createElement('li');
   const div = document.createElement('div');
   const label = document.createElement('label');
   const button = document.createElement('button');
   const input = document.createElement(element.type);
   li.classList.add('form-item');
   input.classList.add('form-element');
   button.innerHTML = '<img src="./assets/delete-button-svgrepo-com.svg" alt="delete"/>';
   label.innerText = `${element.label}`;
   input.id = `${element.id}`;
   button.addEventListener('click', ()=>removeElement(`${element.id}`));
   li.setAttribute('draggable','true');
   if(element.type!=='select')
   {
      input.placeholder = `${element.placeholder}`;
   }
   if(element.type==='select')
   {
      element.options.forEach(option => {
         input.innerHTML += `<option value="${option}">${option}</option>`;
      })
   }
   div.appendChild(label);
   div.appendChild(button);
   li.appendChild(div);
   li.appendChild(input);
   document.getElementById('form-container').appendChild(li);
})
}

CreateFormElement()

//Reordering element using drag and drop 

const list = document.getElementById('form-container');

let draggedItem = null;

//ondragging the element ,get  store in draggItem
list.addEventListener('dragstart', (e) => {
  draggedItem = e.target;
});

// on dragover the element calculate where to drop and drop the element 
list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(list, e.clientY);
  const currentDragging = document.querySelector('.dragging');

  if (afterElement == null) {
    list.appendChild(draggedItem);
  } else {
    list.insertBefore(draggedItem, afterElement);
  }
});

// function to calculate where to drop
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.form-item:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}


//get  json data from form items like tag name, placehoder,label, options
function save(){
    let data = [];
    const formItems = document.querySelectorAll('.form-item');
    formItems.forEach(item => {
        const id = item.querySelector('.form-element').id;
        const type = item.querySelector('.form-element').tagName.toLowerCase();
        const label = item.querySelector('label').innerText;
        const placeholder = item.querySelector('.form-element').placeholder;
        const options = item.querySelector('.form-element').options;
        let obj={};
        if(type==='select')
        {
           const option = Array.from(options).map(option => option.value);
             obj = {
                "id": id,
                "type": type,
                "label": label,
                "options": option
            }
        }
        else{
             obj = {
                "id": id,
                "type": type,
                "label": label,
                "placeholder": placeholder
            }
        }
       
        data.push(obj)
    })
    console.log(data)
}
