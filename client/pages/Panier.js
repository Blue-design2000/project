import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
const Panier =()=>{
    const navigation=useNavigation();
    const [WS,setWS]=React.useState();
    React.useEffect(()=>{
        var ws = new WebSocket('ws://localhost:3000');
        ws.onopen = () => {console.log("open")};
        ws.onmessage = (e) => {}
        ws.onerror = (e) => {console.log(e.message);};
        ws.onclose = (e) => {console.log(e.code, e.reason);};
        setWS(ws)},[])
    const route = useRoute/*<RouteProp<ParamList, 'Detail'>>*/();
    if (route.params==undefined){
        route.params={menu:[]}
    }
    const Recursive =(x)=>{
        const sorties = [];
        console.log(x)
        console.log(x.name)
        sorties.push(
        <Text>{x.name}</Text>
        )
        if (x.children==[]){
            console.log("il n'y a plus de childrens");
        }
        else{
          sorties.push(x.children.map((y)=>Recursive(y)));
        }
        return <>{
            sorties.map((elem) => elem)
            }</>;}
return (
    <View>
        {route.params.menu.map((z)=>{return Recursive(z[0][1])})}
        <TouchableOpacity onPress={()=>{
            WS.send(JSON.stringify({nature:"add",idclient:'e@e.fr',string:JSON.stringify(route.params.menu),idrest:"e@e.fr"}));
            navigation.navigate("Menu")}}>
                <Text>Commander</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("Menu")}}><Text>vider mon panier</Text>
        </TouchableOpacity>
    </View>
)}
export default Panier;