import styles from '../../styles'
import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Compta from './profil/Compta';
import Employe from './profil/Employe';
import InfoPerso from './profil/InfoPerso';


const Stack = createMaterialTopTabNavigator();
const Profil=()=>{
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Compta" component={Compta} />
        <Stack.Screen name="Employe" component={Employe} />
        <Stack.Screen name="InfoPerso" component={InfoPerso} />
      </Stack.Navigator>
    </View>
  );
}
export default Profil