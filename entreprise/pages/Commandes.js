import React from 'react';
import styles from '../../styles'
import { Text, View } from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';
var ws = new WebSocket('ws://localhost:3000');
const list=[[],[],[]]
ws.onopen = () => {
  // connection opened
  console.log("open")
  ws.send("something from client"); // send a message
};

ws.onmessage = (e) => {
  
  // a message was received
  console.log(e.message);
};

ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log(e.code, e.reason);
};
const Commandes=()=> {
  return (
    <View styles={styles.container}>
      <Text>Commandes</Text>
      {
    list[0].map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{l.str}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ))
    }
        {
    list[1].map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{l.str}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ))
    }
        {
    list[2].map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{l.str}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ))
    }
    </View>
)};
export default Commandes; 