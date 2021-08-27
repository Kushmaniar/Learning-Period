


function getAndUpdate() {
    console.log("Updating List...");
    comp = document.getElementById('comp').checked;
    titl = document.getElementById('title').value;
    dat = document.getElementById('dat').value;
    tim = document.getElementById('tim').value;
    min = document.getElementById('minutes').value;
    if (titl.length&&dat.length&&tim.length&&min.length) 
    {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push({
            titl, dat, tim, min, comp
        });
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push({
            titl, dat, tim, min, comp
        });
        itemJsonArray.sort((a, b) => {
            return new Date(a.dat) - new Date(b.dat);
        });
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
    comp = document.getElementById('comp').checked =false;
    titl = document.getElementById('title').value=null;
    dat = document.getElementById('dat').value =null;
    tim = document.getElementById('tim').value =null;
    min = document.getElementById('minutes').value =null;
}
else{
    alert("invalid entry");
}
}
function update() {

    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // Populating the table with the entry from users
    let tableBody = document.getElementById("tableBody");
    let str = "";

    console.log(itemJsonArray);
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${element.titl}</td>
            <td>${element.dat}</td> 
            <td>${element.tim}</td>  
            <td>${element.min}</td>
            <td><button class="but" onclick="completed(${index})"><i class="fas fa-plus"></i></button>
            
            <button class="but" onclick="deleted(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg></button></td> 
            </tr>`;
    });
    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

var d= new Date();
console.log(d.getHours());
console.log(d.getMinutes());


//function to update list and add overall time after a certain task is completed
function completed(itemIndex) {
    console.log("completed");
    let min = document.getElementById('minu').innerHTML;
    let arr = JSON.parse(localStorage.getItem("itemsJson"));
    let arr1 = arr.filter((obj, index) => index != itemIndex)
    let arr2 = arr.filter((obj, index) => index == itemIndex)
    if (arr2.length) {
        min = Number(min) + Number(arr2[0].min);
        document.getElementById("minu").innerHTML = min;
    }
    localStorage.setItem('itemsJson', JSON.stringify(arr1));
    update();
}

//function to delete a certain task
function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    let itemJsonArrayStr = localStorage.getItem('itemsJson')
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    let arr2 = itemJsonArray.filter((obj, index) => index == itemIndex);
    console.log(arr2)
    if (arr2.length) {
        if (arr2[0].comp) {
            alert("the task cannot be deleted since it is compulsory")
        }
        else {
            itemJsonArray.splice(itemIndex, 1);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            update();
        }
    }


}
//function to clear the whole list
function clearStorage() {
    if (confirm("Do you really want to clear?")) {
        console.log("Storage cleared");
        localStorage.clear();
        let minu = document.getElementById("minu");
        minu.innerHTML= "0";
        update();
    }
}