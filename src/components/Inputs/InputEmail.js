
import { StyleSheet, TextInput, Platform} from 'react-native';

export default function InputEmail({placeHolder, setValor, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#FFF'}
    onChangeText={setTextChange}
    keyboardType="email-address"
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor:'#A79277',
    color: "#fff", fontWeight:'800',
    width:250,
    borderRadius:5,
    padding: Platform.OS === 'ios' ? 15 : 10, // Estilo de la barra de pestañas, altura diferente para iOS y Android,
    marginVertical:10
  },

});