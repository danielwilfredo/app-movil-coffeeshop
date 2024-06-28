import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Input from '../components/Inputs/Input'
import InputEmail from '../components/Inputs/InputEmail'
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes'
import { useFocusEffect } from '@react-navigation/native';

export default function Sesion({ navigation }) {
  const ip = Constantes.IP;

  const [isContra, setIsContra] = useState(true)
  const [usuario, setUsuario] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
    React.useCallback(() => {
      validarSesion(); // Llama a la función getDetalleCarrito.
    }, [])
  );

  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
  
      const data = await response.json();
  
      if (data.status === 1) {
        navigation.navigate('TabNavigator');
        console.log("Se ingresa con la sesión activa")
      } else {
        console.log("No hay sesión activa")
        return
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
  }

  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        console.log("Sesión Finalizada")
      } else {
        console.log('No se pudo eliminar la sesión')
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
    }
  }

  const handlerLogin = async () => {
    if (!usuario || !contrasenia) {
      Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('correo', usuario);
      formData.append('clave', contrasenia);

      const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logIn`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status) {
        setContrasenia('')
        setUsuario('')
        navigation.navigate('TabNavigator');
      } else {
        console.log(data);
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const irRegistrar = async () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => { validarSesion() }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/coffee-cup.png')}
        style={styles.image}
      />
      <Text style={styles.texto}>Iniciar Sesión</Text>
      <InputEmail
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
        accionBoton={handlerLogin} />
      <TouchableOpacity onPress={irRegistrar}><Text style={styles.textRegistrar}>¿No tienes cuenta? Regístrate aquí</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#322C2B', fontWeight: '900',
    fontSize: 20
  },
  textRegistrar: {
    color: '#322C2B', fontWeight: '700',
    fontSize: 18,
    marginTop: 10
  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 10
  },
});
