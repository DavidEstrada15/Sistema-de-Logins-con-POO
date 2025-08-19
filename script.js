import Accountmanager from "./ManagerAccounts.js"

const controlador= new Accountmanager()
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
const editeacount= document.getElementById("editeacount")
buttonWindow.textContent= "Crear nuevo usuario"
buttonkill.textContent= "X"
let loggin= JSON.parse(localStorage.getItem("logginstatus")) || false
actualizarusuario()
comprobarlogin()

editeacount.addEventListener("click", ()=>{

    const comprobarpassword = prompt("Ingresa la contrasenia")
        if (comprobarpassword == controlador.getActualUsers().getpassword()) {        
let nombre= prompt("Ingresa tu nombre: ")
    let edad= prompt("Ingresa tu edad: ")
    let correo= prompt("Ingresa tu correo: ")
    let image= prompt("Ingresa la url de tu imagen: ")
    let password= prompt("Ingresa la contrasenia de tu usuario (Guardala bien)")
    if (nombre != " " && edad != " " && correo != "") {
        controlador.editeactualuser(nombre,edad,correo,image, password)
        actualizarusuario()
    }else{
        alert("No ingresaste la informacion correctamente")
    }
        }else{
            alert("Contrasenia incorrecta")
        } 
})

closeloggin.addEventListener("click", ()=>{
    const mensajedealerta= confirm("Estas seguro de cerrar sesion ?")
    if (mensajedealerta == true) {
        loggin= false
    JSON.stringify(localStorage.setItem("logginstatus", loggin))
    location.reload()
    }
    
})

buttonWindow.addEventListener("click", ()=>{
    let nombre= prompt("Ingresa tu nombre: ")
    let edad= prompt("Ingresa tu edad: ")
    let correo= prompt("Ingresa tu correo: ")
    let image= prompt("Ingresa la url de tu imagen: ")
    let password= prompt("Ingresa la contrasenia de tu usuario (Guardala bien)")
    if (nombre != " " && edad != " " && correo != "") {
        controlador.addUser(nombre,edad,correo,image, password)
    }else{
        alert("No ingresaste la informacion correctamente")
    }
    
})
accountsbutton.addEventListener("click", ()=>{
createmodel()
})

function createmodel() {
const section = document.querySelector("section")
section.innerHTML= ``
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
        const comprobarpassword = prompt("Ingresa la contrasenia")
        if (comprobarpassword == Usuario.getpassword()) {
                controlador.changeUser(Usuario.getid())
        actualizarusuario()
        section.style.animation= " desaparecer 0.5s ease both";
        loggin = true
        JSON.stringify(localStorage.setItem("logginstatus", loggin))
        main.style.display= "flex"
        closeloggin.style.display= "block"
        buttonkill.style.display= "block"}else{
            alert("Contrasenia incorrecta")
        }
            }
                )

        eraseacount.addEventListener("click", ()=>{
            const confirmarborrar= confirm("Estas seguro de borrar el usuario ?")
            if (confirmarborrar == true) {
               controlador.removeUsers(Usuario)
            section.style.animation= " desaparecer 0.5s ease both";  
                }
        }
        )
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

function actualizarusuario() {
    main.style.backgroundImage= `url(${controlador.actualUser.getimage()})`
    infoimage.src= controlador.actualUser.getimage()
    Agetext.innerText= `${controlador.actualUser.getedad()} años`
    Emailtext.innerText= `Correo: ${controlador.actualUser.getcorreo()}`
    Nametext.innerText= controlador.actualUser.getnombre()
}

function comprobarlogin() {
    if (loggin  == false) {
    main.style.display= "none"
    closeloggin.style.display= "none"
    buttonkill.style.display= "none"
    createmodel()
}

}

function checkloggin() {
    return loggin == false ? controlador.getAllusers() : controlador.getAvailableUsers()
}