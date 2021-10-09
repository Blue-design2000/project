import React from 'react';
import styles from '../../styles'
import { Text, View , TouchableOpacity } from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';
const Commandes=()=> {
const [uid,setUid]=React.useState("")
const [commandes, setCommandes]=React.useState([[],[],[]])
  var ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => {
  // connection opened
  console.log("open")
  ws.send("{\"nature\":\"init\",\"idrest\":\"b@b.fr\"}")// on envoie l'id du restaurant au serveur 
};

ws.onmessage = (e) => {
  let data=JSON.parse(e.data);
  console.log(data)
  // a message was received
  console.log(data.nature=='init', data.nature);
  if(data.nature=="init"){//si on est entrian d'initialiser 
    console.log("coucou23");
    let newCommandes=commandes; 
    data.commandes.map((commande)=>{
      newCommandes[commande.state].append(commande);})
      setCommandes(newCommandes);
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
    commandes[0].map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{l.str}</ListItem.Title>
          <ListItem.Subtitle>
            <TouchableOpacity onPress={ws.send({nature:"etat",id:l.id,etat:"+1"})}><Text>Monter</Text></TouchableOpacity>
          <TouchableOpacity onPress={ws.send({nature:"etat",id:l.id,etat:"-1"})}><Text>Descendre</Text></TouchableOpacity>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
    }
        {
     commandes[0].map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{l.str}</ListItem.Title>
          <ListItem.Subtitle>
            <TouchableOpacity onPress={ws.send({nature:"etat",id:l.id,etat:"+1"})}><Text>Monter</Text></TouchableOpacity>
          <TouchableOpacity onPress={ws.send({nature:"etat",id:l.id,etat:"-1"})}><Text>Descendre</Text></TouchableOpacity>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
    }
        {
    commandes[0].map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{l.str}</ListItem.Title>
          <ListItem.Subtitle>
            <TouchableOpacity onPress={ws.send({nature:"etat",id:l.id,etat:"+1"})}><Text>Monter</Text></TouchableOpacity>
          <TouchableOpacity onPress={ws.send({nature:"etat",id:l.id,etat:"-1"})}><Text>Descendre</Text></TouchableOpacity>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
    }
  
    </View>
)};
export default Commandes; 