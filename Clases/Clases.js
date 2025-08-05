class Usuario {
    constructor(usuario) {
        this.nombre= usuario.nombre,
        this.edad= usuario.edad,
        this.correo= usuario.correo
        this.image= usuario.image
    }

    crearusuario =() => {
        const article= document.createElement("article")
        const nombreelement= document.createElement("h2")
        nombreelement.innerText= this.nombre
        const edadelement= document.createElement('h3')
        edadelement.innerText= this.edad
        const correoelement= document.createElement('h3')
        correoelement.innerText= this.correo
        const imagelement= document.createElement("img")
        imagelement.src= this.image

        article.appendChild(nombreelement)
        article.appendChild(edadelement)
        article.appendChild(correoelement)
        article.appendChild(imagelement)
        return article
    }
}

export default Usuario