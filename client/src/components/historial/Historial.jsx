import React from 'react'
import { Container } from 'react-bootstrap'
import "../historial/Historial.module.css"
import { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Modal, Row, } from 'react-bootstrap'
import axios from 'axios'
import Puntuar from '../puntuar/Puntuar.jsx'
import getCookieValue from '../../cookieParser'
const Historial = () => {
    const profileImg = {
        height: '160px',
        width: '160px',
        borderRadius: '50%',
    };
    var j=0
    const classListContainer = {
        // position: 'relative',
        // overflowY: 'auto',
        margin: 'auto',
        paddingLeft: '0px',
        listStyleType: 'none',
    };
    const [show, setShow] = useState([false]);
    const handleClose = (i) => {
        console.log("INDEX", i)
        if(show.length=i){setShow([false])}
        if(show.length<=i)setShow([...show, false])};
    const handleShow = (i) => {
        console.log("INDEX2", i)
        console.log("SHOWINDEX", show)
        if(show.length=i){setShow([true])}
        if(show.length<=i)setShow([...show, true])};
    const [historia, setHistoria]=useState([])
    const [alum, setAlum]=useState("")
    const fetchHistorial = async () => {
        try {
            
            const token = getCookieValue("token").slice(
                1,
                getCookieValue("token").length - 1
              );
              let userResponse = await axios.post(
                `http://localhost:3001/api/verify`,
                {},
                { headers: { Authorization: token } }
              );
              console.log("Iserresponse", userResponse)
              let role="student"
            if(userResponse.data.role===1)role="profesor"
            await setAlum(userResponse.data.mail)            
            const response = await axios.get(`http://localhost:3001/api/clases/all/student/${userResponse.data.mail}`)
            console.log("RESPONSEEEE", response)
            await setHistoria([
                ...response.data]
            )
            
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchHistorial()
    },[])
    console.log("Show", show)
    return (
        <div class="container" >
            <h1>Mi historial de cursos</h1>
            
            <ul style={classListContainer}>
                {historia.map((e, i)=>{
                    console.log("ESTO ES E", e)
                    const clase=e
                    if(!e.profesor){return null}
                    return (
                        <Container style={{background:"silver", borderColor:"red", borderRadius:"20px", marginTop:"20px"}}>
                            <div>
                                <div className="d-flex justify-content-start" style={{width:"500px"}}>
                                   {e.profesor? <Card.Img style={profileImg}  src={e.profesor.foto} alt="Error" />: null}
                                   <div style={{marginLeft:"20px"}}>
                                        {e.status==="complete"?<div style={{backgroundColor: "#1ECD97", borderRadius: "20px", fontFamily:"Montserrat", fontSize:"18px", padding:"3px",width:"300px", boxSizing:"border-box", display:"flex", justifyContent:"center",}}>
                                            Clase completada
                                        </div> : (e.status==="pending"?<div style={{backgroundColor: "#F4A62E", borderRadius: "20px", fontFamily:"Montserrat", fontSize:"18px", padding:"3px",width:"300px", boxSizing:"border-box", display:"flex",fontWeight:"700", justifyContent:"center"}}>
                                            Pendiente
                                        </div>: (e.status==="cancelled"?<div style={{backgroundColor: "#FB797E", borderRadius: "20px", fontFamily:"Montserrat", fontWeight:"700", fontSize:"18px", padding:"3px",width:"300px", display:"flex", justifyContent:"center"}}>
                                            Cancelado
                                        </div>:<div style={{backgroundColor: "#2E67F4", borderRadius: "20px", fontFamily:"Montserrat", fontSize:"18px", padding:"3px", boxSizing:"border-box",width:"300px", display:"flex", justifyContent:"center", fontWeight:"700"}}>
                                            Publicado
                                        </div>))
                                        }
                                        <div>
                                            Materia: {e.materia}
                                        </div>
                                        <div>
                                            Nombre de la clase: {e.nombre}
                                        </div>
                                        {e.status!==null?<div>
                                            Fecha de la clase: {e.date.day}/{e.date.month}/{e.date.year} 
                                        </div>:null}
                                        {e.status!==null?<div>
                                            Horario de la clase: {e.date.time[0]}-{e.date.time[1]}
                                        </div>:null}
                                        <div>
                                            Precio: {e.precio}
                                        </div>
                                        {(e.profesor.User_mail===alum && e.status!==null)?<div>
                                                                        Alumno: {e.student.name} {e.student.lastName}
                                                                    </div>:
                                                                    <div>
                                                                        Profesor: {e.profesor.name} {e.profesor.lastName}
                                                                    </div>}

                                   </div>
                                   {e.status==="complete"?
                                   <div  style={{marginLeft:"35vw"}}>
                                        <Button onClick={() => handleShow(i)}> Puntuar clase </Button>
                                        <Puntuar key={i}id={i} show={show[i]} handleClose={() => handleClose(i)} clase={e} alum={alum} index={i} />
                                   </div>: null}
                                </div>
                            </div>
                        </Container>
                            )
                })}
         
            </ul>
            
        </div>
    )
}

export default Historial
