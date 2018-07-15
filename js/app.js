var searchText = document.querySelector('#search-text').value;
var searchButton = document.querySelector('#search-button');
var mainDiv = document.querySelector('.spaceship-list');
var shipsDiv = document.createElement('div');
var listDiv = document.createElement('div');
listDiv.className = 'statOfShips';
shipsDiv.className = 'listOfShips';
mainDiv.appendChild(shipsDiv);
mainDiv.appendChild(listDiv);
var oneShipDiv = document.querySelector('.one-spaceship');
var sideDiv = document.createElement('div');
sideDiv.setAttribute('id', 'sideDiv');
oneShipDiv.appendChild(sideDiv);

// ide deklaráljátok a függvényeket.

// Első feladat. Növekvő sorrendbe rendezni cost alapján.
function costAscBubbleSort(arr) {
  var newArray = arr.slice();
  var length = newArray.length;
  var change;
  while (length > 0) {
    change = 0;
    for (var j = 0; j < length; j++) {
      for (var i = j + 1; i < length; i++) {
        if ( newArray[j].cost_in_credits === null) {
          newArray.push(newArray[j]);
          newArray.splice([j], 1);
        }
        if (parseInt(newArray[j].cost_in_credits, 10) > parseInt(newArray[i].cost_in_credits, 10)) {
          [newArray[j], newArray[i]] = [newArray[i], newArray[j]];

          change = j;
        }
      }
    }
    length = change;
  }
  return newArray;
}


// Második feladat. Törölni a null értékű consumables objektumokat
function deleteNullConsum(arr) {
  var newArray = arr.slice();
  for (var i = 0; i < newArray.length; i++) {
    if ( newArray[i].consumables === null) {
      newArray.splice([i], 1);
      i--;
    }
  }
  return newArray;
}
// Harmadik feladat. Null értékeket unknownra állítani. ??? Miért módosítja az eredeti tömbömet?
function nullToUnknown(arr) {
  var newArray = arr.slice();
  for ( var i = 0; i < newArray.length; i++) {
    for ( var j in newArray[i]) {
      if (newArray[i][j] === null) {
        newArray[i][j] = 'unknown';
      }
    }
  }
  return newArray;
}
// Negyedik feladat. A hajók adatainak kiíratása.
// nullToUnknown(deleteNullConsum(costAscBubbleSort(arr)));

// 6/1 feladat. 1 fős legénységgel rendelkező hajók darabszáma.
function oneManCrew(arr) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].crew === '1') {
      count++;
    }
  }
  return count++;
}

// 6/2 feladat. Legnagyobb cargo capacityvel rendelkező hajó neve.
function biggestCargo(arr) {
  var biggest = arr[0];
  var biggestModel = arr[0].model;
  for ( var i = 0; i < arr.length; i++) {
    if (arr[i].cargo_capacity > biggest.cargo_capacity) {
      arr[i].model = biggest;
    }
    return biggestModel;
  }
}

// 6/3 feladat. Az összes hajó utasainak (passengers) összesített száma
function sumPassengers(arr) {
  var shipPassengers = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].passengers > 0) {
      shipPassengers += parseInt(arr[i].passengers, 10);
    }
  }
  return shipPassengers;
}

// 6/4 feladat. A leghosszabb(lengthiness) hajó képének a neve
function longestShip(arr) {
  var longest = arr[0];
  var longestPic = arr[0].image;
  for ( var i = 0; i < arr.length; i++) {
    if (arr[i].lengthiness > longest.lengthiness) {
      longest = arr[i];
    }
  }
  return longestPic;
}


// 7. feladat. Model szerinti keresés.

// ABCbe rendezés
function modelAscSort(arr) {
  var length = arr.length;
  var change;
  while (length > 0) {
    change = 0;
    for (var j = 0; j < length; j++) {
      for (var i = j + 1; i < length; i++) {
        if (arr[j].model.toLowerCase() > arr[i].model.toLowerCase()) {
          [arr[j], arr[i]] = [arr[i], arr[j]];

          change = j;
        }
      }
    }
    length = change;
  }
  return arr;
}

// keresés

function modelSearch(key, arr) {
  var message = [];
  var array = modelAscSort(arr);
  var input = key.toLocaleLowerCase();
  for ( var i = 0; i < array.length; i++) {
    if (array[i].model.toLocaleLowerCase().indexOf(input) !== -1) {
      message = array[i];
      return message;
      console.log(array[i]);
    }
  }
  console.log('Nincs ilyen hajó');
}

function showOneShip(arr) {
  var message = '';
  for (var i in arr) {
    message += `${[i]} : ${arr[i]} <br>`;
  }
  message += `<img src=${'/img/' + arr.image} alt="star-wars-ship" onerror="this.src= '/img/error.jpg'">`;

  return message;
}

// Megjelenítés
function displayArray(shipsToDisplay) {
  var message = '';
  for (var i = 0; i < shipsToDisplay.length; i++) {
    message += `<div onclick="sideDivDisplay(this)" id="ship${shipsToDisplay[i].id}">`;
    message += `${displayObject(shipsToDisplay[i])} <br>`;
    message += `<img src=${'/img/' + shipsToDisplay[i].image} alt="star-wars-ship" onerror="this.src = '/img/error.jpg'"><br>`;
    message += '</div><hr>';
  }
  return message;
}

function sideDivDisplay(elem) {
  var info = document.querySelector(`#${elem.id}`);
  document.querySelector('#sideDiv').innerHTML = info.innerHTML;
  console.log(info);
}

function  displayObject(arr) {
  var message = '';
  for (var i in arr) {
    message += `${[i]} : ${arr[i]} <br>`;
  }
  return message;
}


/* document.querySelector('#ship29').addEventListener('click', function () {
  document.querySelector('.one-spaceship').innerHTML = 'mukodjTeSzar';
});*/

//---------------------------
function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  // console.log(userDatas);
  // console.log(costAscBubbleSort(userDatas, 'cost_in_credits'));
  // console.log(deleteNullConsum(userDatas, 'consumables'));
  // console.log(nullToUnknown(userDatas));
  // console.log(shipsDatas(userDatas));
  // console.log(oneManCrew(userDatas, 'crew'));
  // console.log(biggestCargo(userDatas, 'cargo_capacity'));
  // console.log(sumPassengers(userDatas, 'passengers'));
  // console.log(longestShip(userDatas, 'lengthiness'));
  // console.log(modelSearch('Modifie', userDatas));
  // odelSearch('modif', userDatas);
  // console.log(displayArray(modelAscSort(userDatas)));
  document.querySelector('.listOfShips').innerHTML = displayArray(nullToUnknown(deleteNullConsum(costAscBubbleSort(userDatas))));
  document.querySelector('.statOfShips').innerHTML =
  'Number of one man crew ships: ' + '<b>' + oneManCrew(userDatas) + '</b>' + '<br>' +
  'Ship with the biggest cargo capacity: '  + '<b>' + biggestCargo(userDatas) + '</b>' + '<br>' +
  'Summa passengers: ' + '<b>' + sumPassengers(userDatas) + '</b>' + '<br>' +
  'Picture name of the longest ship ever: ' + '<b>' + longestShip(userDatas) + '</b>';
  document.querySelector('#sideDiv').innerHTML = showOneShip(modelSearch('modi', userDatas));
}
getData('/json/spaceships.json', successAjax);


