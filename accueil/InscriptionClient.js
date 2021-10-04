import React, { useState } from 'react';
import styles from '../styles'
import { Text, View, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { SHA3 } from 'sha3';

const Inscription=()=> {
const hash = new SHA3(512);
const navigation = useNavigation();
const[erreur,setErreur]=useState("")
const [Infos, Formulaire]=useState({
mail :'',
mdp :'',
ConfirmerMDP:''
});
const validate = (text) => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  }
  else {
  return true 
  }
}

  return (
    <View>
      <Text>{erreur}</Text>
      <Text>Inscription</Text>
      <TextInput
      value = {Infos.Email}
      placeholder = "Email"
      keyboardType = "email-address"
      onChangeText = {(mail)=>Formulaire({...Infos,mail:mail})}
      />
      <TextInput
      value = {Infos.mdp}
      placeholder = "Mot de passe"
      onChangeText = {(mot)=>{
        Formulaire({...Infos,mdp:mot})
        }}/>
      
      
      <TextInput
      value = {Infos.ConfirmerMDP}
      placeholder = "Confirmer le mot de passe"
      onChangeText = {(confirmation)=>Formulaire({...Infos,ConfirmerMDP:confirmation})}
      />
      <TouchableOpacity
      onPress={async ()=>{
        let a = 0
        if(Infos.mdp != Infos.ConfirmerMDP){
          setErreur((erreur)=>erreur+"le mot de passe ne correspond pas à la confirmation"); a+=1}
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(Infos.mail)){
          setErreur((erreur)=>erreur+"l'adresse Email n'est pas valide"); a+=1}
          if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(Infos.mdp)){
            setErreur((erreur)=>erreur+"le mot de passe doit contenir au moins: 8 caracteres, une majuscule, un chiffre, une minuscule"); a+=1
          }
        if (a==0){
          hash.reset()
          hash.update(Infos.mdp)
          let hmdp=hash.digest('hex')
          hash.reset()
          hash.update(Infos.ConfirmerMDP)
          let hmdpc=hash.digest('hex')
          const {ConfirmerMDP, ...profil} = Infos
          console.log(profil)
          await axios.post("http://localhost:3000/accueil/create/client",{...profil, mdp: hmdp}).then(()=>navigation.navigate("StructureClient"))
        }
        

      ;}}>
        <Text>S'inscrire</Text>
      </TouchableOpacity>
    </View>  
    );
}


export default Inscription;