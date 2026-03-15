import React from "react"
import { View, Text, Button, Alert, StyleSheet } from "react-native"

import { syncVisit } from "../services/syncService"
import { getVisits, saveVisits } from "../services/storage"

import { Visit } from "../types/Visit"

type Props = {
  route: {
    params: {
      visit: Visit
    }
  }
  navigation: any
}

export default function VisitDetailScreen({ route, navigation }: Props) {

  const { visit } = route.params

  const retry = async () => {

    try {

      const visits = await getVisits()

      const updatedVisit = await syncVisit(visit)

      const updatedVisits = visits.map(v =>
        v.id === visit.id ? updatedVisit : v
      )

      await saveVisits(updatedVisits)

      Alert.alert("Sync status updated")

    } catch (error) {

      Alert.alert("Sync failed")

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        {visit.customerName}
      </Text>

      <Text style={styles.field}>
        Contact: {visit.contactPerson}
      </Text>

      <Text style={styles.field}>
        Location: {visit.location}
      </Text>

      <Text style={styles.field}>
        Date: {visit.visitDate}
      </Text>

      <Text style={styles.sectionTitle}>
        Meeting Notes
      </Text>

      <Text style={styles.text}>
        {visit.notes}
      </Text>

      <Text style={styles.sectionTitle}>
        AI Summary
      </Text>

      <Text style={styles.text}>
        {visit.aiSummary}
      </Text>

      <Text style={styles.status}>
        Status: {visit.syncStatus}
      </Text>

      {visit.syncStatus === "failed" && (
        <Button
          title="Retry Sync"
          onPress={retry}
        />
      )}

      <View style={{ marginTop: 15 }} />

      <Button
        title="Edit Visit"
        onPress={() =>
          navigation.navigate("VisitForm", { visit })
        }
      />

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  field: {
    marginBottom: 5
  },

  sectionTitle: {
    marginTop: 15,
    fontWeight: "bold"
  },

  text: {
    marginTop: 5
  },

  status: {
    marginTop: 15,
    fontWeight: "bold"
  }

})