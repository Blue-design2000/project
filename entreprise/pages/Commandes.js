import React from 'react';
import styles from '../../styles'
import { Text, View } from 'react-native';
const Commandes=()=> {
  return (
    <View styles={styles.container}>
      <Text>Commandes</Text>
    </View>  
    );
}
let socket = new WebSocket("ws://localhost");
socket.onopen = function(e) {
  console.log("[open] Connection established");
  console.log("Sending to server");
};

export default Commandes;