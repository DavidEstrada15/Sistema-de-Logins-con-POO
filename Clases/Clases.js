class Usuario {
    constructor(usuario) {
        this.nombre= usuario.nombre,
        this.edad= usuario.edad,
        this.correo= usuario.correo,
        this.image= usuario.image || "https://static.vecteezy.com/system/resources/thumbnails/021/548/095/small_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
        this.password= usuario.password,
        this.id=  usuario.id || `${Math.floor(Math.random() * 500) - Math.floor(Math.random() * 500)}`
    }

    getid(){
        return this.id
    }

    getpassword(){
        return this.password
    }

    getnombre(){
        return this.nombre
    }
    getcorreo(){
        return this.correo
    }

    getimage(){
        return this.image
    }

    getedad(){
        return this.edad
    }
}

export default Usuario