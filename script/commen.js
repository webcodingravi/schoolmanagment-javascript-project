let session = null;
const server = "http://localhost:8080";
axios.defaults.baseURL = server
const drawer = document.getElementById('drawer');
const openDrawer = () => {
 drawer.style.width = '50%';
}

const closeDrawer = () => {
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

const getSessionForServer = () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        Authorization:`Bearer ${token}`
      }
    }
    return options
}
