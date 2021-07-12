import React from 'react';

import './App.css';
import Login from './components/login/login';
import { BrowserRouter, Redirect, Route, useHistory } from 'react-router-dom';
import ClassContainer from './components/classContainer/ClassContainer';
import CalendarApp from './components/calendar/Calendar';
import Claims from './components/Claims/Claims';
import AddClaim from './components/Claims/AddClaim';
import DetailClaim from './components/Claims/DetailClaim';
import Profile from './components/perfilProfesor/profile';
import Chat from './components/Chat/Chat'
import Home from './components/home/Home'
import Register from './components/Register/Register'
import axios from 'axios';
import NavBar from './components/NavBar/NavBar'
import AddClass from './components/addClass/addClass';

enum Role {USER, PROFESSOR, ADMIN}
function App() {
  const history = useHistory()

  let [role, setRole] = React.useState(undefined)

  React.useEffect(() => {
    async function setRoleOfUser() {
      
      if (localStorage.getItem('user')) {
        const roleOfUser = await axios.get(`http://localhost:3001/api/session/${JSON.parse(localStorage.getItem('user')).mail}`)
        console.log('role ', roleOfUser)
        if (roleOfUser.data === 1) {
          console.log(localStorage.getItem('user'))
          setRole(roleOfUser.data)
        } else {
          console.log('el servidor no encontro ningun usuario con ese id')    
          setRole(roleOfUser.data)      
        }
      }
    }
    setRoleOfUser()
  }, [])


  return (
    <BrowserRouter>
      <Route path='/'> <NavBar /> </Route>
      <Route path='/clases/add'><AddClass /></Route>

      
        {role !== undefined ? <Route exact path='/claim' render={() => {
          console.log(role)
          if (role === 1) {
            return <Claims/>
          } else {
            return <Redirect to='/home'/>
          }
      }
      }></Route> : null}
      
      <Route exact path='/claim/:id' render={() => {
          if (role === Role.ADMIN) {
            return <DetailClaim />
          }
          else  {
            console.log('entre')
            return <Redirect to='/home'/>
          }          
      }
      }>
      </Route>

      <Route exact path='/claim/id/add' render={() => {
          if (role === Role.ADMIN) {
            return <AddClaim />
          }
          else {
            return < Redirect to="/home" />
          }        
      }
      }></Route>

    <Route exact path='/perfil' render={() => {      
          if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).mail)  {    
            return < Redirect to={`/perfil/${JSON.parse(localStorage.getItem('user')).mail}`} />
          }           
        }
      }
      ></Route>
      <Route path='/perfil/:email' exact render={({ match }) => {
            return <Profile >{match.params.email} </Profile>           
          }           
      } />
      

      <Route exact path='/registro' render={() => {
        console.log(role)
          if (role !== Role.USER && role !== Role.PROFESSOR) {
            return <Register />
          }
          else {
            return < Redirect to="/home" />
          }           
      }
      }></Route>

      <Route exact path='/login'> <Login /> </Route>
      <Route exact path='/calendar'> <CalendarApp /> </Route>
      <Route exact path='/chat'><Chat /></Route>
      <Route exact path='/claim/add'><AddClaim /></Route>
      <Route exact path='/home'> <Home /> </Route>
      <Route exact path='/clases'><ClassContainer /></Route>
    </BrowserRouter>

  );
}

export default App;
