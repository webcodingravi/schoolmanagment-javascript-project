axios.defaults.baseURL = server;
let editId = null;
window.onload = async() => {
   await getSession();
   fetchSubjects();
}
const createSubject = async(e) => {
    e.preventDefault();
   

    if(editId) {
        saveSubject()
        return
    }

    const subject = document.getElementById('subject').value.trim();
    const fullmarks = document.getElementById('fullmarks').value;
    
    const payload = {
          subjectName:subject,

          fullmarks
    }

    
    try{
         const res = await axios.post("/subject",payload,getSessionForServer())
         new Swal({
            icon: "success",
            title: "Subject Created !",
         }).then(() =>{
            location.href = location.href;
         })
    }
    catch(err) {
        new Swal({
            icon:"error",
            title:"Failed",
            text: err.response ? err.response.data.message : err.message
        })
    }
    
}


const fetchSubjects = async() => {
     const res = await axios.get("/subject",getSessionForServer())
     const subjects = document.getElementById('subjects');

     for(let item of res.data) {
         const ui = `<div class="rounded-lg flex flex-col justify-center items-center p-6 shadow-lg gap-4">
                <i class="ri-git-repository-line text-6xl"></i>
                <div class="text-center">
                    <div class="mb-5 flex flex-col">
                        <h1 class="text-lg font-medium mb-2 capitalize">${item.subjectName}</h1>
                        <label class="text-gray-600">${item.fullmarks} Marks</label>
                    </div>

                    <div class="space-x-3">
                        <button onclick=editSubject('${item.subjectName}','${item.fullmarks}','${item._id}')
                            class="bg-green-400 hover:bg-green-500 w-10 h-10 rounded-full text-white cursor-pointer">
                            <i class="ri-edit-line"></i>
                        </button>

                        <button class="bg-rose-400 hover:bg-rose-500 w-10 h-10 rounded-full text-white cursor-pointer" onclick=deleteSubject('${item._id}')>
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            </div>`
            subjects.innerHTML += ui;
     }
}

const deleteSubject = async(id) => {
  try{
     await axios.delete(`/subject/${id}`,getSessionForServer())
     new Swal({
        icon:"success",
        title: "Subject Deleted"
     }).then(()=>{
        location.href = location.href
     })
  }
  catch(err) {
    new Swal({
        icon:"error",
        title:"Failed",
        text: err.response ? err.response.data.message : err.message
    })
  }
} 


const editSubject = (subject,fullmarks,id) => {
    const subjectFields = document.getElementById('subject');
    const fullmarksFields = document.getElementById('fullmarks');
    openDrawer() 

    subjectFields.value = subject;
    fullmarksFields.value = fullmarks;
    editId = id;
}

const saveSubject = async() => {

   const subject = document.getElementById('subject').value.trim();
   const fullmarks = document.getElementById('fullmarks').value

   const payload = {
     subjectName : subject,
     fullmarks: fullmarks

   }

   try{
    const res = await axios.put(`/subject/${editId}`,payload,getSessionForServer())
    new Swal({
        icon: "success",
        title: "Subject Saved !"
    }).then(()=>{
        location.href = location.href
    })

   }catch(err) {
     new Swal({
        icon:"error",
        title:"Failed",
        text: err.response ? err.response.data.message : err.message
     })
   }
}



   