
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';


export default function UpdateUser({navigation}) {


  const volverLogin = async () => {
   
        navigation.navigate('Sesion');

  };

  const volverInicio = async () => {
   
    navigation.navigate('Home');

};


  return (
        <View style={styles.container}>
          <Text>Actualizar Usuario</Text>
         
          <TouchableOpacity style={styles.button} onPress={volverLogin}><Text style={styles.buttonText}>Cerrar Sesión</Text></TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={volverInicio}><Text style={styles.buttonText}>Volver a Inicio</Text></TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      borderWidth: 2,
      borderColor: "black",
      width: 100,
      borderRadius: 10,
      backgroundColor: "darkblue",
    },
    buttonText: {
      textAlign: 'center',
      color: "white"
    }
  });