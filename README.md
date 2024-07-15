# Repositorio para aplicación movil ejemplo

## La aplicación móvil esta creada con React Native Expo y una Api en PHP, La misma Api del Coffeeshop

La api utilizada en el proyecto fue tomada del siguiente repositorio: https://github.com/dacasoft/coffeeshop

## Para ejecutar la aplicación sigue los siguientes pasos

* 1- Clona el repositorio
* 2- Instala las dependencias con el comando npm install
* 3- correr el programa con el comando npx expo start 
* 4- Agrega el siguiente codigo en el archivo cliente.php del API: 

![Codigo extra en el case del archivo cliente.php para el registro de un usuario](assets/code_movil.png)

## Dependencias del proyecto:
### Dependencias para el funcionamiento de la app, si creas un proyecto nuevo, deberas de instalar las siguientes dependencias en el proyecto.

    "@expo/vector-icons": "^14.0.2",
    "@react-native-community/datetimepicker": "^8.0.1",
    "@react-navigation/bottom-tabs": "^6.5.20",
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/native-stack": "^6.9.26",
    "expo": "~51.0.20",
    "expo-status-bar": "~1.12.1",
    "react": "18.2.0",
    "react-native": "0.74.3",
    "react-native-datepicker": "^1.7.2",
    "react-native-mask-text": "^0.14.2",
    "react-native-picker-select": "^9.1.3",
    "react-native-vector-icons": "^10.1.0"

## Si el proyecto no corre en los dispositivos ejecutar el siguiente comando:

* npx expo install expo@latest