const createSalery = (e) => {
    e.preventDefault();
    const employee = document.getElementById('employee').value.trim();
    const salery = document.getElementById('salery').value.trim();
    const description = document.getElementById('description').value.trim();
    const date = document.getElementById('date').value.trim();
    console.log(employee,salery,description,date);
}