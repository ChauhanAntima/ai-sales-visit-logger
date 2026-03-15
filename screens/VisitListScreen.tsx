
import React,{useEffect,useState} from "react"
import {
View,
Text,
FlatList,
TouchableOpacity,
StyleSheet
} from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { getVisits } from "../services/storage"
import VisitCard from "../components/VisitCard"

export default function VisitListScreen({ navigation }: any){

const [visits,setVisits]=useState<any[]>([])

useEffect(()=>{

loadVisits()

},[])

const loadVisits = async () => {

const data=await getVisits()

setVisits(data)

}

const logout = async () => {

await AsyncStorage.removeItem("userSession")

navigation.replace("Login")

}

return(

<View style={styles.container}>

{/* HEADER */}

<View style={styles.header}>

<Text style={styles.title}>
Visits
</Text>

<View style={styles.headerButtons}>

<TouchableOpacity
onPress={()=>navigation.navigate("VisitForm")}
>
<Text style={styles.addBtn}>
+ Add Visit
</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={logout}
>
<Text style={styles.logout}>
Logout
</Text>
</TouchableOpacity>

</View>

</View>


{/* VISIT LIST */}

<FlatList
data={visits}
keyExtractor={(item)=>item.id}
contentContainerStyle={{padding:10}}
renderItem={({item})=>(
<VisitCard
visit={item}
onPress={()=>navigation.navigate("Detail",{visit:item})}
/>
)}
/>

</View>

)

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f6fa"
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
padding:15,
backgroundColor:"#fff",
borderBottomWidth:1,
borderColor:"#eee"
},

title:{
fontSize:20,
fontWeight:"bold"
},

headerButtons:{
flexDirection:"row",
gap:15
},

addBtn:{
color:"#2f80ed",
fontWeight:"bold"
},

logout:{
color:"#e74c3c",
fontWeight:"bold"
}

})
