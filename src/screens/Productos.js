
import { StatusBar, StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image, Modal} from 'react-native';
import { useState, useEffect} from 'react';
import * as Constantes from '../utils/constantes'
import Buttons from '../components/Buttons/Button';
import ProductoCard from '../components/Productos/ProductoCard';
import ModalCompra from '../components/Modales/ModalCompra';

export default function Productos({navigation}) {

    const ip = Constantes.IP;
    const [dataProductos, setDataProductos]=useState([])
    const [dataCategorias, setDataCategorias]=useState([])
    const [cantidad, setCantidad] = useState('');
    const [modalVisible, setModalVisible]=useState(true)
    const [idProductoModal, setIdProductoModal]=useState('')
    const [nombreProductoModal, setNombreProductoModal]=useState('')

  const volverLogin = async () => {
   
        navigation.navigate('Sesion');

  };

  const volverInicio = async () => {
   
    navigation.navigate('Home');

};

const handleCompra = (nombre, id)=>{
    setModalVisible(true)
    setIdProductoModal(id)
    setNombreProductoModal(nombre)
}

//getCategorias Funcion para consultar por medio de una peticion GET los datos de la tabla categoria que se encuentran en la base de datos
const getProductos = async () => {
    try {
        
        const formData = new FormData();
        formData.append('idCategoria', 4);

        //utilizar la direccion IP del servidor y no localhost
        const response = await fetch(`${ip}/coffeeshop/api/services/public/producto.php?action=readProductosCategoria`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log("data al obtener productos  \n", data)
        if (data.status) {
            setDataProductos(data.dataset)
        } else {
            console.log(data);
            // Alert the user about the error
            Alert.alert('Error', data.error);
        }
    } catch (error) {
        console.error(error, "Error desde Catch");
        Alert.alert('Error', 'Ocurrió un error al listar los productos');
    }
}

const getCategorias = async () => {
    try {
        
        const formData = new FormData();
        formData.append('idCategoria', 4);

        //utilizar la direccion IP del servidor y no localhost
        const response = await fetch(`${ip}/coffeeshop/api/services/public/producto.php?action=readProductosCategoria`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log("data al obtener productos  \n", data)
        if (data.status) {
            setDataCategorias(data.dataset)
        } else {
            console.log(data);
            // Alert the user about the error
            Alert.alert('Error', data.error);
        }
    } catch (error) {
        console.error(error, "Error desde Catch");
        Alert.alert('Error', 'Ocurrió un error al listar los productos');
    }
}

//Uso del React Hook UseEffect para que cada vez que se cargue la vista por primera vez
//se ejecute la funcion getCategorias
useEffect(() => {
    getProductos()
}, []);



  return (
        <View style={styles.container}>
          <Text>Seccion de Productos</Text>
          <Buttons
          textoBoton='Cerrar Sesión'
          accionBoton={volverLogin}
          />

<Buttons
          textoBoton='Volver a Home'
          accionBoton={volverInicio}
          />     

<ModalCompra
visible={modalVisible}
cerrarModal={setModalVisible}
nombreProductoModal={nombreProductoModal}
idProductoModal={idProductoModal}
/>

<SafeAreaView style={styles.containerFlat}>
<FlatList
  data={dataProductos}
  keyExtractor={(item) => item.id_producto}
  renderItem={({ item }) => ( // Util izamos destructuración para obtener directamente el item
  
  <ProductoCard ip={ip}
  imagenProducto={item.imagen_producto}
    idProducto={item.id_producto}
     nombreProducto={item.nombre_producto}
      descripcionProducto={item.descripcion_producto}
      precioProducto={item.precio_producto}
 existenciasProducto={item.existencias_producto}
 accionBotonProducto={()=>handleCompra(item.nombre_producto, item.id_producto)}
  />
  )}
/>
    </SafeAreaView>

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

