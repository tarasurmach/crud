/*
let form = document.getElementById('form');

const fullName = document.getElementById('fullName');
const empCode = document.getElementById('empCode');
const salary = document.getElementById('salary');
const city = document.getElementById('city');

let employees = [];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let employee = new Employee(fullName.value, empCode.value, salary.value, city.value);
    employees.push(employee);
    console.log(employees);
    UI.displayEmployee(employee)

});


class Employee {
    constructor(fullName, empCode, salary, city) {
        this.fullName = fullName;
        this.empCode = empCode;
        this.salary = salary;
        this.city = city;
    }

}

class UI {
    static displayEmployee(employee) {
    let table = document.getElementById('list');
    let list = document.getElementById('employeeList');
    let row = document.createElement("row");
    row.innerHTML = `
    <td>${employee.fullName}</td>
    <td>${employee.empCode}</td>
    <td>${employee.salary}</td>
    <td>${employee.city}</td>
    
    `
        list.appendChild(row)

    }
}*/

let selectedRow = null;
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = readFormData();
    if(selectedRow == null) {
        insertNewRecord(formData);
    }
    else if(selectedRow !== null) {
        updateRecord(formData)
    }

    clearForm()
})


function readFormData() {

    let formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;

    return formData
}

function insertNewRecord(data) {
    let table = document.getElementById("employeeList").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onclick="onEdit(this)">Edit</button>
                       <button onclick="onDelete(this)">Delete</button>`


}

function clearForm() {
    document.getElementById('fullName').value = '';
    document.getElementById('empCode').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('city').value = '';
    selectedRow = null;
}

function onEdit(td) {

    selectedRow = td.parentElement.parentElement;
    document.getElementById('fullName').value = selectedRow.cells[0].innerText;
    document.getElementById('empCode').value = selectedRow.cells[1].innerText;
    document.getElementById('salary').value = selectedRow.cells[2].innerText;
    document.getElementById('city').value = selectedRow.cells[3].innerText;

}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {

    if(confirm('Are you sure you want to delete this record?')) {
       let row = td.parentElement.parentElement;
        document.getElementById('employeeList').deleteRow(row.rowIndex);
        clearForm()
    }

}
