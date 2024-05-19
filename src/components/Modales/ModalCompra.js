import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Buttons from '../Buttons/Button';

const ModalCompra = ({ visible, cerrarModal, nombreProductoModal, idProductoModal }) => {

  const [cantidad, setCantidad] = useState('');

  const handleAgregarAlCarrito = (idProducto) => {
    // Lógica para agregar al carrito con la cantidad ingresada
    cerrarModal(false)
  };


  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        cerrarModal(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{nombreProductoModal}</Text>
          <Text style={styles.modalText}>Cantidad:</Text>
          <TextInput  
            style={styles.input}
            value={cantidad}
            onChangeText={text => setCantidad(text)}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
          />
          <Buttons
          textoBoton='Agregar al carrito'
          accionBoton={() => handleAgregarAlCarrito(idProductoModal)}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 200,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalCompra;
