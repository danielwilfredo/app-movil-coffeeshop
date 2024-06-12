
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes'
import Input from '../components/Inputs/Input'
import InputMultiline from '../components/Inputs/InputMultiline'
import Buttons from '../components/Buttons/Button';


export default function SignUp({ navigation }) {
    const ip = Constantes.IP;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [direccion, setDireccion] = useState('')
    const [dui, setDui] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [clave, setClave] = useState('')
    const [confirmarClave, setConfirmarClave] = useState('')

    /*
    Codigo para mostrar el datetimepicker
    */

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        /*
        Codigo para convertir la fecha al formato año-mes-dia */

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const fechaNueva = `${year}-${month}-${day}`;
        setFechaNacimiento(fechaNueva)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    /*
        Fin Codigo para mostrar el datetimepicker
        */

    const handleLogout = async () => {
        /*
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
                } */
        navigation.navigate('Sesion');
    };





    //props que recibe input
    //placeHolder, setValor, contra, setTextChange

    const handleCreate = async () => {

        try {
            //utilizar la direccion IP del servidor y no localhost

            if (!(nombre.trim() !== "" &&
                apellido.trim() !== "" &&
                email.trim() !== "" &&
                direccion.trim() !== "" &&
                dui.trim() !== "" &&
                fechaNacimiento.trim() !== "" &&
                telefono.trim() !== "" &&
                clave.trim() !== "" &&
                confirmarClave.trim() !== ""
            )) {
                Alert.alert("Debdes llenar todos los campos")
                return
            }
            else {
                const formData = new FormData();
                formData.append('nombreCliente', nombre);
                formData.append('apellidoCliente', apellido);
                formData.append('correoCliente', email);
                formData.append('direccionCliente', direccion);
                formData.append('duiCliente', dui);
                formData.append('nacimientoCliente', fechaNacimiento);
                formData.append('telefonoCliente', telefono);
                formData.append('claveCliente', clave);
                formData.append('confirmarClave', confirmarClave);

               // console.log('Formato de la fecha: ', date)
                const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=signUpMovil`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                console.log("data despues del response", data);
                if (data.status) {
                    Alert.alert('Datos Guardados correctamente');
                    navigation.navigate('Sesion');
                } else {
                    Alert.alert('Error', data.error);
                }
            }

        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Registrar Usuario</Text>
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
                <Input
                    placeHolder='Email Cliente'
                    setValor={email}
                    setTextChange={setEmail} />
                <InputMultiline
                    placeHolder='Dirección Cliente'
                    setValor={setDireccion}
                    valor={direccion}
                    setTextChange={setDireccion} />
                <Input
                    placeHolder='Dui Cliente'
                    setValor={dui}
                    setTextChange={setDui} />

                <View style={styles.contenedorFecha}>
                    <Text style={styles.fecha}>Fecha Nacimiento</Text>

                    <TouchableOpacity onPress={showDatepicker}><Text style={styles.fechaSeleccionar}>Seleccionar Fecha:</Text></TouchableOpacity>
                    <Text style={styles.fecha}>Seleccion: {fechaNacimiento}</Text>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                </View>

                <Input
                    placeHolder='Telefono'
                    setValor={telefono}
                    setTextChange={setTelefono} />
                <Input
                    placeHolder='Clave'
                    contra={true}
                    setValor={clave}
                    setTextChange={setClave} />
                <Input
                    placeHolder='Confirmar Clave'
                    contra={true}
                    setValor={confirmarClave}
                    setTextChange={setConfirmarClave} />

                <Buttons
                    textoBoton='Registrar Usuario'
                    accionBoton={handleCreate}
                />

                <Buttons
                    textoBoton='Ir al Login'
                    accionBoton={handleLogout}
                />


            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',
        paddingTop: 20

    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        color: '#322C2B', fontWeight: '900',
        fontSize: 20
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
        textDecorationLine:'underline'
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