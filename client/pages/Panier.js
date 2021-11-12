import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from "axios";
const Panier =()=>{
    const route = useRoute/*<RouteProp<ParamList, 'Detail'>>*/();
    console.log(route.params.menu)
    const sorties = [];
    const Recursive =(x)=>{
        console.log(x)
        sorties.push(
        <Text>{x.name}</Text>
        )
        if (x.children==[]){
            console.log("il n'y a plus de childrens");
        }
        else{
          x.children.map((y)=>{
              Recursive(y);
          })  
        }
        return <>{
            sorties.map((elem) => elem)
            }</>;
    }
    const CouscousRoyal =()=>{
        return <>{
            sorties.map((elem) => elem)
            }</>;
    }
    const Element=()=>{
        sorties.push(
            <Text>{route.params.menu[0][0][1].name}</Text>
        )
        route.params.menu[0][0][1].children.map((x)=>{
            sorties.push(
                <Text>{x.name}</Text>
            )

            x.children.map((y)=>{
                sorties.push(
                    <Text>{y.name}</Text>
                )
            })
           
            })
        
    } 
return (
    <View>
        
                
        {route.params.menu.map((z)=>{Recursive(z[0][1])})}
        {CouscousRoyal()}
        <TouchableOpacity>Commander</TouchableOpacity>
    </View>
)}
export default Panier;