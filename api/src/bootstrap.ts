import { ProfesorProps, UserProps } from "../../interfaces"
import Alumno from "./models/Alumno"
import Clase from "./models/Clase"

import Profesor from "./models/Profesor"
import Rango from "./models/Rango"
import rango_profesor from "./models/rango_profesor"
import Reclamo from "./models/Reclamo"
import User from "./models/Usuario"
import { Role } from "../../interfaces"

const bootstrap = async () => {

    const Diego: UserProps = {
        name: `Diego`,
        lastName: 'Araujo',
        mail: "diegoaraujo@gmail.com",
        role: Role.ADMIN 
    }

    const Braian: UserProps = {
        name: `Braian`,
        lastName: 'Silva',
        mail: "braiansilva@gmail.com",
        role: Role.ADMIN
    }

    const Edward: UserProps = {
        name: 'Edward',
        lastName: 'Burgos',
        mail: "edwardburgos@gmail.com",
        role: Role.ADMIN
    }

    const Javi: UserProps = {
        name: 'Javier',
        lastName: 'Carro',
        mail: "javiercarro@gmail.com",
        role: Role.ADMIN
    }
    const Mauro: UserProps = {
        name: 'Mauro',
        lastName: 'Leonel',
        mail: "mauroleonel@gmail.com", 
        role: Role.ADMIN
    }

    

    const DiegoProfe: ProfesorProps = {
        name: `Diego`,
        lastName: 'Araujo',
        User_mail: "diegoaraujo@gmail.com",
        city: "Buenos Aires",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar",
        score: 3
    }

    const BraianProfe: ProfesorProps = {
        name: `Braian`,
        lastName: 'Silva',
        User_mail: "braiansilva@gmail.com",
        city: "Buenos Aires",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar",
        score: 3
    }

    const EdwardProfe: ProfesorProps = {
        name: 'Edward',
        lastName: 'Burgos',
        User_mail: "edwardburgos@gmail.com",
        score: 2.1,
        city: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar"
    }
    const MauroProfe: ProfesorProps = {
        name: 'Mauro',
        lastName: 'Leonel',
        User_mail: "mauroleonel@gmail.com",
        city: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar",
        score: 4
    }
    const JaviProfe: ProfesorProps = {
        name: 'Javier',
        lastName: 'Carro',
        User_mail: "javiercarro@gmail.com",
        city: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar",
        score: 4
    }

    for (const x of [Diego, Braian, Edward, Mauro, Javi]) {
        await User.create(x)
    }
    for (const x of [DiegoProfe, BraianProfe, EdwardProfe, MauroProfe, JaviProfe]){
        await Profesor.create(x)
    }

    // Parte II

    // await Alumno.create({
    //     User_usuario: "mauroleonel@gmail.com",
    //     ciudad: "Lima",
    //     foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
    //     descripcion: "Alumno"
    // })

    

    // await Alumno.create({
    //     User_usuario: "usuario1@gmail.com",
    //     ciudad: "Lima",
    //     foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
    //     descripcion: "Alumno 1"
    // })

    

    // await Alumno.create({
    //     User_usuario: "usuario2@gmail.com",
    //     ciudad: "Lima",
    //     foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
    //     descripcion: "Alumno 2"
    // })

    // await User.create({
    //     nombre: 'Usuario 3 Nombre',
    //     apellido: 'Usuario 3 Apellido',
    //     mail: "usuario3@gmail.com"
    // })

    // await Alumno.create({
    //     User_usuario: "usuario3@gmail.com",
    //     ciudad: "Lima",
    //     foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
    //     descripcion: "Alumno 3"
    // })


    // await Rango.create({
    //     inicio: 16,
    //     fin: 18,
    //     dia: 'domingo'
    // })

    // await rango_profesor.create({
    //     email: "diegoaraujo@gmail.com",
    //     Rango_id: 1
    // })

    // await rango_profesor.create({
    //     email: "braiansilva@gmail.com",
    //     Rango_id: 1
    // })
    // await rango_profesor.create({
    //     email: "edwardburgos@gmail.com",
    //     Rango_id: 1
    // })

    await Clase.create({
        nombre: 'Sumas y Restas',
        Profesor_mail: "edwardburgos@gmail.com",
        descripcion: 'Aprende a sumar y restar para ser el mejor de tu clase',
        materia: 'Matemática',
        grado: "Primer grado",
        nivel: 'Primario'
    })
    await Clase.create({
        nombre: 'Aprende a comunicar',
        Profesor_mail: "edwardburgos@gmail.com",
        descripción: 'Aprende a comunicarte asertivamente con tu entorno',
        materia: 'Comunicación',
        score: 4.63,
        grado: "Cuarto grado",
        nivel: 'Terciario'
    })

    await Clase.create({
        nombre: 'Inglés para jóvenes',
        Profesor_mail: "edwardburgos@gmail.com",
        descripción: 'En esta clase te enseñaré todo lo que necesitas para tener un nivel intermedio de Inglés',
        materia: 'Inglés',
        score: 2.33,
        grado: "Sexto grado",
        nivel: 'Secundario'
    })

    // await Clase.create({
    //     materia: 'matematica',
    //     Profesor_mail: "diegoaraujo@gmail.com",
    //     grado: "primer grado"
    // })
    // await Clase.create({
    //     materia: 'matematica',
    //     Profesor_mail: "braiansilva@gmail.com",
    //     grado: "primer grado"
    // })
    // await Reclamo.create({
    //     Denunciante_email: "edwardburgos@gmail.com",
    //     Denunciado_email: "braiansilva@gmail.com",
    //     Admin_email: "juanperez3@gmail.com"
        
    // })


    


}
export default bootstrap

// await User.create({
//     nombre: 'Usuario 1 Nombre',
//     apellido: 'Usuario 1 Apellido',
//     mail: "usuario1@gmail.com"
// })
// await User.create({
//     nombre: 'Usuario 2 Nombre',
//     apellido: 'Usuario 2 Apellido',
//     mail: "usuario2@gmail.com"
// })