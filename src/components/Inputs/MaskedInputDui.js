import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function MaskedInputDui({dui, setDui, setEditable}) {
    return (
        <MaskedTextInput
        mask="99999999-9"
        placeholder='Dui'
        placeholderTextColor="#fff"
        onChangeText={(text) => {
          setDui(text);
        }}
        style={styles.Input}
        keyboardType="numeric"
        editable={setEditable}
        value={dui}  
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