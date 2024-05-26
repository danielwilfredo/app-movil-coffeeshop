import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';


export default function SelectProduct({ip, imagenProducto, idProducto, nombreProducto, descripcionProducto
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
         <Text style={styles.buttonText}>Seleccionar Producto</Text>
       </TouchableOpacity>
       <View style={styles.inputContainer}>
        <Text>Ingresar Cantidad: </Text>
        <TextInput
          style={styles.input}
          value={cantidad}
          onChangeText={text => setCantidad(text)}
          keyboardType="numeric"
        />
      </View>
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

// Realizar una solicitud GET
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Convertir la respuesta a JSON
  })
  .then(data => {
    console.log(data); // Manejo de los datos obtenidos
  })
  .catch(error => {
    console.error('Hubo un problema con la solicitud Fetch:', error);
  });


  // Realizar una solicitud POST
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Convertir la respuesta a JSON
  })
  .then(data => {
    console.log(data); // Manejo de los datos obtenidos
  })
  .catch(error => {
    console.error('Hubo un problema con la solicitud Fetch:', error);
  });



  // Realizar una solicitud GET
axios.get('https://jsonplaceholder.typicode.com/posts')
.then(response => {
  console.log(response.data); // Manejo de los datos obtenidos
})
.catch(error => {
  console.error('Error al realizar la solicitud:', error);
});

// Realizar una solicitud POST
axios.post('https://jsonplaceholder.typicode.com/posts', {
  title: 'foo',
  body: 'bar',
  userId: 1
})
  .then(response => {
    console.log(response.data); // Manejo de los datos obtenidos
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
  });
