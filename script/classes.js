axios.defaults.baseURL = server;
window.onload = async() => {
   await getSession();
   classTeacher();
   fetchClass()
}

const createClass = async(e) => {
   e.preventDefault();
   const classes = document.getElementById('class').value.trim();
   const fee = document.getElementById('fee').value.trim();
   const classTeacher = document.getElementById('classTeacher').value.trim();
   const sections = document.getElementById('sections').value.trim();
   
   const payload = {
       class:classes,
       fee,
       classTeacher,
       sections
   }

   try{
     const res = await axios.post("/class",payload,getSessionForServer())
      new Swal({
         icon:"success",
         title:"Class created !"

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

const classTeacher = async() => {
    try{
      const res = await axios.get("/teacher",getSessionForServer());
      const classTeacher = document.getElementById('classTeacher');
      for(let teacher of res.data ) {
       const option = `<option value="${teacher._id}">${teacher.teacherName}</option>`

       classTeacher.innerHTML += option
      } 
    }
    catch(err) {
      new Swal({
         icon:"error",
         title: "Failed",
         text:err.response ? err.response.data.message : err.message
      })
    }
}

const fetchClass = async() => {
   try{
      const res = await axios.get("/class",getSessionForServer())
      const classes = document.getElementById("classes");
      for(let sclass of res.data) {
         const ui = `<div class="relative rounded-lg flex flex-col justify-center items-center p-6 shadow-lg gap-4">
                <div
                    class="uppercase flex items-center justify-center text-white text-2xl font-bold bg-linear-to-bl from-violet-500 to-fuchsia-500 w-[40%] py-8 absolute top-0 rounded-b-2xl">
                    ${sclass.class}
                </div>

                <div class="space-x-3 mt-30">
                    <button class="bg-green-400 hover:bg-green-500 w-10 h-10 rounded-full text-white cursor-pointer">
                        <i class="ri-edit-line"></i>
                    </button>

                    <button onclick=deleteClass('${sclass._id}') class="bg-rose-400 hover:bg-rose-500 w-10 h-10 rounded-full text-white cursor-pointer">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>`

            classes.innerHTML += ui
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

const deleteClass = async(id) => {

   try {
        await axios.delete(`/class/${id}`,getSessionForServer())
        new Swal({
         icon : "success",
         title: "Class Delete !"
        }).then(()=>{
         location.href = location.href;
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