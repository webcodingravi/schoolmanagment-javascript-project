axios.defaults.baseURL = server;
window.onload = async () => {
    await getSession();
    if(session) {
        location.href = "/app/dashboard.html"
    }
}
const login = async(e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    const payload = {
        email:email,
        password:password
    }

      
    try{
    const res = await axios.post('/school/login',payload)
    localStorage.setItem("token",res.data.token);
    location.href = "/app/dashboard.html"
    }catch(err) {
       new Swal({
        icon:"error",
        title: "Login Failed",
        text:err.response.data.message
       })
    }
}