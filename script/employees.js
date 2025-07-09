axios.defaults.baseURL = server
let employeesData = null;
window.onload = async() => {
   await getSession();
   fetchEmployee()
}

const createEmployee = async(e) => {
 e.preventDefault();
 const employeeName = document.getElementById('employeeName').value.trim();
 const gender = document.getElementById('gender').value.trim();
 const dob = document.getElementById('dob').value.trim();
 const religion = document.getElementById('religion').value.trim();
 const mobile = document.getElementById('mobile').value.trim();
 const email = document.getElementById('email-id').value;
 const qualification = document.getElementById('qualification').value.trim();
 const address = document.getElementById('address').value.trim();
 const city = document.getElementById('city').value.trim();
 const state = document.getElementById('state').value.trim();
 const country = document.getElementById('country').value.trim();
 const pincode = document.getElementById('pincode').value;
 const designation = document.getElementById('designation').value.trim();


 const payload = {
   employeeName,
   gender,
   dob,
   religion,
   mobile,
   email,
   qualification,
   address,
   city,
   state,
   country,
   pincode,
   designation
 }


 try{

   await axios.post("/employee",payload,getSessionForServer())
   new Swal({
      icon:"success",
      title:"Employee Added"
   })
   .then(()=>{
      location.href=location.href
   })
 }
 catch(err) {
   new Swal({
      icon:"error",
      title:"Failed",
      text:err.response ? err.response.data.message : response.message
   })
 }

}

const fetchEmployee = async() => {
   try{
      const employees = document.getElementById("employees")
     const res = await axios.get("/employee",getSessionForServer())
     employeesData = res.data
     for(let employee of res.data) {
      const ui = `<div class="rounded-lg flex flex-col justify-center items-center p-6 shadow-lg gap-4">
                 <div class="relative w-[100px] h-[100px] rounded">
                 <img src="../image/student.jpg" class="w-full h-full object-cover cursor-pointer rounded-full" />
                <input type="file" class="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer" accept="image*/" />
                 </div>
                <div class="text-center">
                    <div class="mb-5 flex flex-col">
                        <h1 class="text-lg font-medium mb-2">${employee.employeeName}</h1>
                        <label class="text-gray-600">${employee.email}</label>
                        <label class="text-gray-600 text-xs">+91-${employee.mobile}</label>
                    </div>

                    <div class="space-x-2">
                        <button
                            class="bg-gray-100 px-2 py-1 text-xs text-zinc-600 font-medium hover:bg-gray-200 cursor-pointer capitalize">${employee.designation}</button>

                            <button onclick=deleteEmployee('${employee._id}') class="bg-rose-100 px-2 py-1 text-xs text-rose-600 font-medium hover:bg-rose-400 hover:text-white cursor-pointer">Delete</button>

                    </div>
                </div>
            </div>
           `
           employees.innerHTML += ui;
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

const deleteEmployee = async(id) => {
 try{
   await axios.delete(`/employee/${id}`,getSessionForServer())
   new Swal({
      icon:"success",
      title:"Employee Deleted !"
   }).then(()=>{
      location.href=location.href
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


const searchEmployee = async(input) => {
 const value = input.value.toLowerCase().trim();
 const data = await employeesData.filter((item)=>{
    return item.employeeName.toLowerCase().includes(value)
 })

 const employees = document.getElementById("employees")
 employees.innerHTML = '';
 for(let employee of data) {
      const ui = `<div class="rounded-lg flex flex-col justify-center items-center p-6 shadow-lg gap-4">
                  <div class="relative w-[100px] h-[100px] rounded">
                 <img src="../image/student.jpg" class="w-full h-full object-cover cursor-pointer rounded-full" />
                <input type="file" class="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer" accept="image*/" />
                 </div>
                <div class="text-center">
                    <div class="mb-5 flex flex-col">
                        <h1 class="text-lg font-medium mb-2">${employee.employeeName}</h1>
                        <label class="text-gray-600">${employee.email}</label>
                        <label class="text-gray-600 text-xs">+91-${employee.mobile}</label>
                    </div>

                    <div class="space-x-2">
                        <button
                            class="bg-gray-100 px-2 py-1 text-xs text-zinc-600 font-medium hover:bg-gray-200 cursor-pointer capitalize">${employee.designation}</button>

                            <button onclick=deleteEmployee('${employee._id}') class="bg-rose-100 px-2 py-1 text-xs text-rose-600 font-medium hover:bg-rose-400 hover:text-white cursor-pointer">Delete</button>

                    </div>
                </div>
            </div>
           `
           employees.innerHTML += ui;
     }


}