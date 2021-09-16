import React, { useState } from 'react';
import styles from '../styles'
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { SHA3 } from 'sha3';

const Connexion=()=> {
  const hash = new SHA3(512)
  const navigation=useNavigation();
  const [Infos, Formulaire]=useState({
    mail : '',
    mdp :'',
    });
    
  return (
    <View styles={styles.container}>
      <Text>Connexion</Text>
      <TextInput
      value = {Infos.mail}
      placeholder = "mail"
      onChangeText = {(mail)=>Formulaire({...Infos,mail:mail})}
      />
      <TextInput
      value = {Infos.mdp}
      placeholder = "mot de passe"
      onChangeText = {(mdp)=>Formulaire({...Infos,mdp:mdp})}
      />
      <TouchableOpacity
      onPress={()=>{
    hash.reset()
    hash.update(Infos.mdp)
    let mdp=hash.digest("hex")
    console.log({...Infos,mdp:mdp})
        axios.post("http://localhost:3000/accueil/connect",{...Infos,mdp:mdp}).then((res)=>{if(res.data.mdp==mdp){navigation.navigate("Structure")}})
       
      }}
      ><Text>connexion</Text></TouchableOpacity>
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate("Inscription")
      }}
      ><Text>je n'ai pas de comte</Text></TouchableOpacity>
      
      </View>
    );
}


export default Connexion;