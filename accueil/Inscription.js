import React, { useState } from 'react';
import styles from '../styles'
import { Text, View, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Structure from './profil/structure';

const Inscription=()=> {
const navigation = useNavigation();
const[erreur,setErreur]=UseState("")
const [Infos, Formulaire]=useState({
Nom_dentreprise : '',
SIRET :'',
Email :'',
Motdepasse :'',
ConfirmerMDP:''
});
validate = (text) => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    setErreur("cette adresse Email n'est pas valide");
    return false;
  }
  else {
    this.setState({ email: text })
    console.log("Email is Correct");
  }
}

  return (
    <View styles={styles.container}>
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
      textContentType= "password"
      placeholder = "Mot de passe"
      onChangeText = {(mot)=>{
        Formulaire({...Infos,Motdepasse:mot})
        }}/>
      
      
      <TextInput
      value = {Infos.ConfirmerMDP}
      placeholder = "Confirmer le mot de passe"
      onChangeText = {(confirmation)=>Formulaire({...Infos,ConfirmerMDP:confirmation})}
      onChangeText = {}
      />
      <TouchableOpacity
      style = {style.button}
      disabled ={Etat}
      OnPress={()=>{
        a = 0
        if(Infos.Motdepasse != Infos.ConfirmerMDP){
          setErreur("le mot de passe ne correspond pas à la confirmation"); a+=1}
        if(Infos.Motdepasse.length < 8){
          setErreur("le mot de passe doit contenir minimum 8 charactères"); a+=1}
        if (Infos.Motdepasse.toLowerCase == Infos.Motdepasse){
          setErreur("le mot de passe doit contenir une majuscule"); a+=1}
        if (!validate(Infos.Email)){
          setErreur("l'adresse Email n'est pas valide"); a+=1}
        if (a==0){
        navigation.navigate(Structure)}

      ;}}>
        <Text>S'Inscrire</Text>
      </TouchableOpacity>
    </View>  
    );
}


export default Inscription;