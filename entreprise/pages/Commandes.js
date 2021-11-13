import React from 'react';
import styles from '../../styles'
import { Text, View , TouchableOpacity } from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';
const Commandes=()=> {
  const Recursive =(x)=>{
    const sorties = [];
    console.log(x)
    sorties.push(
    <Text>{x.name}</Text>
    )
    if (x.children==[]){
        console.log("il n'y a plus de childrens");
    }
    else{
      x.children.map((y)=>{
          Recursive(y);
      })  
    }
    return <>{
        sorties.map((elem) => elem)
        }</>;}
const [uid,setUid]=React.useState("") //TODO : utiliser uid 
const [commandes, setCommandes]=React.useState([[],[],[]])
const [WS,setWS]=React.useState();
React.useEffect(()=>{
  var ws = new WebSocket('ws://localhost:3000');
  ws.onopen = () => {console.log("open")};
  ws.onmessage = (e) => {
    let data=JSON.parse(e.data);
    console.log(data)
    console.log(data.nature=='init', data.nature);
    if(data.nature=="init"){  
      ws.send("{\"nature\":\"init\",\"idrest\":\"b@b.fr\", \"uid\":\""+data.id+"\"}")// on envoie l'id du restaurant au serveur 
      setUid(data.id)// one enrgistre notre uid
    }else if(data.nature=="data"){//si on est entrian d'initialiser 
      console.log("coucou23");
      let newCommandes=commandes; 
      data.commandes.map((commande)=>{
        console.log("length",newCommandes.length,commande.state,newCommandes[commande.state])
        newCommandes[commande.state].push(commande);})
        setCommandes([...newCommandes]);
    }else if(data.nature=="add"){// si une nouvelle commande est ajoutee
      let newCommandes=commandes// on prend les commandes
      newCommandes[data.etat].push(data.string)// on ajoute la nouvelle commande au tableau correspondant a son etat
      setCommandes([...newCommandes])// on met a jour les commandes
    }else if(data.nature=="etat"){// si c'est l'etat d'une commande qui change 
      let newCommandes=commandes// on prend les commandes 
      newCommandes.map((tab)=>{tab.map((com)=>{
        if(com.includes("id\":"+data.id)){
          com.replaceAt(com.indexOf("state\":")+10,data.etat)// on remplace dans la commande correspondant a l'id l'etat (+10 a confirmer c'es tpour tomber pile sur l'etat)
        }})})
      setCommandes([...newCommandes]);// on met a jour les commandes
    }};
  ws.onerror = (e) => {console.log(e.message);};
  ws.onclose = (e) => {console.log(e.code, e.reason);};
  setWS(ws)
},[]);

  return (
    <View>
      <Text>Commandes {JSON.stringify(commandes)}</Text>
      {commandes[0].map((l, i) => {console.log(l.string,typeof l);
      return(
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{Recursive(commandes[0])}</ListItem.Title>
           <ListItem.Subtitle>
            <TouchableOpacity onPress={()=>{let Commandes=[];commandes.map((i)=>Commandes.push(i));WS.send(JSON.stringify({nature:"etat",id:l.id,etat:"+1"}));Commandes[1].push(Commandes[0].splice(i,i+1)[0]);console.log(Commandes);setCommandes(Commandes)}}><Text>Monter</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{let Commandes=[];commandes.map((i)=>Commandes.push(i));WS.send(JSON.stringify({nature:"etat",id:l.id,etat:"-1"}));Commandes[0].splice(i,i+1)[0];console.log(Commandes);setCommandes(Commandes)}}><Text>Descendre</Text></TouchableOpacity>
          </ListItem.Subtitle>
        </ListItem.Content> 
      </ListItem>
    )})
    }
    <Text>{JSON.stringify(commandes)}</Text>
    <Text>en cours </Text>
        {
     commandes[1].map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{Recursive(commandes[1])}</ListItem.Title>
          <ListItem.Subtitle>
            <TouchableOpacity onPress={()=>{let Commandes=[];commandes.map((i)=>Commandes.push(i));WS.send(JSON.stringify({nature:"etat",id:l.id,etat:"+1"}));Commandes[2].push(Commandes[1].splice(i,i+1)[0]);console.log(Commandes);setCommandes(Commandes)}}><Text>Monter</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{let Commandes=[];commandes.map((i)=>Commandes.push(i));WS.send(JSON.stringify({nature:"etat",id:l.id,etat:"-1"}));Commandes[0].push(Commandes[1].splice(i,i+1)[0]);console.log(Commandes);setCommandes(Commandes)}}><Text>Descendre</Text></TouchableOpacity>
          </ListItem.Subtitle>
        </ListItem.Content> 
      </ListItem>
    ))
    }
    <Text>Payees</Text>
        {
    commandes[2].map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{Recursive(commandes[2])}</ListItem.Title>
          <ListItem.Subtitle>
            <TouchableOpacity onPress={()=>{let Commandes=[];commandes.map((i)=>Commandes.push(i));WS.send(JSON.stringify({nature:"etat",id:l.id,etat:"+1"}));Commandes[2].splice(i,i+1)[0];console.log(Commandes);setCommandes(Commandes)}}><Text>Monter</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{let Commandes=[];commandes.map((i)=>Commandes.push(i));WS.send(JSON.stringify({nature:"etat",id:l.id,etat:"-1"}));Commandes[1].push(Commandes[2].splice(i,i+1)[0]);console.log(Commandes);setCommandes(Commandes)}}><Text>Descendre</Text></TouchableOpacity>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
    }
  
    </View>
)};
export default Commandes; 