/* eslint-disable max-len */
import { RouteProp, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';
import { ParamList } from '../types';

const Each = (props /*:{ menus: string[][][]; }*/) => {
  const sortie/*:Element[]*/ = [];
  for (let x = 0; x < props.menus.length; x += 1) {
    sortie.push(<View>{ props.menus[x].map((y/*: Array<string>*/) => (<Text>{y[1]} : {y[0]}</Text>)) }</View>);
  }
  return <>{
    sortie.map((elem) => elem)
  }</>;
};
const Menu = () => {
  const route = useRoute/*<RouteProp<ParamList, 'Detail'>>*/();
  // console.log(route.params.menu);
  return (<Each menus={route.params.menu}/>);
};

export default Menu;
