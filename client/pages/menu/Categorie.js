/* eslint-disable max-len */
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import { useState, useCallback } from 'react';
import axios from 'axios'
// import {
//   PropsCat, Selection,
// } from '../types';

const Categorie = (props/*: PropsCat*/) => {
  console.log(props.node)
  const initial/*: Array<string> */= [];
  // TODO : J'imagine que selection est le tableau d'éléments sélectionnés ?
  const [selection, setSelection] = useState(initial);

  const onSelectionChange = useCallback((selected/*: Array<Selection>*/) => {
    
    // TODO : Qu'est-ce que final ? un tableau qui contient l'element et son parent
    const parentSelection/*: Array<Array<string>>*/ = [];
    const { parent } = props;
    // TODO : Je comprends ce que font ces blocs if / else ?
    // TODO : Pourquoi ne pas setSelection(selection) directement ?
    if (selection.length > selected.length) {
      selection.filter((y/*: string*/) => !selected.map((w/*: Selection*/) => w.label).includes(y))
        .forEach((z/*: string*/) => parentSelection.push([z, parent]));
      // TODO : Qu'est-ce que setData ? Son premier argument ? et son deuxième ?
      props.setData.setData(parentSelection, 0);
    } else {
      selected.map((w/*: Selection*/) => w.label)
        .filter((y/*: string*/) => !selection.includes(y))
        .forEach((z/*: string*/) => parentSelection.push([z, parent]));
      props.setData.setData(parentSelection, 1);
    }
    setSelection(selected.map((w/*: Selection*/) => w.label));
  }, [props.setData.setData]);
  const Activate=()=>{
    console.log(props.node.children)
    let sortie=[]
    props.node.children.forEach((produit)=>{console.log(produit.id,produit.name)
    sortie.push(<View>
              </View>)})
              return <>{
                sortie.map((elem) => elem)
              }</>;
  }
  return (
    <View>
      <SelectMultiple
        items={props.node.children.map((y) => y.name)} // en mettant les cles des enfants
        selectedItems={selection}
        onSelectionsChange={onSelectionChange}
      />
    <Activate/>
    </View>
  );
};
export default Categorie;
