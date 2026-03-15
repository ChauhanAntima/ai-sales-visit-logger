
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

export default function SignupScreen({ navigation }: any){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [confirmPassword,setConfirmPassword]=useState("")

const handleSignup = async () => {

if(!email || !password || !confirmPassword){

Alert.alert("Fill all fields")
return

}

if(password!==confirmPassword){

Alert.alert("Passwords do not match")
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

<TextInput
placeholder="Confirm Password"
secureTextEntry
style={styles.input}
value={confirmPassword}
onChangeText={setConfirmPassword}
/>

<TouchableOpacity style={styles.button} onPress={handleSignup}>
<Text style={styles.buttonText}>SIGN UP</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>navigation.navigate("Login")}>
<Text style={styles.link}>Already have account? Login</Text>
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
