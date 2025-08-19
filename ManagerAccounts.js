import Usuario from "./Clases/Clases.js";

class Accountmanager {
    constructor() {
        this.LSKeyUsers = 'users'
        this.LSKeyActualUser= "actual"
        this.users = this.getAllUsersFromLS()
        this.actualUser= this.getActualUserFromLS()
        this.saveAllUsers()
        this.saveActualUser()
    }

    getAllUsersFromLS() {
        const data= JSON.parse(localStorage.getItem(this.LSKeyUsers))

        return data ? data.map(user =>  new Usuario(user)) : [
            new Usuario({ nombre: "Luis",edad: 20,correo: "Luismiguel15@gmail.com", password: "Luis"}), 
            new Usuario({    nombre: "Angela", edad: 25,correo: "Angela30@gmail.com", password: "Angela"}), 
            new Usuario({    nombre:"Carlos",edad: 21,correo: "CarlosDoors17@gmail.com",image: "https://media.gq.com.mx/photos/67e2e0ced89a1ddf0a935ad1/master/w_2560%2Cc_limit/Hombres%2520alfa.jpg", password: "Carlos"})
        ]
    }

    getActualUserFromLS(){
        const user= JSON.parse(localStorage.getItem(this.LSKeyActualUser))
        return user ? new Usuario (user) : this.users[0]
    }

    saveAllUsers(){
        localStorage.setItem(this.LSKeyUsers, JSON.stringify(this.users))
    }

    saveActualUser(){
        localStorage.setItem(this.LSKeyActualUser, JSON.stringify(this.actualUser))
    }

    getAllusers(){
        return this.users
    }

    getActualUsers(){
        return this.actualUser
    }

    changeUser(id){
        this.actualUser= this.users.find(user => user.getid() == id)
        this.saveActualUser()

    }

    getAvailableUsers(){
        return this.users.filter(user => user.getid() !== this.actualUser.getid())
    }

    addUser(nombre, edad, correo, image, password){
        const newUser= new Usuario({nombre, edad, correo, image, password})
        this.users.push(newUser)
        this.actualUser= newUser
        this.saveActualUser()
        this.saveAllUsers()
        location.reload()
    }

    removeUsers(id){
        this.users.splice(this.users.indexOf(id), 1)
        this.saveAllUsers()
    }

    editeactualuser(nombre,edad,correo, image,password){
        this.getActualUsers().nombre = nombre
        this.getActualUsers().edad= edad
        this.getActualUsers().correo= correo
        this.getActualUsers().image= image
        this.getActualUsers().password= password
        this.saveActualUser()
        this.saveAllUsers()
    }
}

export default Accountmanager