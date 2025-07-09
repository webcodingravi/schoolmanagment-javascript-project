axios.defaults.baseURL = server

window.onload = async() => {
   await getSession()
    await fetchLogoSetting()
}

const changeLogo = async(input) => {
 const file = input.files[0]
 const formData = new FormData()
 formData.append('image',file)
 try{
      await axios.post("/school/upload-image",formData,getSessionForServer())  
      new Swal({
        icon:"success",
        title:"Logo Updated !"
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

const fetchLogoSetting = async() => {
     try{
        const res = await axios.get("/school/image",getSessionForServer('blob'))
        const schoolLogo = document.getElementById("school-logo");
        const url = URL.createObjectURL(res.data);
        schoolLogo.src = url

        const schoolRes = await axios.get("/school",getSessionForServer());
        const schoolInfo = schoolRes.data
        const schoolForm = document.getElementById("school-form");
        const schoolTitle = document.getElementById("school-title");
        const schoolEstd = document.getElementById("school-estd");
       schoolTitle.innerHTML = schoolInfo.schoolName;
       schoolEstd.innerHTML = moment(schoolInfo.estd).format("MMM DD, YYYY");
 
       const schoolEstdDate = document.getElementById("estd-date");
       schoolEstdDate.innerHTML = moment(schoolInfo.estd).format("DD-MM-YYYY");

        for(let key in schoolInfo) {
           const input = schoolForm.elements[key]
           if(input) {
            input.value = schoolInfo[key]
           }
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

const editSchool = async(e) => {
  e.preventDefault();
  const schoolName = document.getElementById('schoolName').value.trim();
  const dirName = document.getElementById('dirName').value.trim();
  const tagline = document.getElementById('tagline').value.trim();
  const regNo = document.getElementById('regNo').value.trim();
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email-id').value;
  const estd = document.getElementById('estd').value;
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const state = document.getElementById('state').value.trim();
  const country = document.getElementById('country').value.trim();
  const pincode = document.getElementById('pincode').value;

  const payload = {
    schoolName,
    dirName,
    tagline,
    regNo,
    mobile,
    email,
    estd,
    address,
    city,
    state,
    country,
    pincode
  }

  try {
   await axios.put("/school",payload,getSessionForServer())
    new Swal({
         icon:"success",
         title:"Info Saved"
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

