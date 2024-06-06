import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputDui({dui, setDui}) {
    return (
            <TextInputMask
                style={styles.Input}
                placeholder="Dui"
                placeholderTextColor="#fff"
                type={'custom'}
                options={{
                    mask: '99999999-9' // Formato para el número de teléfono
                }}
                value={dui}
                onChangeText={setDui}
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
      padding: 5,
      marginVertical:10
    },
  
  });