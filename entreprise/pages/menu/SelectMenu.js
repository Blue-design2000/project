/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-console */
import * as React from 'react';
import { TouchableOpacity, InputText, Text, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';

const SelectMenu = (props/* : StackScreenProps<RootStackParamList, 'TabOneScreen'>*/) => {
  const navigation=useNavigation();
  const [Infos, Formulaire]=useState({
    name : '',
    parentId :'',
    });
    
  return(
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
      ><Text>connexion</Text></TouchableOpacity></View>
  );
  };
export default SelectMenu;
