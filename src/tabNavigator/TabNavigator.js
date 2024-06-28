import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

// Importa tus componentes de pantalla aquí
import Productos from '../screens/Productos';
import Home from '../screens/Home';
import Carrito from '../screens/Carrito';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (

<Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Oculta el header
            tabBarActiveTintColor: '#AF8260', // Color de los íconos activos
            tabBarInactiveTintColor: '#B99873', // Color de los íconos inactivos
            tabBarStyle: { backgroundColor: '#FFF', 
              height: Platform.OS === 'ios' ? 80 : 60, // Estilo de la barra de pestañas, altura diferente para iOS y Android
           borderTopWidth: 0 }, // Estilo de la barra de pestañas
            tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Productos') {
                iconName = focused ? 'cafe' : 'cafe-outline';
              } else if (route.name === 'Carrito') {
                iconName = focused ? 'cart' : 'cart-outline';
              }
              return <Ionicons name={iconName} color={color} size={size} />;
            },
          })}
        >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="Productos"
        component={Productos}
        options={{ title: 'Productos' }}
      />
      <Tab.Screen
        name="Carrito"
        component={Carrito}
        options={{ title: 'Carrito' }}
      />
    </Tab.Navigator>
    );
};

export default TabNavigator;

