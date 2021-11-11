import React, { useState } from 'react';
import styles from '../styles'
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { SHA3 } from 'sha3';
import CheckBox from '@react-native-community/checkbox';

const Connexion=()=> {
  const [entreprise, setEntreprise] = useState(false)  
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
        if(entreprise){
          axios.post("http://localhost:3000/accueil/connect/entreprise",{...Infos,mdp:mdp}).then((res)=>{if(res.data.mdp==mdp){navigation.navigate("StructureEntreprise")}})
        }else{
          axios.post("http://localhost:3000/accueil/connect/client",{...Infos,mdp:mdp}).then((res)=>{if(res.data.mdp==mdp){navigation.navigate("StructureClient")}})   
        }
        
      }}
      ><Text>connexion</Text></TouchableOpacity>
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate("Inscription")
      }}
      ><Text>je n'ai pas de comte</Text></TouchableOpacity>
      <Text>entreprise</Text>
      <CheckBox
    disabled={false}
    value={entreprise}
    onValueChange={(newValue) => setEntreprise(newValue)}
  />
      </View>
    );
}


export default Connexion;