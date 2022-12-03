const form = document.getElementById('gameForm');
const title = document.getElementById('gameTitle');
const startDate = document.getElementById('gameDate');
const rating = document.getElementById('gameRating');
const status = document.getElementById('gameStatus');
const platform = document.getElementById('gamePlatform');
const genre = document.getElementById('gameGenre');

class Storage {
    static setStorage() {
        let storage = localStorage.setItem("game", JSON.stringify(games));
        return storage;
    }
    static getStorage() {
        let storage = localStorage.getItem("game") === null ? [] : JSON.parse(localStorage.getItem("game"))
        return storage
    }
}
let games = Storage.getStorage();
let selectedRow = null;
form.addEventListener('submit', (e) => {

    e.preventDefault();
    let game = UI.getFormData()

    if(selectedRow === null) {
        UI.addGame(game)
        games = [...games, game]

        console.log(games)

}

    else if(selectedRow !== null) {
    UI.updateGame(game)
        UI.updateArray()
        console.log(games)
        selectedRow = null

        /*game.title = title.value;
        game.startDate = startDate.value;
        game.rating =rating.value;
        game.status = status.value;
        game.platform = platform.value
        game.genre = genre.value*/
}
    Storage.setStorage()




    UI.reset()
})

class UI {
    static getFormData() {
        let formData = {};
        formData.id = Math.floor(Math.random()*1000);
        formData.title = document.getElementById('gameTitle').value;
        formData.startDate = document.getElementById('gameDate').value;
        formData.rating = document.getElementById('gameRating').value;
        formData.status = document.getElementById('gameStatus').value;
        formData.platform = document.getElementById('gamePlatform').value;
        formData.genre = document.getElementById('gameGenre').value;
        return formData

}
    static displayGames(arr) {
     let table = document.getElementById("games").getElementsByTagName("tbody")[0];
     arr.forEach(data => {
         let newRow = table.insertRow(0);

         let cell1 = newRow.insertCell(0);
         cell1.innerHTML = data.title;
         let cell2 = newRow.insertCell(1);
         cell2.innerHTML = data.startDate;
         let cell3 = newRow.insertCell(2);
         cell3.innerHTML = data.rating;
         let cell4 = newRow.insertCell(3);
         cell4.innerHTML = data.status;
         let cell5 = newRow.insertCell(4);
         cell5.innerHTML = data.platform;
         let cell6 = newRow.insertCell(5);
         cell6.innerHTML = data.genre;
         let cell7 = newRow.insertCell(6);
         cell7.innerHTML = `<button onclick="UI.onEdit(this)" value="${data.id}">Edit</button>
                       <button onclick="UI.onDelete(this)" value="${data.id}">Delete</button>`
     })
    }
    static addGame(data) {

    const table = document.getElementById('games').getElementsByTagName("tbody")[0];


        let newRow = table.insertRow(0);

        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.title;
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.startDate;
        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.rating;
        let cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.status;
        let cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.platform;
        let cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.genre;
        let cell7 = newRow.insertCell(6);
        cell7.innerHTML = `<button onclick="UI.onEdit(this)" value="${data.id}">Edit</button>
                       <button onclick="UI.onDelete(this)" value="${data.id}">Delete</button>`


        /*let cell8 = newRow.insertCell(7);
        cell8.className = "id"
        cell8.style.display = 'none';
        cell8.innerHTML = JSON.parse(data.id)*/
    }
    static reset() {
    title.value = '';
    startDate.value = '';
    rating.value = '';
    status.value = '';
    platform.value = '';
    genre.value = '';

}
static onEdit(td) {
        selectedRow = td.parentElement.parentElement;
    title.value = selectedRow.cells[0].innerHTML;
    startDate.value = selectedRow.cells[1].innerHTML;
    rating.value = selectedRow.cells[2].innerHTML;
    status.value = selectedRow.cells[3].innerHTML ;
    platform.value = selectedRow.cells[4].innerHTML ;
    genre.value = selectedRow.cells[5].innerHTML;
    td.className = "edit"
    //let btnId = JSON.parse(td.value)
    /*let btnId = JSON.parse(td.value)
    console.log(btnId)
    UI.removeGameArray(btnId)*/

}
static removeGameArray(id) {
        games = games.filter(el => el.id !== id)
    Storage.setStorage(games)
}
static updateGame(data) {
    selectedRow.cells[0].innerHTML = data.title
    selectedRow.cells[1].innerHTML = data.startDate
    selectedRow.cells[2].innerHTML = data.rating
    selectedRow.cells[3].innerHTML = data.status
    selectedRow.cells[4].innerHTML = data.platform
    selectedRow.cells[5].innerHTML = data.genre;


    //UI.updateArray(btnId, games)
   /*game.title = title.value;
    game.startDate = startDate.value;
    game.rating =rating.value;
    game.status = status.value;
    game.platform = platform.value
    game.genre = genre.value*/





}
static updateArray() {
    let btnId = JSON.parse(document.querySelector(".edit").value)
        let x = games.find(x => x.id === btnId);
        x.title = selectedRow.cells[0].innerHTML;
        x.startDate = selectedRow.cells[1].innerHTML;
        x.rating = selectedRow.cells[2].innerHTML;
        x.status = selectedRow.cells[3].innerHTML;
        x.platform = selectedRow.cells[4].innerHTML;
        x.genre = selectedRow.cells[5].innerHTML;
        return x

}

static onDelete(td) {

    if(confirm('Are you sure you want to delete record?')) {
        let row = td.parentElement.parentElement;
        document.getElementById('games').deleteRow(row.rowIndex)
        /*let id = JSON.parse(document.getElementById(td).innerText)
        console.log(id)*/
        let btnId = JSON.parse(td.value)
        console.log(btnId)
        UI.removeGameArray(btnId)
        console.log(games)
    }
    UI.reset()

}
}


window.addEventListener("DOMContentLoaded", () => {
    //Storage.getStorage()
    UI.displayGames(games);
    console.log(localStorage.getItem("game"))

})

