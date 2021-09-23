import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, TouchableOpacity,Alert } from 'react-native';
import axios from "axios";
import List from "./menu/List"
const Menu=(props)=> {
  const [classe, setClasse] = useState({children:[]});
  const route = useRoute/*<RouteProp<ParamList, 'Detail'>>*/();
  let state/*: State*/;
  let valide = (1 === 1.0);
  let objet/*:MenuRoot|MenuChildCategory|MenuLot*/;
  
  React.useEffect(() => {
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
          setClasse(route.params.node);
        } else {
          setClasse(response.data)
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
  console.log(classe)
  return (
    <View>
      <List node={classe} setData={setData}/>
      <TouchableOpacity onPress={() => {
        // console.log('onPress');
        console.log(classe);
        if (classe.type === 'menu') {
          verif(classe);
        }
        if (valide && state.menu !== undefined) {
          state.menu.push(state.selected);
          // console.log(state.menu);
          state.selected = [];
          // menu: state.menu.push(state.selected)
          // this.setState({ selected: [] }, () => { console.log(`state${state.menu}`); });
           props.navigation.push('Connexion', { menu: state.menu, selected: [], node: undefined });
        } else {
          Alert.alert("vous n'avez pas bien rempli");
        }
      }}>
        <Text>valider le menu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        console.log(state.menu);
        props.navigation.navigate('Menu', { menu: state.menu, selected: [] });
      }}>
        <Text>voir le menu commande</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => {
        console.log(state.menu);
        await axios.post('localhost/api/commandes/reservation/user', { idReservation: 1, pseudo: 'coucou' })
          .then((response) => props.navigation.navigate('Commandes', { commandes: response.data }));
      }}>
        <Text>voir mes commande</Text>
      </TouchableOpacity>

       </View>
  );}


export default Menu;