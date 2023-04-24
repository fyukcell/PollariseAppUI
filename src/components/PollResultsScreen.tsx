import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Poll, Question } from "../utils/models";
import { theme } from "../styles/theme";

interface PollResultScreenProps {
  poll: Poll;
  onClose: () => void;
}

const PollResultScreen: React.FC<PollResultScreenProps> = ({
  poll,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{poll.title}</Text>
      <ScrollView contentContainerStyle={styles.content}></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#4B0082",
  },
  content: {
    padding: 20,
  },
});

export default PollResultScreen;
