
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import Input from '../components/Inputs/Input'
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes'
//import ip from '../utils/constantes.js'

export default function Sesion({navigation}) {

  
  const ip = Constantes.IP;

  const [isContra, setIsContra]=useState(true)
  const [usuario, setUsuario]=useState('')
  const [contrasenia, setContrasenia] = useState('')
  //const [confirmarContrasenia, setConfirmarContrasenia] = useState('')
  //http://localhost/coffeeshop/api/services/public/cliente.php?action=signUpMovil
  

      //const ip = 'http://10.10.0.168';
      //const ip = 'http://192.168.1.2';
      //const ip = 'http://192.168.137.65';
      
      //const ipR = ip;

      const cerrarSesion = async ()=>{
        try {
          const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logOut`, {
            method: 'GET'
          });
    
          const data = await response.json();
    
          if (data.status) {
            Alert.alert("Sesion Finalizada")
          } else {
            console.log(data);
            // Alert the user about the error
            Alert.alert('Error', data.error);
          }
        } catch (error) {
          console.error(error, "Error desde Catch");
          Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
        }
      }


 const handlerLogin = async () => {

    try {
      const formData = new FormData();
      formData.append('correo', usuario);
      formData.append('clave', contrasenia);
      //utilizar la direccion IP del servidor y no localhost
      console.error(formData, "valor formdata");
      const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logIn`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      console.error(data, "valor data.response");
      if (data.status) {
          //setContrasenia('')
        //setUsuario('')
          navigation.navigate('Productos');
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert('Error sesion', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  /*
  const handlerLogin = async () => {
    navigation.navigate('Home');
  };
*/
  const irRegistrar = async () => {
    navigation.navigate('SignUp');
  };



  return (
    <View style={styles.container}>
            <Image
        source={require('../img/coffee-cup.png')} // Ruta de la imagen dentro de la carpeta de activos
        style={styles.image}
      />
      
      <Text style={styles.texto}>Iniciar Sesión</Text>
     
      <Input 
      placeHolder='Usuario' 
      setValor={usuario}
      setTextChange={setUsuario}
      />
         <Input 
      placeHolder='Contraseña'
      setValor={contrasenia}
      setTextChange={setContrasenia}
      contra={isContra} />

      <Buttons
      textoBoton='Iniciar Sesión'
      accionBoton={handlerLogin}/>



      <TouchableOpacity onPress={irRegistrar}><Text style={styles.textRegistrar}>Registrar Usuario</Text></TouchableOpacity>


      <Buttons
      textoBoton='Cerrar Sesion'
      accionBoton={cerrarSesion}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EAD8C0',
      alignItems: 'center', 
      justifyContent:'center',
      
    },
    button: {
      borderWidth: 2,
      borderColor: "#AF8260",
      width: 150,
      borderRadius: 10,
      backgroundColor: "#AF8260", 
      padding:10, 
      marginVertical:10
    },
    buttonText: {
      textAlign: 'center',
      color: "#FFF", fontWeight:'800', textTransform:'uppercase'
    },
    texto:{
      color:'#322C2B', fontWeight:'900', 
      fontSize:20
    },
    textRegistrar:{
      color:'#322C2B', fontWeight:'700', 
      fontSize:18
    },
    image: {
      width: 75,
      height: 75,
      marginBottom:10
    },
  });