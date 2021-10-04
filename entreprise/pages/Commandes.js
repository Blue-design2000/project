import React from 'react';
import styles from '../../styles'
import { Text, View } from 'react-native';
//import {ListItem} from 'react-native-elements';
import axios from 'axios';
const Commandes=()=> {
const [uid,setUid]=React.useState("")
const [commandes, setCommandes]=React.useState([[],[],[]])
  var ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => {
  // connection opened
  console.log("open")
  ws.send("{\"nature\":\"init\",idrest:\"e@e.fr\"}")// on envoie l'id du restaurant au serveur 
};

ws.onmessage = (e) => {
  let data=e.data
  console.log(data)
  // a message was received
  if(data.nature=="init"){//si on est entrian d'initialiser  
    setUid(data.uid)// one enrgistre notre uid
  }else if(data.nature=="add"){// si une nouvelle commande est ajoutee
    let newCommandes=commandes// on prend les commandes
    newCommandes[data.etat].append(data.string)// on ajoute la nouvelle commande au tableau correspondant a son etat
    setCommandes(newCommandes)// on met a jour les commandes
  }else if(data.nature=="etat"){// si c'est l'etat d'une commande qui change 
    let newCommandes=commandes// on prend les commandes 
    newCommandes.map((tab)=>{tab.map((com)=>{
      if(com.includes("id\":"+data.id)){
        com.replaceAt(com.indexOf("state\":")+10,data.etat)// on remplace dans la commande correspondant a l'id l'etat (+10 a confirmer c'es tpour tomber pile sur l'etat)
      }
      }
      )
    })
    setCommandes(newCommandes);// on met a jour les commandes
  }
};

ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log(e.code, e.reason);
};

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