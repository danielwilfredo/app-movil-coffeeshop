
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import * as Constantes from '../utils/constantes'
import Buttons from '../components/Buttons/Button';


export default function Home({navigation}) {
  const [correo, setCorreo]=useState(null)
  const [nombre, setNombre]=useState(null)


  const ip = Constantes.IP;
  
  const handleLogout = async () => {
        try {
          const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logOut`, {
            method: 'GET'
          });
    
          const data = await response.json();
    
          if (data.status) {
            navigation.navigate('Sesion');
          } else {
            console.log(data);
            // Alert the user about the error
            Alert.alert('Error', data.error);
          }
        } catch (error) {
          Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
      };

      const getUser = async () => {
        try {
          const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=getUser`, {
            method: 'GET'
          });
    
          const data = await response.json();
    
          console.log(data.name.nombre_cliente)
          if (data.status) {
           //codigo para mostrar el correo del usuario
            //setCorreo(data.username)
            //codigo para mostrar el nombre del usuario
           setNombre(data.name.nombre_cliente)
           
          } else {
            console.log(data);
            // Alert the user about the error
            Alert.alert('Error', data.error);
          }
        } catch (error) {
          Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
      };

      useEffect(()=>{
        getUser();
      },[])


    
  const irActualizar = async () => {
    navigation.navigate('Productos');
  };

  const EditUser = async () => {
    navigation.navigate('UpdateUser');
  };


 return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenid@</Text>
      <Text style={styles.subtitle}> 
        { /*correo ? correo : 'No hay correo para mostrar'*/}
        {nombre ? nombre : 'No hay Nombre para mostrar'}
      </Text>
      <Buttons
      textoBoton='Cerrar Sesión'
      accionBoton={handleLogout}
      />
      
      <Buttons
      textoBoton='Ver Productos'
      accionBoton={irActualizar}
      />
      <Buttons
      textoBoton='Editar Usuario'
      accionBoton={EditUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EAD8C0',
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      borderWidth: 2,
      borderColor: "black",
      width: 100,
      borderRadius: 10,
      backgroundColor: "darkblue"
    },
    buttonText: {
      textAlign: 'center',
      color: "white"
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 5,
      color: '#5C3D2E', // Brown color for the title
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      marginVertical: 5,
      color: '#5C3D2E', // Brown color for the title
    },
  });