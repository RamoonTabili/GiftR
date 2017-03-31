let people = [];
let gifts = [];
let contentDiv = document.querySelector(".content");
let idd = contentDiv.id;
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Start this shit. -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
if (document.deviceready) {
    document.addEventListener('deviceready', onDeviceReady); // This is a device.
}
else {
    document.addEventListener('DOMContentLoaded', onDeviceReady); // This is without a device.
}

function onDeviceReady() {
    console.log("App initiated!");
    
    if (!localStorage.getItem("giftr-tabi0011")) {
        console.log("Creating the first person!");
        let personT = {
            id: 1,
            name: "Night Lovell",
            dob: "2000-12-1",
            ideas: []
        };
        people.push(personT);
        localStorage.setItem("giftr-tabi0011", JSON.stringify(people));
    }
    
    tabSwitch();
}

function tabSwitch() {
    window.addEventListener('push', function(ev){
        contentDiv = document.querySelector(".content");
        idd = contentDiv.id;
        switch(idd){
            case 'people':
                loadPeople();
                console.log('You are on the home page');
                break;
            case 'gifts':
                loadGifts();
                console.log('You are on the other page');
                break;
            default:
                alert('What did you do?');
        }
    });
    if (idd == "people") {
        loadPeople();
        console.log("Loading peeps.");
    }
    else {
        loadGifts();
        console.log("loading gifts.");
    }
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- List the people. -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function loadPeople() {
    
    people = JSON.parse(localStorage.getItem("giftr-tabi0011"));
    console.log(people);
    people.sort(compare);
    
    let ul = document.getElementById("list");
    ul.innerHTML = "";
    people.forEach(function (value) {
        
        let li = document.createElement("li");
        li.className = "table-view-cell";
        
        let span1 = document.createElement("span");
        span1.className = "name";
        let aa = document.createElement("a");
        aa.textContent = value.name;
        
        let ab = document.createElement("a");
        ab.className = "navigate-right pull-right personSelect";
        ab.setAttribute("name", value.name);
        ab.href = "gifts.html";
        let span2 = document.createElement("span");
        span2.className = "dob";
        span2.textContent = moment(value.dob).format('MMMM Do');
    
        ul.appendChild(li);
        li.appendChild(span1);
        li.appendChild(ab);
        span1.appendChild(aa);
        ab.appendChild(span2);
        
    });
    
    let selBtn = document.querySelectorAll(".personSelect");
    selBtn.forEach(function (value) {
        value.addEventListener("touchend", seletePerson);
    });
    let delBtn = document.querySelectorAll(".personDel");
    delBtn.forEach(function (value) {
        value.addEventListener("click", deletePerson);
    });
    let editBtn = document.querySelectorAll(".name");
    editBtn.forEach(function (value) {
        value.addEventListener("click", editPerson);
    });
    let addBtn = document.querySelectorAll(".addPeep");
    addBtn.forEach(function (value) {
        value.addEventListener("click", addPerson);
    });
    let canBtn = document.querySelectorAll(".personCancel");
    canBtn.forEach(function (value) {
        value.addEventListener("click", cancelPerson);
    });
    
    console.log("Peeps loaded.");
}

function deletePerson(ev) {
    ev.preventDefault();
    console.log(index);
    if (index > -1) {
        people.splice(index, 1);
    }
    console.log(people);
    if (people.length > 0) {
        localStorage.setItem("giftr-tabi0011", JSON.stringify(people));
    }
    else {
        localStorage.removeItem("giftr-tabi0011");
    }
    console.log("Peep deleted.");
    document.getElementById("personModal").classList.remove("active");
    document.querySelector(".personSave").removeEventListener("click", editSave);
    
    loadPeople();
}
function editPerson(ev) {
    console.log("Editing peeps.");
    ev.preventDefault();
    let li = ev.currentTarget.parentElement;
    let personName = li.querySelector("a").textContent;
    index = -1;
    for (let i = 0; i < people.length; i++) {
        if (people[i].name == personName) {
            index = i;
            console.log(index);
            break;
        }
    }
    document.getElementById("personModal").classList.add("active");
    document.querySelector(".modalHeader").textContent="Edit Contact";
    document.getElementById("name").value = people[index].name;
    document.getElementById("date").value = people[index].dob;
    document.querySelector(".personSave").addEventListener("click", editSave);
}
function addPerson(ev) {
    console.log("Adding peeps.");
    ev.preventDefault();
    index = -1;
    document.getElementById("personModal").classList.add("active");
    document.querySelector(".modalHeader").textContent="Add Contact";
    document.querySelector("#name").value = "";
    document.querySelector("#date").value = "";
    document.querySelector(".personSave").addEventListener("click", addSave);
}

function editSave() {
    
    if (document.querySelector("#name").value == "" || document.querySelector("#date").value == "") {
        alert("You need to fill out both fields dude.");
    }
    else {
        people[index].name = document.getElementById("name").value;
        people[index].dob = document.getElementById("date").value;
        document.getElementById("personModal").classList.remove("active");
        localStorage.setItem("giftr-tabi0011", JSON.stringify(people));
        document.querySelector(".personSave").removeEventListener("click", editSave);
        
        loadPeople();
    }
}
function addSave(ev) {
    ev.preventDefault();
    
    let id = people.length;
    id++;
    
    if (document.querySelector("#name").value == "" || document.querySelector("#date").value == "") {
        alert("You need to fill out both fields dude.");
    }
    else {
        let newPerson = {
            id: id,
            name: document.querySelector("#name").value,
            dob: document.querySelector("#date").value,
            ideas: []
        };
        console.log(id);
        people.push(newPerson);
        
        document.getElementById("personModal").classList.remove("active");
        localStorage.setItem("giftr-tabi0011", JSON.stringify(people));
        document.querySelector(".personSave").removeEventListener("click", addSave);
        
        loadPeople();
    }
}

function cancelPerson() {
    console.log("Canceling the save button.");
    document.getElementById("personModal").classList.remove("active");
    document.querySelector(".personSave").removeEventListener("click", addSave);
    document.querySelector(".personSave").removeEventListener("click", editSave);
}

function seletePerson(ev) {
    ev.preventDefault();
    let li = ev.currentTarget.parentElement;
    let personName = li.querySelector(".personSelect").getAttribute("name");
    index = -1;
    console.log(personName);
    for (let i = 0; i < people.length; i++) {
        if (people[i].name == personName) {
            index = i;
            console.log(index);
            break;
        }
        console.log(personName);
    }
//    loadGifts();
}

function compare(a, b) {
    if (a.dob.substring(5) < b.dob.substring(5)) return -1;
    if (a.dob.substring(5) > b.dob.substring(5)) return 1;
    return 0;
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- List the gifts. -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function loadGifts() {
    document.querySelector(".nameHere").textContent = people[index].name;
    
    gifts = people[index].ideas;
    console.log(gifts);
    
    let ul = document.getElementById("list");
    ul.innerHTML = "";
    gifts.forEach(function (value) {

        let li = document.createElement("li");
        li.className = "table-view-cell";
        
        let trash = document.createElement("span");
        trash.className = "pull-right icon icon-trash delGift";
        
        let div = document.createElement("div");
        div.className = "gift-name";
        div.textContent = value.idea;
        let store = document.createElement("p");
        store.textContent = value.at;
        let url = document.createElement("a");
        url.className = "url";
        url.href = "https://" + value.url;
        url.textContent = value.url;
        let cost = document.createElement("p");
        cost.className = "cost";
        cost.textContent = value.cost;
    
        ul.appendChild(li);
        li.appendChild(trash);
        li.appendChild(div);
        div.appendChild(store);
        div.appendChild(url);
        div.appendChild(cost);
        
    });
    
    let delBtn = document.querySelectorAll(".delGift");
    delBtn.forEach(function (value) {
        value.addEventListener("click", delGift);
    });
    let addBtn = document.querySelectorAll(".addGift");
    addBtn.forEach(function (value) {
        value.addEventListener("click", addGift);
    });
    let canBtn = document.querySelectorAll(".giftCancel");
    canBtn.forEach(function (value) {
        value.addEventListener("click", cancelGift);
    });
    
    console.log("Gifts loaded.");
}

function delGift(ev) {
    ev.preventDefault();
    let li = ev.currentTarget.parentElement;
    let giftName = li.querySelector(".gift-name").textContent;
    console.log(giftName);
    console.log(gifts.length);
    index2 = -1;
    for (let i = 0; i < gifts.length; i++) {
        let nameGift = gifts[i].idea + gifts[i].at + gifts[i].url + gifts[i].cost;
        console.log(nameGift);
        if (nameGift == giftName) {
            index2 = i;
            break;
        }
    }
    console.log(index2);
    if (index2 > -1) {
        gifts.splice(index2, 1);
    }
    console.log(gifts);
    li.parentElement.removeChild(li);
    localStorage.setItem("giftr-tabi0011", JSON.stringify(people));
    console.log("Gift deleted.");
    loadGifts();
    console.log(people);
}
function addGift(ev) {
    console.log("Adding gifts.");
    ev.preventDefault();
    document.getElementById("giftModal").classList.add("active");
    document.querySelector("#idea").value = "";
    document.querySelector("#store").value = "";
    document.querySelector("#url").value = "";
    document.querySelector("#cost").value = "";
    document.querySelector(".giftSave").addEventListener("click", addSave2);
}

function addSave2(ev) {
    ev.preventDefault();
    
    if (document.querySelector("#idea").value == "") {
        alert("What's the idea called?");
    }
    else {
        let newGift = {
            idea: document.querySelector("#idea").value,
            at: document.querySelector("#store").value,
            url: document.querySelector("#url").value,
            cost: document.querySelector("#cost").value
        };
        
        gifts.push(newGift);
        
        document.getElementById("giftModal").classList.remove("active");
        localStorage.setItem("giftr-tabi0011", JSON.stringify(people));
        document.querySelector(".giftSave").removeEventListener("click", addSave2);
        loadGifts();
        console.log("Gift added!");
    }
}

function cancelGift() {
    console.log("Canceling the save button.");
    document.getElementById("giftModal").classList.remove("active");
    document.querySelector(".giftSave").removeEventListener("click", addSave2);
}