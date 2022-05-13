document.querySelector("#btnSignup").addEventListener("click",e=>{
    e.preventDefault();

    if(document.querySelector("#password").value!==document.querySelector("#confirmpassword").value) {
        alert("Passwords do not match, please try again")
    }

    const userObj = {
        firstname:document.querySelector("#first_name").value,
        lastname:document.querySelector("#last_name").value,
        email:document.querySelector("#email").value,
        password:document.querySelector("#password").value
    }
    
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/profile"
        } else {
            res.json().then(function (errData) {
                switch (errData.err.errors[0].message) {
                    case 'Validation isEmail on email failed':
                        alert("Incorrect Email Format")
                        break;
                    case 'email must be unique':
                        alert("Email already in use, please login")
                        location.href="/login"
                        break;
                    case 'Validation len on password failed':
                        alert("Password must be at least 8 characters")
                        break;
                    default:
                        alert(`An error occured, please try again: \n ${errData.err.errors[0].message}`)
                }
            })  
        }
    })
})