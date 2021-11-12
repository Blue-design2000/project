/* eslint-disable max-len */
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Lot from './Lot';
import Cat from './Categorie';
import { NavigationContainerRefContext } from '@react-navigation/core';
import axios from 'axios';
// import {
//   MenuLot, MenuLotCategory, MenuMotherCategory,
// } from '../components/cards/types';
//  import { PropsList } from '../types';

const List = (prop/*:PropsList*/) => {

  const Sorties = (props/*: PropsList*/) => {
    const sortie/*:Element[]*/ = [];
    // React.useEffect(() => {
      console.log(props)
      for (let a = 0; a < props.node.children.length; a += 1) { // pour tous les enfants
        console.log(a);
        const nodeElement = props.node.children[a];
        if (nodeElement.type === 'menu') {
          const filsLot = (nodeElement)// as MenuLot);
          // console.log("c'est un lot");
          
          sortie.push(<View>
            <Lot node={filsLot} parent={[nodeElement]} setData={props.setData}/>
            <TouchableOpacity
            onPress={()=>{axios.post("http://localhost:3000/menu/activate",{id:nodeElement.id,actif:nodeElement.actif})}}><Text>{nodeElement.actif==0?"activer":"desactiver"} le menu {nodeElement.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{axios.post("http://localhost:3000/menu/delete",{id:nodeElement.id})}}><Text>supprimer le menu {nodeElement.name}</Text>
            </TouchableOpacity>

            </View>);
        } else if (nodeElement.type === 'categorie') { // si c'est une categorie de lot
        // console.log("c'est une categorie de lot");

          const filsLotCat = (nodeElement)// as MenuLotCategory);
          sortie.push(<View ><Text>{nodeElement.name} max:{filsLotCat.max} min: {filsLotCat.min}</Text><Cat node={filsLotCat} parent={nodeElement.name} setData={props.setData}/>
          <TouchableOpacity
            onPress={()=>{axios.post("http://localhost:3000/menu/activate",{id:nodeElement.id,actif: nodeElement.actif})}}><Text>{nodeElement.actif==0?"activer":"desactiver"} la categorie {nodeElement.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{axios.post("http://localhost:3000/menu/delete",{id:nodeElement.id})}}><Text>supprimer la categorie {nodeElement.name}</Text>
            </TouchableOpacity>
            

</View>);
        }
      }
      console.log(sortie)
    //}, [props.node]);
     console.log(sortie);
    return <>{
      sortie.map((elem) => elem)
    }</>;
  };
  return (
       <View>
       <Sorties setData={prop.setData} node={prop.node}/>
       </View>
  );
};

export default List;
