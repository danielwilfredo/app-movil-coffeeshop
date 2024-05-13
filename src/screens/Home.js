
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import * as Constantes from '../utils/constantes'
import Buttons from '../components/Buttons/Button';


export default function Home({navigation}) {


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
          console.error(error, "Error desde Catch");
          Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
        }
      };



  const volverLogin = async () => {
    navigation.navigate('Sesion');
  };

  const irActualizar = async () => {
    navigation.navigate('Productos');
  };

 return (
    <View style={styles.container}>
      <Text>Pantalla de Home</Text>
      
      <Buttons
      textoBoton='Cerrar Sesión'
      accionBoton={handleLogout}
      />
      
      <Buttons
      textoBoton='Ver Productos'
      accionBoton={irActualizar}
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
    }
  });