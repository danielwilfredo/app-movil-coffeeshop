import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Importa tus componentes de pantalla aquí
import Productos from '../screens/Productos';
import Home from '../screens/Home';
import Carrito from '../screens/Carrito';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#AF8260', // Color de los íconos activos
            tabBarInactiveTintColor: '#B99873', // Color de los íconos inactivos
            tabBarStyle: { display: 'flex' }, // Asegura que la barra de pestañas se muestre correctamente
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Inicio',
              headerStyle: {
                backgroundColor: '#EAD8C0', // Color del header
              },
              headerTintColor: '#000', // Color del texto en el header
              headerShown: false, // Oculta el header
              tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
                <Ionicons name="home" color={color} size={24} /> // Usar el color dinámico proporcionado por React Navigation
              ),
            }}
          />
          <Tab.Screen
            name="Productos"
            component={Productos}
            options={{
              title: 'Productos',
              headerStyle: {
                backgroundColor: '#FFC300', // Color del header
              },
              headerShown: false, // Oculta el header
              headerTintColor: '#fff', // Color del texto en el header
              tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
                <Ionicons name="cafe" color={color} size={24} /> // Usar el color dinámico proporcionado por React Navigation
              ),
            }}
          />
          <Tab.Screen
            name="Carrito"
            component={Carrito}
            options={{
              title: 'Carrito',
              headerStyle: {
                backgroundColor: '#FFC300', // Color del header
              },
              headerShown: false, // Oculta el header
              headerTintColor: '#fff', // Color del texto en el header
              tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
                <Ionicons name="cart" color={color} size={24} /> // Usar el color dinámico proporcionado por React Navigation
              ),
            }}
          />
        </Tab.Navigator>
    );
};

export default TabNavigator;
