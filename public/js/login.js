const slider = document.querySelector('.slider');
M.Slider.init(slider, {
  indicators: false,
  height: 500,
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
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(userObj)
        if(res.ok){
            location.href="/profile"
        } else {
            res.alert("an error occurred")
        }
    })
})

