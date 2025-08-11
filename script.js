import Accountmanager from "./ManagerAccounts.js"

const controlador= new Accountmanager
const main= document.querySelector("main")
const infoimage= document.getElementById("infoimage")
const accountsbutton= document.getElementById("accounts")
const buttonWindow= document.createElement("button")
const buttonkill= document.createElement("button")
const Agetext= document.getElementById("Agetext")
const Nametext= document.getElementById("Nametext")
const Emailtext= document.getElementById("Emailtext")
buttonWindow.textContent= "Crear nuevo usuario"
buttonkill.textContent= "X"
accountsbutton.addEventListener("click", ()=>{
    
    const section = document.createElement("section")
    section.style.animation= " aparecer 0.5s ease both";
    const accountscontainer = document.createElement("div")
    const buttonscontainer= document.createElement("div")
    controlador.getAvailableUsers().forEach(Usuario => {
        const account= document.createElement("article")
        const name= document.createElement("h2")
        const age= document.createElement("h3")
        const email= document.createElement("h3")
        const img= document.createElement("img")
        const eraseacount= document.createElement("button")
        name.textContent= Usuario.nombre
        age.textContent= Usuario.edad
        email.textContent= Usuario.correo
        img.src= Usuario.image

        img.addEventListener("click", () =>{
        controlador.changeUser(Usuario.id)
        actualizarusuario()
        section.style.animation= " desaparecer 0.5s ease both";
        })

        eraseacount.addEventListener("click", ()=>{
            controlador.removeUsers(Usuario)
        document.body.removeChild(section)     })
        account.appendChild(eraseacount)
        account.appendChild(name)
        account.appendChild(age)
        account.appendChild(email)
        account.appendChild(img)
        
        accountscontainer.appendChild(account)
    });
    accountscontainer.classList.add("accountscontainer")
    buttonscontainer.appendChild(buttonWindow)
    buttonscontainer.appendChild(buttonkill)
    buttonscontainer.classList.add("buttonscontainer")
    section.appendChild(buttonscontainer)
    section.appendChild(accountscontainer)
    document.body.appendChild(section)
    buttonkill.addEventListener("click", ()=>{
        section.style.animation= " desaparecer 0.5s ease both";
})

})


buttonWindow.addEventListener("click", ()=>{
    let nombre= prompt("Ingresa tu nombre: ")
    let edad= prompt("Ingresa tu edad: ")
    let correo= prompt("Ingresa tu correo: ")
    let image= prompt("Ingresa la url de tu imagen: ")
    controlador.addUser(nombre,edad,correo,image)
})


function actualizarusuario() {
    main.style.backgroundImage= `url(${controlador.actualUser.image})`
    infoimage.src= controlador.actualUser.image
    Agetext.innerText= `${controlador.actualUser.edad} años`
    Emailtext.innerText= `Correo: ${controlador.actualUser.correo}`
    Nametext.innerText= controlador.actualUser.nombre
}

actualizarusuario()