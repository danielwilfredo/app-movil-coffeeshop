
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import Input from '../components/Inputs/Input'

export default function Sesion({navigation}) {

  const [isContra, setIsContra]=useState(true)


  const irHome = async () => {
    navigation.navigate('Home');
  };

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
      placeHolder='Usuario' />
         <Input 
      placeHolder='Contraseña'
      contra={isContra} />
      <TouchableOpacity style={styles.button} onPress={irHome}><Text style={styles.buttonText}>Iniciar Sesión</Text></TouchableOpacity>
      <TouchableOpacity onPress={irRegistrar}><Text style={styles.textRegistrar}>Registrar Usuario</Text></TouchableOpacity>
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