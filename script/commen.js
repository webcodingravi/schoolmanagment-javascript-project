let session = null;
const server = "http://localhost:8080";
axios.defaults.baseURL = server
const drawer = document.getElementById('drawer');
const openDrawer = () => {
 drawer.style.width = '50%';
}


const closeDrawer = (redirect=false) => {
    if(redirect) {
        location.href = location.href
    }
    drawer.style.width = '0';
}

const getSession = async() => {
    const token = localStorage.getItem("token");
    const url = location.href;
    if(!token) {
        if(url.includes("login.html") || url.includes("signup.html")) {
            return
        }
        location.href = "/login.html"
    }else{
        try{
           const res = await axios.post("/token/verify",{token:token})
           session = res.data
           showUserInfo();
           
        }catch(err) {
            localStorage.clear()

        if(url.includes("login.html") || url.includes("signup.html")) {
            return
        }

          location.href = "/login.html"
        }
       
    }
}

const logout = () => {
    localStorage.clear();
    location.href = "/login.html"
}


const showUserInfo = () => {
    const schoolName = document.getElementById("school-name");
    const email = document.getElementById("email");
    schoolName.innerHTML = session.schoolName;
    email.innerHTML = session.email
}

const getSessionForServer = (responseType = undefined) => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        Authorization:`Bearer ${token}`
        
      },
      responseType
    }
    return options
}

const fetchSchoolLogo = async() => {
 try{
     const res = await axios.get("/school/image",getSessionForServer('blob'))
     const url = URL.createObjectURL(res.data);
     const mainLogo = document.getElementById("main-logo");
     mainLogo.src = url
 }
 catch(err) {
    new Swal({
        icon:"error",
        title:"Failed",
        text:err.response ? err.response.data : err.response
    })
 }
}

fetchSchoolLogo();
