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
        console.log('coucou1', props.node);
        if(props.node.actif==1){
          console.log('coucou2');
          props.setData.Update([parent],props.node)
      }}}>
      <Text>
        {props.parent[props.parent.length - 1].name}
      </Text>
      </TouchableOpacity>
      </View>);
}
export default Lot;
