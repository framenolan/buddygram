document.querySelector("#btn-login").addEventListener("click",e=>{
    e.preventDefault();
    const userObj = {
        email:document.querySelector("#email").value,
        password:document.querySelector("#password").value,
    }
    console.log(userObj)
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/profile"
        } else {
            res.status(500).json({msg: "an error occurred"})
        }
    })
})

