document.querySelector("#postVite").addEventListener("click",e=>{
    e.preventDefault()
    
    let viteObj = {
        location:document.querySelector("#place").value,
        date:document.querySelector("#date").value,
        time:document.querySelector("#time").value,
        details:document.querySelector("#what").value,
        capacity:document.querySelector("#capacity").value
    }

    fetch("/api/vites/",{
        method:"POST",
        body:JSON.stringify(viteObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            res.status(500).json({msg: "an error occurred"})
        }
    })
    
})
