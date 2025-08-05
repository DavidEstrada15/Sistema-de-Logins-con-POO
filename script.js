const accountsbutton= document.getElementById("accounts")
const accounts=   []
const buttonWindow= document.createElement("button")
const buttonkill= document.createElement("button")
buttonWindow.textContent= "Crear nuevo usuario"
buttonkill.textContent= "X"
accountsbutton.addEventListener("click", ()=>{
    
    const section = document.createElement("section")
    const accountscontainer = document.createElement("div")
    const buttonscontainer= document.createElement("div")
    accountscontainer.classList.add("accountscontainer")
    buttonscontainer.appendChild(buttonWindow)
    buttonscontainer.appendChild(buttonkill)
    buttonscontainer.classList.add("buttonscontainer")
    section.appendChild(buttonscontainer)
    section.appendChild(accountscontainer)
    document.body.appendChild(section)
    accounts.forEach(account =>{
        accountscontainer.appendChild(account.crearusuario())
    })
    buttonkill.addEventListener("click", ()=>{
    document.body.removeChild(section)
})

})


buttonWindow.addEventListener("click", ()=>{
    let nombre= prompt("Ingresa tu nombre: ")
    let edad= prompt("Ingresa tu edad: ")
    let correo= prompt("Ingresa tu correo: ")
    let image= prompt("Ingresa la url de tu imagen: ")
    const object= {
        nombre: nombre,
        edad: edad,
        correo: correo,
        image: image
    }
    
    accounts.push(new Usuario(object))
})

import Usuario from "./Clases/Clases.js"