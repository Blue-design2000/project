import React from 'react';
import styles from '../../../styles'
import { Text,TextInput, TouchableOpacity, View } from 'react-native';
import{ListItem} from 'react-native-elements'
const Recherche=()=> {
    const [Recherche, setRecherche] = useState({text:"",data:[]})

    return (
    <View styles={styles.container}>
      <Text>Compta</Text>
      <TextInput
      value = {recherche}
      placeholder = "recherche"
      onChangeText = {(value)=>{setRecherche({...Recherche,text:value})}}
      />
 <TouchableOpacity
 onPress={()=>{  axios.post("http://localhost:3000/accueil/entreprise/findbyname",{recherche:Recherche.text}).then((res)=>{setRecherche({...Recherche, data:res.data.recherche})})}}>
 <Text>rechercher</Text></TouchableOpacity>
 {
     Recherche.data.map((l,i)=>{
         <ListItem>
             <ListItem.Content>
                 <ListItem.Title>{l.nom}</ListItem.Title>
             </ListItem.Content>
         </ListItem>
     })
 }

    </View>  
    );
}


export default Recherche;