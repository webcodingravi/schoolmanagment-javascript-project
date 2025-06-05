axios.defaults.baseURL = server;
const signup = (e) => {
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

  axios.post("/school/signup",payload)
  .then((res)=>{
     new Swal({
          icon : 'success',
          title: res.data.message
     }).then(()=>{
        location.href = "/login.html"
     })
  })
  .catch((err)=>{
      new Swal({
        icon:'error',
        title: "Signu failed !",
      })
  })
}