axios.defaults.baseURL = server;
let saleryData = null;
window.onload = async() => {
   await getSession();
   await fetchEmployee ();
   await fetchSalary();
}

const createSalary = async(e) => {
    e.preventDefault();
    const employeeName = document.getElementById('employees').value.trim();
    const salary = document.getElementById('salary').value;
    const description = document.getElementById('description').value.trim();
    const salaryDate = document.getElementById('date').value;
    
    const payload = {
        employeeName,
        salary,
        description,
        salaryDate
    }
    try{
      await axios.post("/salary",payload,getSessionForServer())

      new Swal({
        icon:"success",
        title:"Salery Created !"
      }).then(()=>{
        location.href = location.href
      })

    }
    catch(err) {
        new Swal({
            icon:"error",
            title:"Failed!",
            text:err.response ? err.response.message : err.message
        })
    }
}

const fetchEmployee = async() => {
   try{
     const res = await axios.get("/employee",getSessionForServer())
     const employees = document.getElementById('employees')
     for(let employee of res.data) {
         const ui = `<option value=${employee.employeeName}>${employee.employeeName}</option>` 

         employees.innerHTML += ui
     }
   }
   catch(err) {
      new Swal({
         icon:"error",
         title:"Failed",
         text:err.response ? err.response.data.message : err.message
      })
   }
}


const fetchSalary = async() => {
    try{
       const res = await axios.get('/salary',getSessionForServer());
       saleryData = res.data
        const saleryTable = document.getElementById('salary-table');
       for(let salary of res.data) {
         const ui = `<tr class="border-b border-gray-100 text-zinc-600">
                    <td class="py-3 pl-4">${salary.employeeName}</td>
                    <td>${salary.description}</td>
                    <td>₹${salary.salary.toLocaleString()}</td>
                    <td>${moment(salary.salaryDate).format("MMM DD, YYYY")}</td>
                    <td>
                        <div class="space-x-3">
                            <button onclick="deleteSalary('${salary._id}')" class="bg-rose-400 px-2 py-1 rounded text-white hover:bg-rose-500 cursor-pointer">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>`

                 saleryTable.innerHTML += ui
       }

    }
    catch(err) {
        new Swal({
            icon:"error",
            title:"Failed",
            text:err.response ? err.response.data.message : err.message
        })
    }
}

const deleteSalary = async(id) => {
 try{
       await axios.delete(`/salary/${id}`,getSessionForServer())
       new Swal({
        icon:"success",
        title:"Salery Deleted !"
       }).then(()=>{
        location.href = location.href
       })
    }
    catch(err) {
        new Swal({
            icon:"error",
            title:"Failed",
            text:err.response ? err.response.data.message : err.message
        })
    }
}


const searchSalary = async(input) => {
 const value = input.value.toLowerCase().trim()
 const data = await saleryData.filter((item)=>{
    return item.employeeName.toLowerCase().includes(value)
 })

 const saleryTable = document.getElementById('salary-table');
 saleryTable.innerHTML = '';
for(let salary of data) {
    const ui = `<tr class="border-b border-gray-100 text-zinc-600">
            <td class="py-3 pl-4">${salary.employeeName}</td>
            <td>${salary.description}</td>
            <td>₹${salary.salary.toLocaleString()}</td>
            <td>${moment(salary.salaryDate).format("MMM DD, YYYY")}</td>
            <td>
                <div class="space-x-3">
                    <button onclick="deleteSalary('${salary._id}')" class="bg-rose-400 px-2 py-1 rounded text-white hover:bg-rose-500 cursor-pointer">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </td>
        </tr>`

            saleryTable.innerHTML += ui
   }
}