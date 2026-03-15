
import React, { useState } from "react"
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
ScrollView,
Alert,
Platform
} from "react-native"

import DateTimePicker from "@react-native-community/datetimepicker"

import { generateSummary } from "../services/aiService"
import { getVisits, saveVisits } from "../services/storage"
import { Visit } from "../types/Visit"

export default function VisitFormScreen({ navigation, route }: any) {

const visit = route?.params?.visit

const [customerName,setCustomerName]=useState(visit?.customerName || "")
const [contactPerson,setContactPerson]=useState(visit?.contactPerson || "")
const [location,setLocation]=useState(visit?.location || "")
const [notes,setNotes]=useState(visit?.notes || "")
const [outcome,setOutcome]=useState(visit?.outcome || "")

const [visitDate,setVisitDate]=useState(
visit?.visitDate ? new Date(visit.visitDate) : new Date()
)

const [followUp,setFollowUp]=useState(
visit?.followUpDate ? new Date(visit.followUpDate) : null
)

const [showVisitPicker,setShowVisitPicker]=useState(false)
const [showFollowPicker,setShowFollowPicker]=useState(false)

const [summary,setSummary]=useState(visit?.aiSummary || "")
const [loading,setLoading]=useState(false)


const generateAI = async () => {

if(!notes){
Alert.alert("Enter meeting notes first")
return
}

try{

setLoading(true)

const result = await generateSummary(notes)

setSummary(result)

}catch(error){

Alert.alert("AI summary generation failed")

}finally{

setLoading(false)

}

}


const handleSave=async()=>{

if(!customerName){
Alert.alert("Customer name required")
return
}

if(outcome==="follow-up needed" && !followUp){
Alert.alert("Follow up date required")
return
}

const visits: Visit[] = await getVisits()

const newVisit: Visit = {
id: visit?.id || Date.now().toString(),
customerName,
contactPerson,
location,
visitDate:visitDate.toDateString(),
notes,
outcome,
followUpDate: followUp ? followUp.toDateString() : "",
aiSummary:summary,
syncStatus: visit?.syncStatus || "draft"
}

let updatedVisits: Visit[]

if(visit){

updatedVisits = visits.map(v =>
v.id === visit.id ? newVisit : v
)

}else{

updatedVisits = [...visits,newVisit]

}

await saveVisits(updatedVisits)

Alert.alert(visit ? "Visit Updated Successfully" : "Visit Saved Successfully")

navigation.navigate("Visits")

}


return(

<ScrollView style={styles.container}>

<TextInput
placeholder="Customer Name"
style={styles.input}
value={customerName}
onChangeText={setCustomerName}
/>

<TextInput
placeholder="Contact Person"
style={styles.input}
value={contactPerson}
onChangeText={setContactPerson}
/>

<TextInput
placeholder="Location"
style={styles.input}
value={location}
onChangeText={setLocation}
/>


{/* Visit Date */}

{Platform.OS === "web" ? (

<TextInput
style={styles.input}
placeholder="Visit Date (YYYY-MM-DD)"
value={visitDate.toISOString().substring(0,10)}
onChangeText={(value)=>setVisitDate(new Date(value))}
/>

) : (

<>
<TouchableOpacity
style={styles.input}
onPress={()=>setShowVisitPicker(true)}
>
<Text>
Visit Date: {visitDate.toDateString()}
</Text>
</TouchableOpacity>

{showVisitPicker && (

<DateTimePicker
value={visitDate}
mode="date"
display="default"
onChange={(event,date)=>{
setShowVisitPicker(false)
if(date) setVisitDate(date)
}}
/>

)}

</>

)}


<TextInput
placeholder="Outcome Status"
style={styles.input}
value={outcome}
onChangeText={setOutcome}
/>


{/* Follow Up Date */}

{Platform.OS === "web" ? (

<TextInput
style={styles.input}
placeholder="Next Follow Up Date (YYYY-MM-DD)"
value={followUp ? followUp.toISOString().substring(0,10) : ""}
onChangeText={(value)=>setFollowUp(new Date(value))}
/>

) : (

<>
<TouchableOpacity
style={styles.input}
onPress={()=>setShowFollowPicker(true)}
>
<Text>
Next Follow Up Date: {followUp ? followUp.toDateString() : "Select Date"}
</Text>
</TouchableOpacity>

{showFollowPicker && (

<DateTimePicker
value={followUp || new Date()}
mode="date"
display="default"
onChange={(event,date)=>{
setShowFollowPicker(false)
if(date) setFollowUp(date)
}}
/>

)}

</>

)}


<TextInput
placeholder="Meeting Notes"
style={[styles.input,{height:120}]}
multiline
value={notes}
onChangeText={setNotes}
/>


<TouchableOpacity
style={styles.button}
onPress={generateAI}
>
<Text style={styles.buttonText}>
{loading ? "Generating..." : "GENERATE AI SUMMARY"}
</Text>
</TouchableOpacity>


{summary!=="" && (

<View style={styles.summaryBox}>
<Text>{summary}</Text>
</View>

)}


<TouchableOpacity
style={styles.saveButton}
onPress={handleSave}
>
<Text style={styles.buttonText}>
{visit ? "UPDATE VISIT" : "SAVE VISIT"}
</Text>
</TouchableOpacity>

</ScrollView>

)

}



const styles=StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#f5f6fa"
},

input:{
backgroundColor:"#fff",
padding:14,
borderRadius:8,
marginBottom:15,
borderWidth:1,
borderColor:"#ddd"
},

button:{
backgroundColor:"#2f80ed",
padding:15,
borderRadius:8,
alignItems:"center",
marginBottom:20
},

saveButton:{
backgroundColor:"#27ae60",
padding:15,
borderRadius:8,
alignItems:"center"
},

buttonText:{
color:"#fff",
fontWeight:"bold"
},

summaryBox:{
backgroundColor:"#fff",
padding:15,
borderRadius:8,
borderWidth:1,
borderColor:"#ddd",
marginBottom:20
}

})

