
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "../screens/LoginScreen"
import SignupScreen from "../screens/SignupScreen"
import VisitListScreen from "../screens/VisitListScreen"
import VisitFormScreen from "../screens/VisitFormScreen"
import VisitDetailScreen from "../screens/VisitDetailScreen"

export type RootStackParamList = {
Login: undefined
Signup: undefined
Visits: undefined
VisitForm: undefined
Detail: { visit: any }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {

return (

<Stack.Navigator initialRouteName="Login">

<Stack.Screen
name="Login"
component={LoginScreen}
/>

<Stack.Screen
name="Signup"
component={SignupScreen}
/>

<Stack.Screen
name="Visits"
component={VisitListScreen} options={{ headerLeft: () => null }}
/>

<Stack.Screen
name="VisitForm"
component={VisitFormScreen}
options={{ title:"Create Visit" }}
/>

<Stack.Screen
name="Detail"
component={VisitDetailScreen}
options={{ title:"Visit Detail" }}
/>

</Stack.Navigator>

)

}
