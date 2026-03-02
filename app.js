import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

let project_url ="https://owtxjjhhzdpfblgmyujo.supabase.co";

let project_anonkey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dHhqamhoemRwZmJsZ215dWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTE1OTYsImV4cCI6MjA4NTkyNzU5Nn0.LlS4tmsxEu-F8DcakHjOQmNdHmjZtWXee5XdcXCkXfw";

const supabase = createClient(project_url, project_anonkey);
  
document.getElementById("userform").addEventListener("submit", async function (e) {
    e.preventDefault()
     const userinput = new FormData(this);
     let userdata ={
        user_name:userinput.get("user-firstname"),
        user_email:userinput.get("user-email"),
        user_password:userinput.get("user-password")
     }
     console.log(userdata)
     
    const {data, error} = await supabase
    .from("Usersform")
    .insert([userdata]);
    if(error){
    console.log("fail to insert data" + error.message);
        return
    }
    else{
        console.log("succenfully insert data");
        
    }
    this.reset()
});
 async function fetchdata(){
  const {data, error} = await supabase
  .from("Usersform")
  .select("*");
  console.log(data);
  
   if(error){
alert("There is somthing went wrong while fetching your data Sorry!" + error.message)   
return 
   }
   let wrapper =  document.getElementById("div-wrapper");

  data.forEach(element => {
   wrapper.innerHTML += `
    <div class="card col-12 col-md-6">
            <h5 class="card-header">Your Name : ${element.user_name}</h5>
            <div class="card-body">
                <h5 class="card-title">Your Email : ${element.user_email}</h5>
                <h6 class="card-title">Your Password: ${element.user_password}</h6>
                <button onclick="updateinfo(${element.id},'${element.user_name}','${element.user_email}','${element.user_password}')" class="btn btn-primary">EDIT</button>
                <button onclick="deleteData(${element.id})" class="btn btn-primary">DELETE</button>
            </div>
        </div>
   `
  });
}
fetchdata();

window.fetchdata =fetchdata
 function updateinfo(id,uname,uemail, upassword){
 document.getElementById("modal").className = "modal-visible";
 let updatename =document.getElementById("update-name").value = uname;
 let updateemail =document.getElementById("update-email").value = uemail;
 let updatepassword = document.getElementById("update-password").value = upassword;
 
 //  if user click on cancel buton ,update form wil be disapper by adding class model-hidden
//  closemodel
window.closeModal= function(){
 document.getElementById("modal").className = "modal-hidden";
   }
//window.savemodel
window.saveUpdate = async function(){
  let newname=document.getElementById("update-name").value;
  let newemail=document.getElementById("update-email").value;
  let newpassword=document.getElementById("update-password").value;

const { error } = await supabase
  .from('Usersform')
  .update({ 
    user_name : newname,
    user_email:newemail,
    user_password:newpassword
  })
  .eq('id', id)
  if(error){
    console.log(error.message);
    
  }
  else{
    alert("update succesfuly")
 document.getElementById("modal").className = "modal-hidden";


  }


}

}
window.deleteData =async function(id){
   const {error} = await supabase
  .from('Usersform')
  .delete()
  .eq('id', id)
  if(error){
    console.log(error.message);
    
  }
  else{
alert("succesfully deleted") 
} 
location.reload();
}
window.updateinfo =updateinfo;

