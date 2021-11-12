import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import { SHA3 } from 'sha3';
import { useNavigation } from '@react-navigation/native';
import List from "./menu/List"
const MenuClient=()=>{
const navigation = useNavigation();
const [classe, setClasse] = useState({tree:{children:[]}});
  const [ajout,setAjout]=useState({max:0,min:0,name:"",parent:-1})
  const route = useRoute/*<RouteProp<ParamList, 'Detail'>>*/();
  let state/*: State*/;
  let valide = (1 === 1.0);
  let objet/*:MenuRoot|MenuChildCategory|MenuLot*/;
  
   React.useEffect(() => {
    console.log("USE EFFECT")
    axios.get('http://localhost:3000/menu/get/b@b.fr')
      .then((response) => {
        console.log(route.params)
    console.log('MENUU',state.menu)
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
        
    console.log('MENUU',state.menu)
      });
   }, []);
   
   console.log('MENUUR',route.params)
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

  console.log('MENUU',state.menu)
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
    console.log('MENUU',state.menu)
    if (ajouter === 1) {
      console.log('MENUU',state.menu)
      elem.forEach((x) => state.selected.push(x));
      console.log('MENUU',state.menu)
    } else {
      console.log('MENUU',state.menu)
      elem.forEach((x) => state.selected.splice(state.selected.indexOf(x)));
      console.log('MENUU',state.menu)
    }
    console.log('MENUU',state.menu)
  };
  const Update=(selected,node)=>{
    navigation.push('MenuClient', { menu: state.menu, selected, node })             
  }
  console.log(classe)
  return (
    <View>
      <List menu={state.menu} node={classe.tree} setData={{setData,Update}}/>
      <TouchableOpacity onPress={ () => {
        console.log(valide && state.menu !== undefined , state.menu);
           if (valide && state.menu !== undefined) {	
                      state.menu.push(state.selected);	
                      // console.log(state.menu);	
                      state.selected = [];	
                      // menu: state.menu.push(state.selected)	
                      // this.setState({ selected: [] }, () => { console.log(`state${state.menu}`); });	
                     Update([],undefined)
                      console.log(state.menu);	
                    } else {	
                      Alert.alert("vous n'avez pas bien rempli");	
                    }}}>
        <Text>ajouter un menu/produit</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => {navigation.navigate('Panier', {menu: state.menu})}}>
        <Text>Panier</Text>
      </TouchableOpacity>
      

       </View>
  );}
export default MenuClient