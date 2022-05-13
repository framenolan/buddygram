// Open Comment Box
document.querySelectorAll('.addComment').forEach(btn => {
    
    btn.addEventListener('click',e=>{
        e.preventDefault()

        const viteId = e.target.value

        const commentInput = `#commentInput${viteId}`

        document.querySelector(commentInput).classList.remove("hidden");
        document.querySelector(commentInput).classList.add("shown");
    })
})

// Save Comment
document.querySelector('.submitComment').addEventListener('click',e=>{
    e.preventDefault()

    const viteId = e.target.value

    let commentObj = {
        body:document.querySelector(`#addAComment${viteId}`).value,
        ViteId:viteId
    }

    fetch("/api/comments/",{
        method:"POST",
        body:JSON.stringify(commentObj),
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

    document.querySelector(showComments).classList.remove("hidden");
    document.querySelector(showComments).classList.add("shown");
    document.querySelector(`viewComment${viteId}`).textContent = "Hide Comments"

})

// Show Comments
document.querySelectorAll('.viewComment').forEach(btn => {
    
btn.addEventListener('click',e=>{
    e.preventDefault()

    const viteId = e.target.value
    const buttonId = `#${e.target.id}`
    console.log(buttonId)

    const showComments = `#commentBlock${viteId}`
    console.log(showComments)

    

    document.querySelector(showComments).classList.remove("hidden");
    document.querySelector(showComments).classList.add("shown");
    // document.querySelector(buttonId).innerText = "Hide Comments"
    // document.querySelector(buttonId).classList.add("hideComment");
    // document.querySelector(buttonId).classList.remove("viewComment");
    })
})

// Hide Comments
// document.querySelectorAll('.hideComment').forEach(btn => {

//     btn.addEventListener('click',e=>{
//         e.preventDefault()

//         const viteId = e.target.value
//         const buttonId = `#${e.target.id}`
//         console.log(viteId)

//         const showComments = `#commentBlock${viteId}`
//         console.log(showComments)

//         document.querySelector(showComments).classList.remove("shown");
//         document.querySelector(showComments).classList.add("hidden");
//         document.querySelector(buttonId).innerText = "Show Comments"
//         document.querySelector(buttonId).classList.add("viewComment");
//         document.querySelector(buttonId).classList.remove("hideComment");

//     })
// });