
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes'
import Buttons from '../components/Buttons/Button';
import ProductoCard from '../components/Productos/ProductoCard';
import ModalCompra from '../components/Modales/ModalCompra';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono

export default function Productos({ navigation }) {

  const ip = Constantes.IP;
  const [dataProductos, setDataProductos] = useState([])
  const [dataCategorias, setDataCategorias] = useState([])
  const [selectedValue, setSelectedValue] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const [idProductoModal, setIdProductoModal] = useState('')
  const [nombreProductoModal, setNombreProductoModal] = useState('')

  const volverInicio = async () => {

    navigation.navigate('Home');

  };

  const handleCompra = (nombre, id) => {
    setModalVisible(true)
    setIdProductoModal(id)
    setNombreProductoModal(nombre)
  }

  //getCategorias Funcion para consultar por medio de una peticion GET los datos de la tabla categoria que se encuentran en la base de datos
  const getProductos = async (idCategoriaSelect = 1) => {
    try {
      if (idCategoriaSelect <= 0) //validar que vaya seleccionada una categoria de productos
      {
        return
      }
      const formData = new FormData();
      formData.append('idCategoria', idCategoriaSelect);
      //utilizar la direccion IP del servidor y no localhost
      const response = await fetch(`${ip}/coffeeshop/api/services/public/producto.php?action=readProductosCategoria`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log("data al obtener productos  \n", data)
      if (data.status) {
        console.log("trae datos el dataset", data)
        setDataProductos(data.dataset)
      } else {
        console.log("Data en el ELSE error productos", data);
        // Alert the user about the error
        Alert.alert('Error productos', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al listar los productos');
    }
  }

  const getCategorias = async () => {
    try {

      //utilizar la direccion IP del servidor y no localhost
      const response = await fetch(`${ip}/coffeeshop/api/services/public/categoria.php?action=readAll`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.status) {
        setDataCategorias(data.dataset)
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert('Error categorias', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al listar las categorias');
    }
  }

  const handleCategoriaChange = (itemValue, itemIndex) => {
    setSelectedCategoria(itemValue);
  };

  //Uso del React Hook UseEffect para que cada vez que se cargue la vista por primera vez
  //se ejecute la funcion getCategorias
  useEffect(() => {
    getProductos();
    getCategorias();
  }, []);

  const irCarrito = () => {
    navigation.navigate('Carrito')
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogo de Productos</Text>
      <Buttons
        textoBoton='Volver a Home'
        accionBoton={volverInicio}
      />
      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreProductoModal={nombreProductoModal}
        idProductoModal={idProductoModal}
        cantidad={cantidad}
        setCantidad={setCantidad}
      />
      <View>
        <Text style={styles.subtitle}>
          Selecciona una categoria para filtar productos
        </Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={{ inputAndroid: styles.picker }}
            onValueChange={(value) => getProductos(value)}
            placeholder={{ label: 'Selecciona una categoría...', value: null }}
            items={dataCategorias.map(categoria => ({
              label: categoria.nombre_categoria,
              value: categoria.id_categoria,
            }))}
          />
        </View>
      </View>
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
              accionBotonProducto={() => handleCompra(item.nombre_producto, item.id_producto)}
            />
          )}
        />
      </SafeAreaView>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={irCarrito}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.cartButtonText}>Ir al carrito</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 1,
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
    marginBottom: 8,
    fontWeight: '700'
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
    fontWeight: '600'
  },
  image: {
    width: '65%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  textDentro: {
    fontWeight: '400'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#AF8260',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  cartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
    marginHorizontal: 5,
    color: '#5C3D2E', // Brown color for the title
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#AF8260', // Color del borde
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#AF8260', // Color de fondo
  },
  picker: {
    color: '#ffffff'
  },
});