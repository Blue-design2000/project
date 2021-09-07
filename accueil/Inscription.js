import React, { useState } from 'react';
import styles from '../styles'
import { Text, View, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Structure from '../entreprise/Structure';

const Inscription=()=> {
const navigation = useNavigation();
const[erreur,setErreur]=useState("")
const [Infos, Formulaire]=useState({
Nom_dentreprise : '',
SIRET :'',
Email :'',
Motdepasse :'',
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
      value = {Infos.Nom_dentreprise}
      placeholder = "Nom d'entreprise"
      onChangeText = {(nom)=>Formulaire({...Infos,Nom_dentreprise:nom})}
      />
      <TextInput
      value = {Infos.SIRET}
      placeholder = "SIRET"
      keyboardType = "number-pad"
      onChangeText = {(siret)=>Formulaire({...Infos,SIRET:siret})}
      />
      <TextInput
      value = {Infos.Email}
      placeholder = "Email"
      keyboardType = "email-address"
      onChangeText = {(mail)=>Formulaire({...Infos,Email:mail})}
      />
      <TextInput
      value = {Infos.motdepasse}
      placeholder = "Mot de passe"
      onChangeText = {(mot)=>{
        Formulaire({...Infos,Motdepasse:mot})
        }}/>
      
      
      <TextInput
      value = {Infos.ConfirmerMDP}
      placeholder = "Confirmer le mot de passe"
      onChangeText = {(confirmation)=>Formulaire({...Infos,ConfirmerMDP:confirmation})}
      />
      <TouchableOpacity
      onPress={()=>{
        let a = 0
        if(Infos.Motdepasse != Infos.ConfirmerMDP){
          setErreur((erreur)=>erreur+"le mot de passe ne correspond pas à la confirmation"); a+=1}
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(Infos.Email)){
          setErreur((erreur)=>erreur+"l'adresse Email n'est pas valide"); a+=1}
          if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(Infos.Motdepasse)){
            setErreur((erreur)=>erreur+"le mot de passe doit contenir au moins: 8 caracteres, une majuscule, un chiffre, une minuscule"); a+=1
          }
          if(Infos.Nom_dentreprise.length<1){
            setErreur((erreur)=>erreur+"Veuillez remplir le nom de l'entreprise"); a+=1
          }
          if(Infos.SIRET.length<1){
            setErreur((erreur)=>erreur+"Veuillez remplir le SIRET"); a+=1
          }
        if (a==0){
          setErreur((erreur)=>erreur+"bravo")
        navigation.navigate(Structure)}


      ;}}>
        <Text>S Inscrire</Text>
      </TouchableOpacity>
    </View>  
    );
}


export default Inscription;