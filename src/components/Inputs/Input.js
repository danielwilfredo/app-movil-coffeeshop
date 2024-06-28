
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, Platform} from 'react-native';


export default function Input({placeHolder, setValor, contra, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#FFF'}
    secureTextEntry={contra} 
    onChangeText={setTextChange}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor:'#A79277',
    color: "#fff", fontWeight:'800',
    width:250,
    height: Platform.OS === 'ios' ? 50 : 50, // Estilo de la barra de pestañas, altura diferente para iOS y Android
    borderRadius:5,
    padding: 5,
    marginVertical:10
  },

});