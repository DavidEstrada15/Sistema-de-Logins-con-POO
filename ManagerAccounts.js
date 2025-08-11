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

        return data ? data.map(user => (user)) : [
            new Usuario({ nombre: "Luis",edad: 20,correo: "Luismiguel15@gmail.com"}), 
            new Usuario({    nombre: "Angela", edad: 25,correo: "Angela30@gmail.com"}), 
            new Usuario({    nombre:"Carlos",edad: 21,correo: "CarlosDoors17@gmail.com",image: "https://media.gq.com.mx/photos/67e2e0ced89a1ddf0a935ad1/master/w_2560%2Cc_limit/Hombres%2520alfa.jpg"})
        ]
    }

    getActualUserFromLS(){
        const user= JSON.parse(localStorage.getItem(this.LSKeyActualUser))
        return user ? (user) : this.users[0]
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
        this.actualUser= this.users.find(user => user.id == id)
        this.saveActualUser()

    }

    getAvailableUsers(){
        return this.users.filter(user => user.id !== this.actualUser.id)
    }

    addUser(nombre, edad, correo, image){
        const newUser= new Usuario({nombre, edad, correo, image})
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
}

export default Accountmanager