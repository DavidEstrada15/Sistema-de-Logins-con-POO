import Accountmanager from "./ManagerAccounts.js"

const controlador= new Accountmanager
const main= document.querySelector("main")
const infoimage= document.getElementById("infoimage")
const accountsbutton= document.getElementById("accounts")
const buttonWindow= document.createElement("button")
const buttonkill= document.createElement("button")
buttonkill.classList.add("buttonkill")
const closeloggin= document.createElement("button")
closeloggin.innerText= "Cerrar sesion"
const Agetext= document.getElementById("Agetext")
const Nametext= document.getElementById("Nametext")
const Emailtext= document.getElementById("Emailtext")
buttonWindow.textContent= "Crear nuevo usuario"
buttonkill.textContent= "X"
let loggin= JSON.parse(localStorage.getItem("logginstatus")) || false
if (loggin  == false) {
    main.style.display= "none"
    closeloggin.style.display= "none"
    buttonkill.style.display= "none"
    createmodel()
}

closeloggin.addEventListener("click", ()=>{
    loggin= false
    JSON.stringify(localStorage.setItem("logginstatus", loggin))
    location.reload()
})

actualizarusuario()

function createmodel() {
const section = document.createElement("section")
    section.style.animation= " aparecer 0.5s ease both";
    const accountscontainer = document.createElement("div")
    const buttonscontainer= document.createElement("div")
    checkloggin().forEach(Usuario => {
        const account= document.createElement("article")
        account.classList.add("account")
        const infocontainer= document.createElement("div")
        infocontainer.classList.add("infocontainer")
        const infotextcontainer= document.createElement("div")
        const name= document.createElement("h2")
        const age= document.createElement("h3")
        const email= document.createElement("h3")
        const img= document.createElement("img")
        const eraseacount= document.createElement("button")
        eraseacount.classList.add("eraseacount")
        name.textContent= Usuario.nombre
        age.textContent= Usuario.edad
        email.textContent= Usuario.correo
        img.src= Usuario.image
        eraseacount.innerText= "Borrar usuario"
        infocontainer.addEventListener("click", () =>{
        controlador.changeUser(Usuario.id)
        actualizarusuario()
        section.style.animation= " desaparecer 0.5s ease both";
        loggin = true
        JSON.stringify(localStorage.setItem("logginstatus", loggin))
        main.style.display= "flex"
        closeloggin.style.display= "block"
        buttonkill.style.display= "block"})

        eraseacount.addEventListener("click", ()=>{
            controlador.removeUsers(Usuario)
        section.style.animation= " desaparecer 0.5s ease both";    })
        infocontainer.appendChild(img)
        infocontainer.appendChild(infotextcontainer)
        infotextcontainer.appendChild(name)
        infotextcontainer.appendChild(email)
        
        account.appendChild(infocontainer)
        if (loggin == true) {
          account.appendChild(eraseacount)  
        }
        
        accountscontainer.appendChild(account)
    });
    accountscontainer.classList.add("accountscontainer")
    buttonscontainer.appendChild(buttonWindow)
    buttonscontainer.appendChild(buttonkill)
    buttonscontainer.appendChild(closeloggin)
    buttonscontainer.classList.add("buttonscontainer")
    section.appendChild(buttonscontainer)
    section.appendChild(accountscontainer)
    document.body.appendChild(section)
    buttonkill.addEventListener("click", ()=>{
        section.style.animation= " desaparecer 0.5s ease both";
})    
}

accountsbutton.addEventListener("click", ()=>{
createmodel()

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

function checkloggin() {
    return loggin == false ? controlador.getAllusers() : controlador.getAvailableUsers()
}