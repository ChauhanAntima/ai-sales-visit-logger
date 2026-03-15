import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Visit } from "../types/Visit"

type Props = {
  visit: Visit
  onPress: () => void
}

export default function VisitCard({ visit, onPress }: Props) {

  return (

    <View style={styles.card}>

      <Text style={styles.name}>
        {visit.customerName}
      </Text>

      <Text>{visit.visitDate}</Text>

      <Text numberOfLines={1}>
        {visit.aiSummary}
      </Text>

      <Text style={styles.status}>
        Status: {visit.syncStatus}
      </Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.viewBtn}>
          View Details
        </Text>
      </TouchableOpacity>

    </View>

  )

}

const styles = StyleSheet.create({

card:{
padding:15,
borderBottomWidth:1,
borderColor:"#ddd"
},

name:{
fontWeight:"bold",
fontSize:16
},

status:{
marginTop:5
},

viewBtn:{
marginTop:5,
color:"#2f80ed",
fontWeight:"bold"
}

})