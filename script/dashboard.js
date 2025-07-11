axios.defaults.baseURL = server;
window.onload = async() => {
   await getSession();
   await fectchDashboard()
}

const admissionChart = (data) => {
  const options = {
     type: "bar",
     data: {
       labels: data.labels,
       datasets: [{
            label: 'Admissions',
            data: data.data,
            backgroundColor: data.backgroundColors,
            borderRadius:8
       }
             
       ]
     }
  }
  const canvas = document.getElementById('admission-chart').getContext('2d');
  new Chart(canvas,options)
}


const paymentChart = (data) => {
  const options = {
     type: "doughnut",
     data: {
       labels: data.labels,
       datasets: [{
            data: data.data,
            backgroundColor: data.backgroundColors,
            borderRadius:8
       }
             
       ]
     }
  }
  const canvas = document.getElementById('payment-chart').getContext('2d');
  new Chart(canvas,options)
}


const fectchDashboard = async() =>{
     try{
      const res = await axios.get("/dashboard",getSessionForServer())
      const students = document.getElementById('no-of-students');
      const teachers = document.getElementById('no-of-teachers');
      const employees = document.getElementById('no-of-employees');
      const subjects = document.getElementById('no-of-subjects');
      students.innerHTML = res.data.students
      teachers.innerHTML = res.data.teachers
      employees.innerHTML = res.data.employees
      subjects.innerHTML = res.data.subjects
      admissionChart(res.data.admissionStats)
      paymentChart(res.data.paymentStats)

     }
     catch(err) {
      new Swal({
        icon:"error",
        title:"Failed !",
        text: err.response ? err.response.data.message :err.message
      })
     }
}