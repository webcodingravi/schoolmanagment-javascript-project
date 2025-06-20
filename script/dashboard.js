window.onload = async() => {
   admissionChart();
   paymentChart();
   await getSession();
}

const admissionChart = () => {
  const options = {
     type: "bar",
     data: {
       labels: ['Jan','Feb','Mar','Apr','May','Jun'],
       datasets: [{
            label: 'Admissions',
            data: [100,200,300,400,500,600],
            backgroundColor: 'rgba(0,123,255,0.7)',
            borderRadius:8
       }
             
       ]
     }
  }
  const canvas = document.getElementById('admission-chart').getContext('2d');
  new Chart(canvas,options)
}


const paymentChart = () => {
  const options = {
     type: "doughnut",
     data: {
       labels: ['paid','Dues'],
       datasets: [{
            data: [35000,12000],
            backgroundColor: ['#3eef5b','#fc4680'],
            borderRadius:8
       }
             
       ]
     }
  }
  const canvas = document.getElementById('payment-chart').getContext('2d');
  new Chart(canvas,options)
}
