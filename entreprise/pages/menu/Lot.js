/* eslint-disable max-len */
import * as React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';

// import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
//import { PropsLot, RootStackParamList } from '../types';

function Lot(props/*:PropsLot*/) {
  console.log(props.parent)
  const navigation = useNavigation/*<StackNavigationProp<RootStackParamList, 'Lot'>>*/();
  const parent = ['menu'].concat(props.parent);
  return (<View>
      <TouchableOpacity
      onPress={() => {
        if(props.node.actif==1){
        navigation.push('Connexion', { node: props.node, selected: [parent] });
      }}}>
      <Text>
        {props.parent[props.parent.length - 1].name}  {props.node.actif==0 ? "(desactivé)":""}
      </Text>
      </TouchableOpacity>
      </View>);
}
export default Lot;
