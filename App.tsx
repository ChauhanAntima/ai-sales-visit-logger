import React,{useEffect,useState} from "react"
import { NavigationContainer } from "@react-navigation/native"

import AsyncStorage from "@react-native-async-storage/async-storage"
import AppNavigator from "./navigation/AppNavigator"



export default function App(){

 const [loading,setLoading]=useState(true)

 useEffect(()=>{

 const checkLogin = async () => {

 const value = await AsyncStorage.getItem("loggedIn")

 setLoading(false)

 }

 checkLogin()

 },[])

 if(loading) return null

 return(

 <NavigationContainer>

 <AppNavigator/>

 </NavigationContainer>

 )

}