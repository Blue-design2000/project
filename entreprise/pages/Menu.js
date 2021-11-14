import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import { SHA3 } from 'sha3';
import List from "./menu/List"
import {Picker} from '@react-native-picker/picker';
const Menu=()=> {
  return (
      <Stack.Navigator>    
      <Stack.Screen name="Menu" component={Choix} options={{headerShown: false}}/>
      <Stack.Screen name="Panier" component={Panier} options={{headerShown: false}}/>
      </Stack.Navigator>)}
const Choix=()=>{ const [classe, setClasse] = useState({list:[],tree:{children:[]}});
  const [ajout,setAjout]=useState({max:"1",min:"0",name:"canette",parentId:[6,"pepsi"],type:["produit","produit"],description:"canette de 33cl",price:"0.00"})
  const route = useRoute/*<RouteProp<ParamList, 'Detail'>>*/();
  let state/*: State*/;
  let valide = (1 === 1.0);
  let objet/*:MenuRoot|MenuChildCategory|MenuLot*/;
  
   React.useEffect(() => {
    console.log("USE EFFECT")
    axios.get('http://localhost:3000/menu/get/e@e.fr')
      .then((response) => {
        if (route.params === undefined || route.params.menu === undefined) {
          if (route.params === undefined || route.params.selected === undefined) {
            state = { menu: [], selected: [] };
          } else {
            state = { menu: [], selected: route.params.selected };
          }
        } else if (route.params === undefined || route.params.selected === undefined) {
          state = { menu: route.params.menu, selected: [] };
        } else {
          state = { menu: route.params.menu, selected: route.params.selected };
        }
        console.log(route);
        console.log(state);
        if (route.params !== undefined && route.params.node !== undefined) {
          setClasse({...classe,tree:route.params.node});
        } else {
          setClasse({...classe,...response.data})
        }
        console.log(classe)
      });
   }, []);
  if (route.params === undefined || route.params.menu === undefined) {
    if (route.params === undefined || route.params.selected === undefined) {
      state = { menu: [], selected: [] };
    } else {
      state = { menu: [], selected: route.params.selected };
    }
  } else if (route.params === undefined || route.params.selected === undefined) {
    state = { menu: route.params.menu, selected: [] };
  } else {
    state = { menu: route.params.menu, selected: route.params.selected };
  }
  console.log(classe)
  const parent = (value/*:[string, number]*/, objets/*:MenuNode*/) => {
    console.log(value);
    if (objets.children.map((x) => x.name).includes(value[0])) {
      return (objets);
    }
    objets.children.map((enfant) => {
      console.log(enfant);
      return parent(value, enfant);
    });
    return objets;
  };
  const nested = (value/*:[string, number]*/, objets/*:MenuNode*/) => {
    console.log(value, objets.children);
    if (objets.children.map((x) => x.name).includes(value[0])) {
      const child = (objets )//as unknown as MenuLot);
      console.log('trouve');
      child.children.forEach((noeud) => valide = valide && (noeud.name === value[0]) && (noeud.min <= value[1] && noeud.max >= value[1]));
      console.log(valide);
    } else {
      console.log('pas trouve');
      objets.children.map((x) => nested(value, x));
    }
  };
  const verif = (objets/*:MenuLot*/) => {
    const selection/*:string[]*/ = state.selected.reduce((acc/*:string[]*/, c/*:string[]*/) => acc.concat(c[1]), new Array/*<string>*/());
    const total/*: [string, number][]*/ = [];
    console.log(selection);
    Array.from(new Set(selection)).forEach((x/*:string*/) => total.push([x, selection.filter((y/*:string*/) => y === x).length]));
    console.log(total);
    total.forEach((x) => nested(x, objets));
    const parents = (parent(total[1], objets))// as MenuLot);
    const final/*:string[]*/ = total.map((x) => x[0]);
    console.log(valide);
    valide = valide && parents.children.filter((x) => x.min !== 0).reduce((acc/*:boolean*/, c) => acc && final.includes(c.name), true);
    console.log(valide);
  };
  const setData = (elem /*:string[][]*/, ajouter/*:number*/) => {
    console.log(elem);
    console.log(ajouter);
    console.log(state)
    if (ajouter === 1) {
      elem.forEach((x) => state.selected.push(x));
    } else {
      elem.forEach((x) => state.selected.splice(state.selected.indexOf(x)));
    }
    console.log(state.selected);
  };
  const Items=(list)=>{console.log(list); let sortie=list.map((x)=><Picker.Item label={x[1]} value={x} />)
  return <>{
      sortie.map((elem) => elem)
      }</>}
  console.log(classe.list)
  return (
    <View>
      <List node={classe.tree} setData={setData}/>
      <TextInput
      value = {ajout.price}
      placeholder = "price"
      onChangeText = {(price)=>setAjout({...ajout,price})}
      />
      <TextInput
      value = {ajout.max}
      placeholder = "max"
      onChangeText = {(max)=>setAjout({...ajout,max:max})}
      />
      
      <TextInput
      value = {ajout.min}
      placeholder = "min"
      onChangeText = {(min)=>setAjout({...ajout,min:min})}
      />
      <TextInput
      value = {ajout.name}
      placeholder = "name"
      onChangeText = {(name)=>setAjout({...ajout,name})}
      />      
      <Picker
  selectedValue={ajout.parentId}
  onValueChange={(parentId,index) =>{
    setAjout({...ajout,parentId})
  }
  }>
    {Items(classe.list)}
</Picker>
      <Picker
  selectedValue={ajout.type}
  onValueChange={(type, index) =>{setAjout({...ajout,type})}}>
    {Items([["menu","menu"],["categorie","categorie"],["produit","produit"]])}
</Picker>
<TextInput
      multiline
      numberOfLines={4}
      onChangeText={description => setAjout({...ajout,description})}
      value={ajout.description}
      style={{padding: 10}}
      placeholder="description"
      editable
      maxLength={40}
    />
      <TouchableOpacity onPress={() => {
        console.log(ajout)
        if(ajout.max>0 && ajout.name.length>3&& ajout.max>ajout.min){
          console.log({...ajout,parentId:ajout.parentId[0]})
        axios.post("http://localhost:3000/menu/add",{...ajout,type:ajout.type[0],parentId:ajout.parentId[0],mail:'e@e.fr'})}}}>
        <Text>ajouter un menu/produit</Text>
      </TouchableOpacity>

       </View>
  );}



export default Menu;