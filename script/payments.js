axios.defaults.baseURL = server;

window.onload = async() => {
    await getSession()
    await fetchStudent()
    await fetchPayment()
    
}


const createPayment = async(e) => {
 e.preventDefault();
 const student = document.getElementById('student').value;
 const fee = document.getElementById('fee').value;
 const feeDate = document.getElementById('feeDate').value;

 const payload = {
    student,
    fee,
    feeDate
 }
 console.log(payload)

 try{
   await axios.post("/payment",payload,getSessionForServer())
   new Swal({
     icon:"success",
     title:"Payment Created !"
   }).then(()=>{
         location.href = location.href
   })
 }
 catch(err) {
    new Swal({
        icon:"error",
        title:"Payment Failed !",
        text:err.response ? err.response.message : err.message
    })
 }
}


const fetchStudent = async() => {
    const res = await axios.get("/student",getSessionForServer())
    const students = document.getElementById('student');

    for(let student of res.data) {
        const option = `<option value="${student._id}">${student.studentName}</option>`

        students.innerHTML += option;
    }
}   


const fetchPayment = async() => {
    try{
     const res = await axios.get("/payment",getSessionForServer())
     const paymentTable = document.getElementById('payment-table');
     for(let payment of res.data) {
        const ui = `<tr class="border-b border-b-amber-200">
                    <td class="py-4 pl-4">GTTY56</td>
                    <td>
                        <div class="flex gap-4 items-start">
                            <img src="/image/student.jpg" class="w-10 h-10 rounded-full object-cover cursor-pointer">
                            <div class="space-y-1">
                                <h1 class="font-medium">${payment.student.studentName}</h1>
                                <div class="text-xs text-gray-500">
                                    Class: ${payment.student.class}(${payment.student.section}) (R-${payment.student.roll})
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>${payment.student.fatherName}</td>
                    <td>${payment.student.mobile}</td>
                    <td>
                        <div class="bg-green-400 text-white w-fit font-medium rounded p-3 text-[10px] py-[2px] px-3">
                            PAID
                        </div>
                    </td>
                    <td>${moment(payment.feeDate).format("MMM DD,YYYY")}</td>
                </tr>`

                paymentTable.innerHTML += ui
     }
    }

    catch(err) {
        new Swal({
            icon:"error",
            title:"Failed",
            text:err.response ? err.response.message : err.message
        })
    }
}