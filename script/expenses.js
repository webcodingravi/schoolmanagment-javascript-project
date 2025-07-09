axios.defaults.baseURL = server;
let expenseData = null;
window.onload = async() => {
   await getSession();
   fetchExpense()
}

const createExpense = async(e) => {
 e.preventDefault();
 const title = document.getElementById('title').value.trim();
 const amount = document.getElementById('amount').value;
 const description = document.getElementById('description').value.trim();
 const expenseAt = document.getElementById('date').value;

 const payload = {
    title,
    amount,
    description,
    expenseAt
 }

 try{
    await axios.post("/expense",payload,getSessionForServer())
    new Swal({
      icon:"success",
      title:"Expenses Added"

    })
    .then(()=>{
      location.href=location.href
    })
 }
 catch(err){
   new Swal({
      icon:"error",
      title:"Failed",
      text:err.response ? err.response.data.message : err.message
   })
 }

}

const fetchExpense = async() => {
   try{
     const res = await axios.get("/expense",getSessionForServer());
     expenseData = res.data
     const expenses = document.getElementById('expenses');
     for(let expense of res.data) {
      const ui = `<tr class="border-b border-gray-100 text-zinc-600">
                    <td class="py-3 pl-4 capitalize">${expense.title}</td>
                    <td>${expense.description || "Description is empty"}</td>
                    <td>₹${expense.amount}</td>
                    <td>${moment(expense.expenseAt).format('MMM DD, YYYY hh:mm A')}</td>
                    <td>
                        <div class="space-x-3">
                            <button class="bg-green-400 px-2 py-1 rounded text-white hover:bg-green-500 cursor-pointer">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button class="bg-rose-400 px-2 py-1 rounded text-white hover:bg-rose-500 cursor-pointer" onclick="deleteExpense('${expense._id}')">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>`

                expenses.innerHTML += ui
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

const deleteExpense = async(id) => {
 try{
     await axios.delete(`/expense/${id}`,getSessionForServer())
     new Swal({
      icon:"success",
      title:"Expense Deleted !"
     }).then(()=>{
      location.href=location.href
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

const searchExpense = async(input) => {
 const value = input.value.toLowerCase().trim();
 const data = await expenseData.filter((item)=>{
    return item.title.toLowerCase().includes(value);
 })
const expenses = document.getElementById('expenses');
expenses.innerHTML = '';
for(let expense of data) {
const ui = `<tr class="border-b border-gray-100 text-zinc-600">
               <td class="py-3 pl-4 capitalize">${expense.title}</td>
               <td>${expense.description || "Description is empty"}</td>
               <td>₹${expense.amount}</td>
               <td>${moment(expense.expenseAt).format('MMM DD, YYYY hh:mm A')}</td>
               <td>
                  <div class="space-x-3">
                        <button class="bg-green-400 px-2 py-1 rounded text-white hover:bg-green-500 cursor-pointer">
                           <i class="ri-edit-line"></i>
                        </button>
                        <button class="bg-rose-400 px-2 py-1 rounded text-white hover:bg-rose-500 cursor-pointer" onclick="deleteExpense('${expense._id}')">
                           <i class="ri-delete-bin-line"></i>
                        </button>
                  </div>
               </td>
            </tr>`

expenses.innerHTML += ui
}

}