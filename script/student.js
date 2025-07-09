axios.defaults.baseURL = server;
let students = null;
window.onload = async() => {
   await getSession();
   fetchStudents();

}

const createAdmission = async(e) => {
    e.preventDefault();
    const form = e.target;
    const studentName = document.getElementById('studentName').value.trim();
    const fatherName = document.getElementById('fatherName').value.trim();
    const motherName = document.getElementById('motherName').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const religion = document.getElementById('religion').value.trim();
    const mobile = document.getElementById('mobile').value;
    const email_id = document.getElementById('email-id').value.trim();
    const sclass = document.getElementById('class').value.trim();
    const section = document.getElementById('section').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const country = document.getElementById('country').value.trim();
    const pincode = document.getElementById('pincode').value;
    const previousSchool = document.getElementById('previousSchool').value.trim();

     const payload = {
        studentName,
        fatherName,
        motherName,
        gender,
        dob,
        religion,
        mobile,
        email:email_id,
        class: sclass,
        section,
        address,
        city,
        state,
        country,
        pincode,
        previousSchool
     }

     try{
        await axios.post("/student",payload,getSessionForServer())
        form.reset()
        closeDrawer()
        new Swal({
         icon:"success",
         title:"Admission success"
        }).then(()=>{
         location.href=location.href
        })
     }catch(err) {
        new Swal({
         icon:"error",
         title:"Admission Failed",
         text: err.response ? err.response.data.message : err.message
        })
     }


}

const fetchStudents = async () => {
     const res = await axios.get("/student",getSessionForServer())
     students = res.data;
     const studentsBox = document.getElementById('students');
     for(let student of res.data) {
      const ui = `<div class="rounded-lg flex flex-col justify-center items-center p-6 shadow-lg gap-4">
                 <div class="relative w-[100px] h-[100px] rounded">
                 <img src="../image/student.jpg" class="w-full h-full object-cover cursor-pointer rounded-full" />
                <input type="file" class="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer" accept="image*/"/>
                 </div>
                <div class="text-center">
                    <div class="mb-5 flex flex-col">
                        <h1 class="text-lg font-medium mb-2 capitalize">${student.studentName}</h1>
                        <label class="text-gray-600">${student.email}</label>
                        <label class="text-gray-600 text-xs">+91-${student.mobile}</label>
                    </div>

                    <div class="space-x-3">
                        <button
                            class="bg-linear-to-t from-blue-500 to-purple-500 text-white font-medium py-1 px-3 rounded cursor-pointer">
                            Class - ${student.class}/${student.section}
                        </button>

                        <button
                            class="bg-linear-to-t from-rose-500 to-orange-500 text-white font-medium py-1 px-2.5 rounded cursor-pointer">
                            Roll - ${student.roll}
                        </button>
                    </div>
                </div>
            </div>`
          studentsBox.innerHTML += ui;
         
     }
      
}

const searchStudent = (input) => {
    const keyword = input.value.trim();
   const filteredStudent = students.filter((item)=>{
       return item.studentName.toLowerCase().includes(keyword)
    })
     const studentsBox = document.getElementById('students');
     studentsBox.innerHTML = '';
     for(let student of filteredStudent) {
      const ui = `<div class="rounded-lg flex flex-col justify-center items-center p-6 shadow-lg gap-4">
                  <div class="relative w-[100px] h-[100px] rounded">
                 <img src="../image/student.jpg" class="w-full h-full object-cover cursor-pointer rounded-full" />
                <input type="file" class="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer" accept="image*/" />
                 </div>
                <div class="text-center">
                    <div class="mb-5 flex flex-col">
                        <h1 class="text-lg font-medium mb-2 capitalize">${student.studentName}</h1>
                        <label class="text-gray-600">${student.email}</label>
                        <label class="text-gray-600 text-xs">+91-${student.mobile}</label>
                    </div>

                    <div class="space-x-3">
                        <button
                            class="bg-linear-to-t from-blue-500 to-purple-500 text-white font-medium py-1 px-3 rounded cursor-pointer">
                            Class - ${student.class}/${student.section}
                        </button>

                        <button
                            class="bg-linear-to-t from-rose-500 to-orange-500 text-white font-medium py-1 px-2.5 rounded cursor-pointer">
                            Roll - ${student.roll}
                        </button>
                    </div>
                </div>
            </div>`
          studentsBox.innerHTML += ui;
         
     }

}

