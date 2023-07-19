

/*Funciones importadas*/

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import backendUrl from '../../../serverConfig';
import "./styleAdd.css";
import { useSpring, animated } from 'react-spring';
import logo from '../../../GlobalStyles/images/logo.svg';
import imagen from '../../../GlobalStyles/images/image1.png';
import Swal from 'sweetalert2';
import { FaCheck } from 'react-icons/fa';




/*----------------------------  FUNCION PRINCIPAL  ---------------------------------- */

const Form_user_contacto = () => {
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  //Función que permite escribir en mayusculas solamente.
  const handleInput = (event) => {
    event.target.value = event.target.value.toUpperCase();
  };

  //Declaraciones de estado para almacenar los datos del los inputs
  const [nombre, setNombre] = useState('');
  const [ap, setAp] = useState('');
  const [am, setAm] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');
  const [tel, setTel] = useState('');

  const [ID, setID] = useState('');
  const [Indice, setIndice] = useState('');
  const routeLocation = useLocation();
  const ID_recibido = routeLocation.state && routeLocation.state.ID_USER;



  const [calle, setCalle] = useState('');
  const [col, setCol] = useState('');
  const [cp, setCp] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [delegacion, setDelegacion] = useState('');


  const [centroID, setCentro] = useState('');
  //nunmero de usuarios
  const [ultimoUserNum, setNumUs] = useState('');

  const [año, setAño] = useState('');


  //Función que permite agregar los datos a firebase usando una función llamada addUserNew que se encuentra en services.
  const handleSubmit = (event) => {



    //variables de base de datos
    const UserID = ID_recibido;
    const Calle = calle;
    const Colonia = col;
    const CodigoPostal = cp;
    const Delegacion = delegacion;


    const User_ID = UserID;

    const formData = {
      UserID,
      Calle,
      Colonia,
      Colonia,
      CodigoPostal,
      Delegacion
    };


    const Data = {
      Indice,
      User_ID
    }


    // Enviar los datos al servidor utilizando Axios
    axios.post(backendUrl + '/api/addInformationContactUser', formData)
      .then(response => {
        // Manejar la respuesta del servidor si es necesario

        if (response.status === 200) {
          // Autenticación exitosa, puedes redirigir al usuario a otra página
          //Alerta(icono, titulo, texto) ('Inicio de sesión exitoso');
          //            navigate("/loader-DashboardSU");

          //redigir y pasar el ID
          //navigate("/loader-DashboardSU");
          Alerta('success', 'Completado', 'Se ha registrado correctamente');
         navigate('/addUserEmergencia', { state: { ID_USER: ID_recibido } });

        } else {
          // Autenticación fallida
          Alerta('error', 'Sin éxito', 'Falló al registrar la información');
        }
      })
      .catch(error => {
        // Manejar errores si ocurre alguno
        console.error(error);
      });




//Alerta('success', 'id: '+ID_recibido);

  }



  function Alerta(icono, titulo, texto) {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Aceptar'
    })
  }
  function AlertaTimer(icono, titulo, tiempo) {
    Swal.fire({
      position: 'center',
      icon: icono,
      title: titulo,
      showConfirmButton: false,
      timer: tiempo
    })
  }

  //-----Funciones para establecer los valores a las declaraciones de estados
  const handleInputCalle = (event) => {
    setCalle(event.target.value);
  }
  const handleInputCol = (event) => {
    setCol(event.target.value);
  }
  const handleInputCp = (event) => {
    setCp(event.target.value);
  }
  const handleInputCiudad = (event) => {
    setCiudad(event.target.value);
  }
  const handleInputEstado = (event) => {
    setEstado(event.target.value);
  }
  const handleInputDelegacion = (event) => {
    setDelegacion(event.target.value);
  }

  const handleInputSexo = (event) => { setSexo(event.target.value); }
  const handleInputTel = (event) => { setTel(event.target.value); }

  let navigate = useNavigate();
  let [email, setEmail] = useState("");

  function CrearID(idCentro, indice, ultimosDigitosAño) {
    
    
    //id de personal = ID_Centro + P + Año + Numero de usuario
    const ID = idCentro + "U" + ultimosDigitosAño + indice;
    setID(ID);
  }

  const fetchCentro = async () => {


  };

  useEffect(() => {
    

  }, [navigate]);

  const Home = () => { 
    navigate("/loader-Home");
  }

  const Regresar = () => {
    navigate(-1);
  }

  //ID - > es el id de usuario
  //------------------------------------------------------------ >  RETURN()
  return (
    <body>
      <div className="left-panel">
        <img src={logo} className='logo' />
        <div className='contTitleLeft' >
          <label className='labelPanelLeft'><strong>Secciones completadas</strong></label>
          <div className='line'></div>
        </div>
        
        <label className='txtBTN' ><FaCheck /> Información personal</label>
      
       
        <label className='txtBTN' >Sección pendiente</label>
        <label className='txtBTN' >Sección pendiente</label>
        <label className='txtBTN' >Sección pendiente</label>
        <div className='contMenu' >
        

        </div>
        <div className='contentImage'>
          <img src={imagen} className='imagen' />
        </div>
      </div>




      <div className="right-panel">
        <div className="right-panel-content">
          <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Información de contacto</animated.h1>
        <h1>{ID_recibido}</h1>
        
            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa la calle:</label>
              <input type="text" class="inputGlobal" placeholder="Calle y número" value={calle} onChange={handleInputCalle} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa la colonia:</label>
              <input type="text" class="inputGlobal" placeholder="Colonia" value={col} onChange={handleInputCol} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el Código postal:</label>
              <input type="text" class="inputGlobal" placeholder="Código postal" value={cp} onChange={handleInputCp} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el delegacion:</label>
              <input type="number" class="inputGlobal" placeholder="Estado" value={delegacion} onChange={handleInputDelegacion} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa la ciudad:</label>
              <input type="number" class="inputGlobal" placeholder="Ciudad" value={ciudad} onChange={handleInputCiudad} onInput={handleInput} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el estado:</label>
              <input type="number" class="inputGlobal" placeholder="Estado" value={estado} onChange={handleInputEstado} onInput={handleInput} required />
            </div>

         

            

   

            <button type="submit" className='buttonPrincipalGlobal' onClick={handleSubmit} >Siguiente</button>




          </div>
        </div>

      </div>










      <div className="">



      </div>


    </body>
  );

}

export default Form_user_contacto;