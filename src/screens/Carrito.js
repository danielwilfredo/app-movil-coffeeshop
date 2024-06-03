import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Buttons/Button';
import CarritoCard from '../components/CarritoCard/CarritoCard';
import ModalEditarCantidad from '../components/Modales/ModalEditarCantidad';

const Carrito = ({ navigation }) => {
  const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
  const [idDetalle, setIdDetalle]=useState(null)
  const [cantidadProductoCarrito, setCantidadProductoCarrito]=useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const ip = Constantes.IP;

  const backProducts = () => {
    navigation.navigate('Productos');
  };

  useEffect(() => {
    getDetalleCarrito();
  }, []);

  const getDetalleCarrito = async () => {
    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/public/pedido.php?action=readDetail`, {
        method: 'GET',
      });

      const data = await response.json();
      console.log("data al obtener detalle carrito  \n", data);
      if (data.status) {
        setDataDetalleCarrito(data.dataset);
      } else {
        console.log(data);
        Alert.alert('ADVERTENCIA', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al listar las categorias');
    }
  };

  const finalizarPedido = async () => {
    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/public/pedido.php?action=finishOrder`, {
        method: 'GET',
      });

      const data = await response.json();
      //console.log("data al obtener detalle carrito  \n", data);
      if (data.status) {
        Alert.alert("Se finalizo la compra correctamente")
        navigation.navigate('Productos');
      } else {
        //console.log(data);
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar pedido');
    }
  };

  const handleEditarDetalle = (idDetalle, cantidadDetalle) => {
    console.log("Valor que viene de carrito CarritoCard", cantidadDetalle)
    setModalVisible(true)
    setIdDetalle(idDetalle)
    setCantidadProductoCarrito(cantidadDetalle)
  }
  
  const renderItem = ({ item }) => (
    <CarritoCard item={item} 
    cargarCategorias={getDetalleCarrito} 
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    setCantidadProductoCarrito={setCantidadProductoCarrito}
    cantidadProductoCarrito={cantidadProductoCarrito}
    idDetalle={idDetalle}
    setIdDetalle={setIdDetalle}
    accionBotonDetalle={handleEditarDetalle}
    getDetalleCarrito={getDetalleCarrito}
    />
  );

  return (
    <View style={styles.container}>
      
      <ModalEditarCantidad
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      idDetalle={idDetalle}
      setIdDetalle={setIdDetalle}
      setCantidadProductoCarrito={setCantidadProductoCarrito}
      cantidadProductoCarrito={cantidadProductoCarrito}
      getDetalleCarrito={getDetalleCarrito}
      />

    <Text style={styles.title}>Carrito de Compras</Text>
      {dataDetalleCarrito.length > 0 ? (
        <FlatList
          data={dataDetalleCarrito}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_detalle.toString()}
        />
      ) : (
        <Text>No hay detalles del carrito disponibles.</Text>
      )}
      <View style={styles.containerButtons}>
        
      {
      //carga condicional del boton de finalizar pedido
      dataDetalleCarrito.length > 0 &&         <Buttons
          textoBoton='Finalizar Pedido'
          accionBoton={finalizarPedido} />
      }

        <Buttons
          textoBoton='Regresar a productos'
          accionBoton={backProducts} />
      </View>

    </View>
  );
};

export default Carrito;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E', // Brown color for the title
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  modifyButton: {
    borderWidth: 1,
    borderColor: '#8F6B58',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#8F6B58', // Light brown color for modify button
    marginVertical: 4,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#D2691E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#D2691E', // Darker orange color for delete button
    marginVertical: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  finalButton: {
    backgroundColor: '#A0522D', // Sienna color for final action buttons
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  finalButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
