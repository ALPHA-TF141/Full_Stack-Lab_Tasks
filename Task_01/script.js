function addStudent(){

const name=document.getElementById("name").value
const email=document.getElementById("email").value
const dob=document.getElementById("dob").value
const department=document.getElementById("department").value
const phone=document.getElementById("phone").value

fetch("http://localhost:3000/addStudent",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
dob,
department,
phone
})

})
.then(res=>res.text())
.then(data=>{
alert(data)
loadStudents()
})

}

function loadStudents(){

fetch("http://localhost:3000/students")
.then(res=>res.json())
.then(data=>{

const table=document.getElementById("studentTable")

table.innerHTML=`
<tr>
<th>Name</th>
<th>Email</th>
<th>DOB</th>
<th>Department</th>
<th>Phone</th>
</tr>
`

data.forEach(student=>{

let row=table.insertRow()

row.insertCell(0).innerHTML=student.name
row.insertCell(1).innerHTML=student.email
row.insertCell(2).innerHTML=student.dob
row.insertCell(3).innerHTML=student.department
row.insertCell(4).innerHTML=student.phone

})

})

}

loadStudents()