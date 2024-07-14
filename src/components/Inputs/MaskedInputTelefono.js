import React, { useState } from 'react';
import { Platform, TextInput, StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function MaskedInputTelefono({telefono, setTelefono}) {
    return (
        <MaskedTextInput
        mask="9999-9999"
        placeholder='Telefono'
        placeholderTextColor="#fff"
        onChangeText={(text) => {
            setTelefono(text);
        }}
        style={styles.Input}
        keyboardType="numeric"
        value={telefono}  
   />
    );
}

const styles = StyleSheet.create({
    Input: {
      backgroundColor:'#A79277',
      color: "#fff",
      fontWeight:'800',
      width:250,
      borderRadius:5,
      padding: Platform.OS === 'ios' ? 15 : 10, // Estilo de la barra de pestañas, altura diferente para iOS y Android,
      marginVertical:10
    },
  
  });