import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/constantes'
import Constants from 'expo-constants';
// Import de componentes
import Input from '../components/Inputs/Input'
import InputMultiline from '../components/Inputs/InputMultiline'
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';

export default function UpdateUser({ navigation }) {

  const ip = Constantes.IP;

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [direccion, setDireccion] = useState('')
  const [dui, setDui] = useState('')
  const [telefono, setTelefono] = useState('')

  // Expresiones regulares para validar DUI y teléfono
  const duiRegex = /^\d{8}-\d$/;
  const telefonoRegex = /^\d{4}-\d{4}$/;

  // Funcion para llenar los inputs con los datos del usuario
  const fillData = async () => {
    try {
        const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=getUser`, {
            method: 'GET'
        });
        const data = await response.json();
        console.log("Data en actualizar consultada", data);
        if (data.status) {
            console.log(data.name, 'Valor de editar perfil')
            setNombre(data.name.nombre_cliente);
            setApellido(data.name.apellido_cliente);
            setEmail(data.name.correo_cliente);
            setDireccion(data.name.direccion_cliente);
            setDui(data.name.dui_cliente);
            setTelefono(data.name.telefono_cliente);
        } else {
            Alert.alert('Error', data.error);
        }
    } catch (error) {
        Alert.alert('Ocurrió un error al intentar obtener los datos del usuario');
    }
  };

  // Logica para cargar los datos del usuario al cargar la pantalla
  useFocusEffect(
    React.useCallback(() => {
        fillData();
    }, [])
  );

  const editProfile = async () => {
    try {
        console.log("Datos a enviar", nombre, apellido, email, direccion, dui, telefono)

        // Validar los campos
        if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
            !dui.trim() || !telefono.trim()) {
            Alert.alert("Debes llenar todos los campos");
            return;
        } else if (!duiRegex.test(dui)) {
            Alert.alert("El DUI debe tener el formato correcto (########-#)");
            return;
        } else if (!telefonoRegex.test(telefono)) {
            Alert.alert("El teléfono debe tener el formato correcto (####-####)");
            return;
        }

        // Si todos los campos son válidos, proceder con la creación del usuario
        const formData = new FormData();
        formData.append('nombreCliente', nombre);
        formData.append('apellidoCliente', apellido);
        // formData.append('correoCliente', email);
        formData.append('direccionCliente', direccion);
        // formData.append('telefonoCliente', telefono);
        const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=editProfile`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log(data, "Data desde Editar Perfil OK")
        if (data.status) {
            console.log(data, 'Valor de editar perfil OK')
            Alert.alert('Perfil editado correctamente', '', [
                { text: 'OK', onPress: () => fillData() },
            ], { icon: 'success' });
        } else {
            Alert.alert('Error', data.error);
        }
    } catch (error) {
        Alert.alert('Ocurrió un error al intentar crear el usuario');
    }
  };

  const volverInicio = () => {
    navigation.navigate('TabNavigator');
  };

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <Text style={styles.texto}>Actualizar Usuario</Text>
            <Text style={styles.infoText}>El correo, DUI y teléfono no se pueden modificar. Contactese con el administrador del sistema</Text>
            <Input
                placeHolder='Nombre Cliente'
                setValor={nombre}
                setTextChange={setNombre}
            />
            <Input
                placeHolder='Apellido Cliente'
                setValor={apellido}
                setTextChange={setApellido}
            />
            <InputEmail
                placeHolder='Email Cliente'
                setValor={email}
                setTextChange={setEmail}
                setEditable={false}
            />
            <InputMultiline
                placeHolder='Dirección Cliente'
                setValor={setDireccion}
                valor={direccion}
                setTextChange={setDireccion}
            />
            <MaskedInputDui
                dui={dui}
                setDui={setDui}
                setEditable={false}
            />
            <MaskedInputTelefono
                telefono={telefono}
                setTelefono={setTelefono}
                setEditable={false}
            />
            <Buttons
                textoBoton='Editar Usuario'
                accionBoton={editProfile}
            />
            <Buttons
                textoBoton='Volver al Inicio'
                accionBoton={volverInicio}
            />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    paddingTop: Constants.statusBarHeight + 5, // el 5 es para darle un pequeño margen cuando hay una cámara en el centro de la pantalla
  },
  scrollViewStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  texto: {
    color: '#322C2B', fontWeight: '900',
    fontSize: 20
  },
  infoText: {
    color: '#322C2B',
    fontWeight: '700',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center'
  },
  textRegistrar: {
    color: '#322C2B', fontWeight: '700',
    fontSize: 18
  },
  fecha: {
    fontWeight: '600',
    color: '#FFF'
  },
  fechaSeleccionar: {
    fontWeight: '700',
    color: '#322C2B',
    textDecorationLine: 'underline'
  },
  contenedorFecha: {
    backgroundColor: '#A79277',
    color: "#fff", fontWeight: '800',
    width: 250,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10
  }
});
