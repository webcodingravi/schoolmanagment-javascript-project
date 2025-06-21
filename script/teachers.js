axios.defaults.baseURL = server;
window.onload = async() => {
   await getSession();
   fetchTeachers()
}
const createTeacher = async(e) => {
 e.preventDefault();
 const teacherName = document.getElementById('teacherName').value.trim();
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
 const previousSchool = document.getElementById('previousSchool').value.trim();
 const subjects = document.getElementById('subjects').value.trim();

 const payload = {
    teacherName,
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
    previousSchool,
    subjects
 }

 try{
   const res = await axios.post("/teacher",payload,getSessionForServer())
   new Swal({
       icon:"success",
       title:"Teacher Create !"
   }).then(()=>{
      location.href = location.href;
   })
 }
 catch(err){
   new Swal({
      icon:"error",
      title:"Failed",
      text:err.response ? err.response.data.message : err.message
   })
 }

}

const fetchTeachers = async() => {
  try{
    const res = await axios.get("/teacher",getSessionForServer()) 
    console.log(res.data);
    const teachers = document.getElementById('teachers');
    for(let teacher of res.data) {
      const ui = `<div class="rounded-lg flex flex-col justify-center items-center p-6 shadow-lg gap-4">
                <img src="../image/student.jpg" class="w-[100px] h-[100px] object-cover cursor-pointer rounded-full" />
                <div class="text-center">
                    <div class="mb-5 flex flex-col">
                        <h1 class="text-lg font-medium mb-2 capitalize">${teacher.teacherName}</h1>
                        <label class="text-gray-600">${teacher.email}</label>
                        <label class="text-gray-600 text-xs">+91-${teacher.mobile}</label>
                    </div>

                    <div class="space-x-2">
                        <button
                            class="border border-gray-200 px-2 py-[3px] text-xs text-gray-600 cursor-pointer">Sci</button>
                        <button
                            class="border border-gray-200 px-2 py-[3px] text-xs text-gray-600 cursor-pointer">Eng</button>
                        <button
                            class="border border-gray-200 px-2 py-[3px] text-xs text-gray-600 cursor-pointer">Mat</button>
                        <button
                            class="border border-gray-200 px-2 py-[3px] text-xs text-gray-600 cursor-pointer">Com</button>
                    </div>
                </div>
            </div>`
            teachers.innerHTML +=ui;
    }
  }
  catch(err){
    new Swal({
      icon:"error",
      title:"Failed",
      text:err.response ? err.response.data.message : err.message
    })
  }
}