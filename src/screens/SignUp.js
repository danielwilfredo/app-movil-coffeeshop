
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/Inputs/Input'
import InputMultiline from '../components/Inputs/InputMultiline'


export default function SignUp({ navigation }) {

    const [fecha, setFecha]=useState(new Date())
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };

    const handleLogout = async () => {

        navigation.navigate('Sesion');

    };


    return (
        <View style={styles.container}>


            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Registrar Usuario</Text>
                <Input
                    placeHolder='Nombre Cliente' />
                <Input
                    placeHolder='Apellido Cliente' />
                <Input
                    placeHolder='Email Cliente' />
                <InputMultiline
                    placeHolder='Dirección Cliente' />
                <Input
                    placeHolder='Dui Cliente' />

         <Text>Fecha Nacimiento</Text>
<View >
<TouchableOpacity onPress={showDatepicker}><Text>Show date picker!</Text></TouchableOpacity>
      <TouchableOpacity onPress={showTimepicker}><Text>Show time picker!</Text></TouchableOpacity>
      <Text>selected: {date.toLocaleString()}</Text>
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
                    placeHolder='Telefono' />
                <Input
                    placeHolder='Clave' />
                <Input
                    placeHolder='Confirmar Clave' />

                <TouchableOpacity style={styles.buttonRegistrar} onPress={handleLogout}><Text style={styles.buttonText}>Registrar Usuario</Text></TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogout}><Text style={styles.buttonText}>Ir a login</Text></TouchableOpacity>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',

    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderWidth: 2,
        borderColor: "#AF8260",
        width: 150,
        borderRadius: 10,
        backgroundColor: "#AF8260",
        padding: 10,
        marginVertical: 10
    },
    buttonRegistrar: {
        borderWidth: 2,
        borderColor: "#AF8260",
        width: 200,
        borderRadius: 10,
        backgroundColor: "#AF8260",
        padding: 10,
        marginVertical: 10
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF", fontWeight: '800', textTransform: 'uppercase'
    },
    texto: {
        color: '#322C2B', fontWeight: '900',
        fontSize: 20
    },
    textRegistrar: {
        color: '#322C2B', fontWeight: '700',
        fontSize: 18
    },
    image: {
        width: 75,
        height: 75,
        marginBottom: 10
    },
});