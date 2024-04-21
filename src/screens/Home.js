
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';


export default function Home({navigation}) {


  const volverLogin = async () => {
    navigation.navigate('Sesion');
  };

  const irActualizar = async () => {
    navigation.navigate('UpdateUser');
  };

 return (
    <View style={styles.container}>
      <Text>Pantalla de Home, Luego de iniciar sesion</Text>
      
      <TouchableOpacity style={styles.button} onPress={volverLogin}><Text style={styles.buttonText}>Cerrar Sesión</Text></TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={irActualizar}><Text style={styles.buttonText}>Actualizar usuario</Text></TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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