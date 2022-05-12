const slider = document.querySelector('.slider');
M.Slider.init(slider, {
  indicators: false,
  height: window.innerHeight,
  transition: 500,
  interval: 6000
});

document.querySelector("#btnLogin").addEventListener("click",e=>{
    e.preventDefault();
    
    const userObj = {
        email:document.querySelector("#email").value,
        password:document.querySelector("#password").value,
    }
    console.log(userObj)
    console.log("l js 17")

    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log("l js 25")
        console.log(userObj)
        console.log(res)
        if(res.ok){
            location.href="/profile"
        } else {
            alert("Incorrect Email or Password")
        }
    })
})

