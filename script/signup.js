axios.defaults.baseURL = server;
window.onload = async () => {
    await getSession();
    if(session) {
        location.href = "/app/dashboard.html"
    }
}
const signup = async(e) => {
    e.preventDefault();
    const schoolName = document.getElementById('schoolName').value.trim();
    const dirName = document.getElementById("dirName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();


    const payload = {
        schoolName : schoolName,
        dirName : dirName,
        mobile : mobile,
        email:email,
        password : password
    }

   try{
     const res = await axios.post("/school/signup",payload)
      new Swal({
        icon: 'success',
        title: "Signup success"
      })
      .then(()=>{
        location.href = "/login.html"
      })
   }catch(err){
      new Swal({
        icon:'error',
        title: "signup Failed !",
        text: err.response.data.message
        
      })
   }

  }