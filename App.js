import { NavigationContainer } from '@react-navigation/native'; // Importa el contenedor de navegación
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importa el creador de stack navigator

import Sesion from './src/screens/Sesion.js'; // Importa la pantalla de Sesión
import SignUp from './src/screens/SignUp.js'; // Importa la pantalla de Registro
import UpdateUser from './src/screens/UpdateUser.js'; // Importa la pantalla de Actualización de Usuario
import TabNavigator from './src/tabNavigator/TabNavigator.js'; // Importa el navegador de pestañas

export default function App() {

  const Stack = createNativeStackNavigator(); // Crea una instancia del stack navigator

  return (
    <NavigationContainer> {/* Envuelve la aplicación en un contenedor de navegación */}
      <Stack.Navigator
        initialRouteName='Sesion' // Establece 'Sesion' como la ruta inicial
        screenOptions={{
          headerShown: false // Oculta el header por defecto
        }}>
        <Stack.Screen name="Sesion" component={Sesion} /> {/* Define la pantalla 'Sesion' */}
        <Stack.Screen name="SignUp" component={SignUp} /> {/* Define la pantalla 'SignUp' */}
        <Stack.Screen name="UpdateUser" component={UpdateUser} /> {/* Define la pantalla 'UpdateUser' */}
        <Stack.Screen name="TabNavigator" component={TabNavigator} /> {/* Define el navegador de pestañas */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
