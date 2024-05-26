
import { StatusBar, StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image} from 'react-native';
import { useState, useEffect} from 'react';

export default function ProductoCard({ip, imagenProducto, idProducto, nombreProducto, descripcionProducto
    , precioProducto, existenciasProducto, accionBotonProducto
}){

    return(

        <View style={styles.card}>
        <View style={styles.imageContainer}>
         <Image
           source={{uri: `${ip}/coffeeshop/api/images/productos/${imagenProducto}`}}
           style={styles.image}
           resizeMode="contain" // Ajustar la imagen al contenedor
         />
       </View>
       <Text style={styles.text}>{idProducto}</Text>
       <Text style={styles.textTitle}>{nombreProducto}</Text>
       <Text style={styles.text}>{descripcionProducto}</Text>
       <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${precioProducto}</Text></Text>
       <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{existenciasProducto} {(existenciasProducto===1) ?'Unidad':'Unidades'}</Text></Text>
       <TouchableOpacity style={styles.button} onPress={accionBotonProducto}>
         <Text style={styles.buttonText}>Seleccionar Producto sdds</Text>
       </TouchableOpacity>
     </View>

    );
}


const styles = StyleSheet.create({
    containerFlat: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
    container: {
      flex: 1,
      backgroundColor: '#EAD8C0',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: StatusBar.currentHeight || 0,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      text: {
        fontSize: 16,
        marginBottom: 8,
      },
      textTitle: {
        fontSize: 16,
        marginBottom: 8,fontWeight:'700'
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginLeft: 8,
      },
      button: {
        backgroundColor: '#AF8260',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight:'600'
      },
      image: {
        width: '65%',
        height: 150,
        borderRadius: 8,
        marginBottom: 12,
      }, 
      imageContainer: {
        alignItems: 'center', // Centrar imagen horizontalmente
      },textDentro:{
        fontWeight:'400'
      }
  });

