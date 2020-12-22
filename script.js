// create my database
let allMyPlants = [];
// create super class
class Flower {
    constructor(id, name, image, wetDay, location, age, fertilizer){
        this.id = id;
        this.name = name;
        this.image = image;
        this.wetDay = wetDay;
        this.location = location;
        this.age = age;
        this.fertilizer = fertilizer;
    };

    static flowersOwner(){
        return "Marius Pascalau"
    };
}

const flower1 = new Flower(1, 'Lily', 'flower-1', 'Monday', 'home', 3, true);
const flower2 = new Flower(8, 'Mili', 'flower-2', 'Thursday', 'outside', 7, true);
const flower3 = new Flower(9, 'Wini', 'flower-3', 'Friday', 'home', 5, true);
allMyPlants.push(flower1, flower2, flower3);
console.log(flower1);

// create sub-class
class Muscate extends Flower {
    constructor(id, name, image, wetDay, location, age, fertilizer, seasonal){
        super(id, name, image, wetDay, location, age, fertilizer);
        this.seasonal = seasonal;
    }
}

const muscata1 = new Muscate(2, 'Rosa1', 'muscate-1', 'Monday', 'balconyOne', 3, true, true);
const muscata2 = new Muscate(3, 'Rosa2', 'muscate-2', 'Thursday', 'inside', 5, false, true);
const muscata3 = new Muscate(5, 'Rosa3', 'muscate-3', 'Monday', 'balconyTwo', 4, true, false);

allMyPlants.push(muscata1, muscata2, muscata3 );

// create sub-class
class Cactusi extends Flower {
    constructor(id, name, image, wetDay, location, age, fertilizer, blosom){
        super(id, name, image, wetDay, location, age, fertilizer);
        this.blosom = blosom;
    };
};

const cactus1 = new Cactusi (5, 'Cactus1', 'cactus-1', 'Sameday', 'balconyOne', 1, true, false);
const cactus2 = new Cactusi (6, 'Cactus2', 'cactus-2', 'Tuesday', 'inside', 4, false, true);
const cactus3 = new Cactusi (7, 'Cactus3', 'cactus-3', 'Tuesday', 'balconyOne', 1, false, false);

allMyPlants.push(cactus1, cactus2, cactus3);

console.log(allMyPlants);
// console.log(allMyPlants[0].id);

// display all flowers on web-page

const allFlowersDOM = document.querySelector('.allFlowers');

function displayFlowers(arr){
    let result = '';
    arr
    .sort((a,b) => (a.id < b.id) ? -1 : 1)
    .forEach(flower =>{
        result += `
        <div class="flower">
            <h3>${flower.name}</h3>
            <h4>ID : ${flower.id}</h4>
            <div class="image">
                <img src="images/${flower.image}.jpg" alt="cactus-1">
            </div>
            <div class="wetDay">I need water on: <strong>${flower.wetDay}</strong></div>
            <div class="age"> Age : ${flower.age}</div>
            <div class="fertilizer">Fertilizer : <strong>${flower.fertilizer}</strong></div>
            
        </div>
        `
    })
    return allFlowersDOM.innerHTML = result;
}

displayFlowers(allMyPlants);

// check duplicate id
function findDuplicate(arr){
    let object = {}
    let result = [];
    arr.forEach(elem => {
        if(object[elem.id]){
            object[elem.id] += 1;
        } else {
            object[elem.id] = 1;
        }
    });
    for(let prop in object){
        if(object[prop] >= 2){
            result.push(prop)
        }
    };
    console.log(result);
    
    let elemWithDoubleId = result.map(function(item){
        return arr.filter(elem => elem.id == item)
    });
    return elemWithDoubleId;   
};

let duplicateId = findDuplicate(allMyPlants);
let duplicateArr = duplicateId[0];
console.log(duplicateArr);

setTimeout(function(){
    if(duplicateArr.length > 0){
        alert('You have many flowers with same ID !')
    }
}, 3000);

//display flower with duplicate ID
const duplicateIdDOM = document.querySelector('.duplicateID');
function duplicateID(arr){
    let result = '';
    arr.forEach(flower =>{
        result +=`
            <tr>
                <td class="name">${flower.name}</td>
                <td>${flower.id}</td>
                <td>
                <div class="buttons">
                    <button class="yes">YES</button>
                </div>
                </td>
            </tr>
        `
    })
    return duplicateIdDOM.innerHTML = result;
}
duplicateID(duplicateArr)

// find flowers that need water today
let today = new Date();
let wettingDay = today.getDay(); // 0, 1, 2, 3, 4, 5, 6, 7

let wetDay = '';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

weekDays.forEach(elem => {
    if(weekDays.indexOf(elem) === wettingDay){
        wetDay = elem;
    }
})
console.log(wetDay);

const needWaterToday = allMyPlants.filter(elem => elem.wetDay === wetDay);

console.log(needWaterToday);

// display flowers that needs water today
let needWaterDOM = document.querySelector('.needWater');

function needsWaterToday(arr){
    let result = '';
    arr.forEach(flower =>{
        result += `
        
        <div class="flower">
            <h3>${flower.name}</h3>
            <h4>ID : ${flower.id}</h4>
            <div class="image">
                <img src="images/${flower.image}.jpg" alt="cactus-1">
            </div>
            <div class="wetDay">I need water on: <strong>${flower.wetDay}</strong></div>
            <div class="todayWet">
                <p>Did I wet it today ?<p>
                <div class="buttons">
                    <button class="yes">YES</button>
                </div>
            </div>
        </div>
        
        `
    })
    return needWaterDOM.innerHTML = result;
}

needsWaterToday(needWaterToday);

// status of flowers, regarding water
Flower.prototype.isWet = false;

// delete flower from urgent list, after we wet the flower
const btnsYes = [...document.querySelectorAll('.yes')];

btnsYes.forEach(button => {
    button.addEventListener('click', event => { 
        event.target.parentElement.parentElement.parentElement.remove();
        //this works too
        // event.target.parentElement.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement.parentElement); 
        
    })
})

setTimeout(function(){console.log(allMyPlants)}, 5000);

// hide title needWater, show title noWater
const noNeedWaterDOM = document.querySelector('.fromBeginning');
const flowersNeedWaterDOM = document.querySelector('.flowersNeedWater');
const btnConfirmDOM = document.querySelector('.confirmWater');

// check at beggining of day
if(!needWaterDOM.firstChild){
    noNeedWaterDOM.classList.remove('invisible');
    noNeedWaterDOM.classList.add('visible');
    flowersNeedWaterDOM.classList.add('invisible');
    btnConfirmDOM.classList.add('invisible'); 
}

// change status after we click 'YES' at each plant and 'Confirm'
btnConfirmDOM.addEventListener('click', function(){
    const needWaterDOM1 = document.querySelector('.needWater');
    const afterWetting = document.querySelector('.afterWetting');
    let flowerTest = needWaterDOM.getElementsByClassName('flower');
    console.log(flowerTest);
    if(needWaterDOM1.getElementsByClassName('flower').length == 0){
        afterWetting.classList.remove('invisible');
        afterWetting.classList.add('visible');
        flowersNeedWaterDOM.classList.add('invisible');
        btnConfirmDOM.classList.add('invisible');
    } 
});


// de facut : - de introdus item nou de catre utilizator
