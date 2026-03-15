
import React,{useState} from "react"
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert
} from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"

export default function LoginScreen({ navigation }: any){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleLogin = async () => {

if(!email || !password){

Alert.alert("Enter email and password")
return

}

const user={ email,password }

await AsyncStorage.setItem("userSession",JSON.stringify(user))

navigation.navigate("Visits")

}

return(

<View style={styles.container}>

<TextInput
placeholder="Email"
style={styles.input}
value={email}
onChangeText={setEmail}
/>

<TextInput
placeholder="Password"
secureTextEntry
style={styles.input}
value={password}
onChangeText={setPassword}
/>

<TouchableOpacity style={styles.button} onPress={handleLogin}>
<Text style={styles.buttonText}>LOGIN</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
<Text style={styles.link}>Don't have account? Sign Up</Text>
</TouchableOpacity>

</View>

)

}

const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
padding:20
},

input:{
borderWidth:1,
borderColor:"#ddd",
padding:12,
marginBottom:15,
borderRadius:8
},

button:{
backgroundColor:"#2f80ed",
padding:14,
alignItems:"center",
borderRadius:8
},

buttonText:{
color:"#fff",
fontWeight:"bold"
},

link:{
textAlign:"center",
marginTop:15,
color:"blue"
}

})
