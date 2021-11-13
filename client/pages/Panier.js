import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
const Panier =()=>{
    React.useEffect(()=>{
        const [WS,setWS]=React.useState();
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
            }</>;}
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
        <TouchableOpacity>
        <Text onPress={()=>{WS.send({nature:"add",string:JSON.stringify(route.params.menu),idrest:"b@b.fr"})}}>Commander</Text>
        </TouchableOpacity>
    </View>
)}
export default Panier;