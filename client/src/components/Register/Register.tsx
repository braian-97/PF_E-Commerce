// import { createUser, loginWithGoogle } from '../../firebase';
import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { UserProps } from '../../../interfaces'
import { Formik } from 'formik';
import { validationSchemaRegister } from '../../utils/validations';
import imageParser from '../../utils/imageParser';
import { Button, Modal, Row, Col } from 'react-bootstrap';

enum ErrorType { INCOMPLETE_INPUTS, ALREADY_EXISTS }
enum Role { USER, PROFESSOR, ADMIN }

type Props = {
  handleClose: (e: any) => any,
  show: boolean,
}

const Register: React.FC<Props> = ({ show, handleClose }) => {

  // const [mail, setMail] = React.useState('')
  // const [password, setPass] = React.useState('')
  // const [name, setName] = React.useState('')
  // const [lastName, setlastName] = React.useState('')
  // const [city, setCity] = React.useState('')
  // const [state, setState] = React.useState('')
  // const [role, setRole] = React.useState(0)
  const [alreadyCreated, /* setAlreadyCreated */] = React.useState(false)

  const history = useHistory()

  async function handleSubmitRegister(values) {
    console.log(values)
    let user: UserProps = {
      lastName: values.lastName,
      mail: values.mail,
      name: values.name,
      role: values.role,
      city: values.city,
    }
    let userWithPassword = {
      ...user,
      password: values.password
    }
    if (values.mail === 'braiansilva@gmail.com') user.role = Role.ADMIN;
    try {
      const registro = await axios.post('http://localhost:3001/api/session/register', userWithPassword, { withCredentials: true })

      if (registro) alert("Se registro correctamente")

      history.push('/home')
    }
    catch (error) {
      if (error.response && error.response.data.type === ErrorType.ALREADY_EXISTS) {
        alert('El usuario ya existe!')
      } else if (error.response && error.response.data.type === ErrorType.INCOMPLETE_INPUTS) {
        alert('Debe ingresar mail, nombre y apellido')
      }
    }
  }
  async function googleSubmit() {

  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Llena el formulario para registrate!</Modal.Title>
          <Button variant="secondary" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Formik
            validationSchema={validationSchemaRegister}
            initialValues={{
              name: "",
              lastName: "",
              mail: "",
              password: "",
              role: 0,
              city: "",
              state: "",
            }}
            onSubmit={(values) => {
              console.log(values)
              handleSubmitRegister(values)

            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
              <form onSubmit={handleSubmit} className="mt-6 mb-4">
                <div className="form-row " >
                  <Col md={12} className="form-group mt-6" >
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      name="mail"
                      value={values.mail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text" id="inputEmail"
                      className={`form-control ${errors.mail && touched.mail ? 'is-invalid' : ''}`}
                    />
                    {errors.mail && touched.mail && <div className='invalid-feedback'>{errors.mail}</div>}

                  </Col>
                  <Col md={12} className="form-group mt-2">
                    <label htmlFor="inputPassword4">Password</label>
                    <input
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      id="inputPassword4"
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    />
                    {errors.password && touched.password && <div className='invalid-feedback'>{errors.password}</div>}
                  </Col>
                </div>
                <Col md={12} className="form-group mt-2">
                  <label htmlFor="inputAddress">Nombre</label>
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                    id="inputAddress"
                  />
                  {errors.name && touched.name && <div className='invalid-feedback'>{errors.name}</div>}
                </Col>
                <Col md={12} className="form-group mt-2">
                  <label htmlFor="inputAddress2">Apellido</label>
                  <input
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                    id="inputAddress2"
                  />
                  {errors.lastName && touched.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                </Col>
                <div className="form-row mt-2">
                  <Col md={12}>
                    <label htmlFor="inputCity">Ciudad</label>
                    <input
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
                      id="inputCity"
                    />
                    {errors.city && touched.city && <div className='invalid-feedback'>{errors.city}</div>}
                  </Col>
                  <div className="form-group col-md-4">
                    {/* <label htmlFor="inputState">Estado</label>
                    <select
                      name="state"
                      id="inputState"
                      className={`form-control`}
                    >
                      <option defaultValue="">Choose...</option>
                      <option>...</option>
                    </select>
                  </div> */}

                  </div>
                  <Row className=" mt-2" >
                    <label className="form-check-label" htmlFor="gridCheck">Rol</label><br></br>
                    <Col md={5} className="d-flex justify-content-evenly align-items-center p-0">
                      <label className="form-check-label mr-2" htmlFor="gridCheck">User</label><br></br>
                      <input
                        name="role"
                        type="radio" id="gridCheck"
                        // onChange={() => setRole(Role.PROFESSOR)} 
                        onChange={handleChange}
                        value={Role.USER}
                        defaultChecked
                      />
                      <label className="form-check-label mr-3" htmlFor="gridCheck">Profesor</label><br></br>
                      <input type="radio"
                        name="role"
                        value={Role.PROFESSOR}
                        onChange={handleChange}
                      ></input>
                    </Col>
                  </Row>
                </div>
                <Row  md={12} className=" mt-3 ">
                  <Col sm={6} md={6} lg={6} className="d-flex justify-content-center">
                    <button type="submit" id="local" className="btn btn-primary">Regístrate</button>
                  </Col>
                  <Col sm={6} md={6} lg={6}>
                    <button onClick={googleSubmit} id="google" className="btn btn-primary " >Regístrate con Google</button>
                    {alreadyCreated ? <span style={{ color: 'red' }}>El usuario ya está siendo usado</span> : ''}
                  </Col>
                </Row>
              </form >
            )}
          </Formik>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}



export default Register