var imageURL

document.querySelector("#postVite").addEventListener("click",e=>{
    e.preventDefault()
    
    let viteObj = {
        location:document.querySelector("#place").value,
        date:document.querySelector("#date").value,
        time:document.querySelector("#time").value,
        details:document.querySelector("#what").value,
        capacity:document.querySelector("#capacity").value,
        imageURL:document.querySelector("#viteImg").getAttribute("src")
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

var widget = cloudinary.createUploadWidget(
    {
        cloud_name: 'buddygram',
        upload_preset: 'pbpzv69s',
        sources: ['local', 'url', 'camera', 'image_search',
            'facebook', 'dropbox', 'google_photos'],
        //google_api_key: ''.....'' 
},
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            document.getElementById("viteImg").setAttribute("src",result.info.url)
        imageURL = result.info.secure_url};
    })

    document.querySelector("#vitePhoto").addEventListener("click", e => {
        e.preventDefault()
        widget.open()
    });
