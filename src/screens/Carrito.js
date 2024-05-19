import {useState} from 'react'
import {Text, Touchable, TouchableOpacity, View, StyleSheet} from 'react-native'
import Constants from 'expo-constants';


const Carrito = ({navigation}) => {

    const backProducts = () =>{
        navigation.navigate('Productos')
    }

    return (  
<View style={styles.container}>
<Text>
    Aqui se mostrarán los productos
</Text>

<TouchableOpacity
onPress={backProducts}>
    <Text>Regresar a productos</Text>
</TouchableOpacity>
</View>
    );
}
 
export default Carrito;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EAD8C0',
      paddingTop: Constants.statusBarHeight,
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