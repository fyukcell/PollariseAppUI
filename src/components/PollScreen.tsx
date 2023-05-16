import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Poll, Question, Option } from "../utils/models";
import PollQuestion from "./PollQuestion";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../styles/theme";
import { submitPoll } from "../utils/api";

interface PollScreenProps {
  poll: Poll;
  onClose: () => void;
}

interface OptionSelection {
  index: number;
  selectedOption: Option;
}

const PollScreen: React.FC<PollScreenProps> = ({ poll, onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionSelection[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (
    questionIndex: number,
    optionIndex: number,
    selectedOption: Option
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[questionIndex] = {
        index: optionIndex,
        selectedOption: selectedOption,
      };
      return newSelectedOptions;
    });
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);

    for (let i = 0; i < poll.questions.length; i++) {
      if (selectedOptions[i] === undefined) {
        Alert.alert("Incomplete", "Please answer all questions.", [
          { text: "OK" },
        ]);
        return;
      }
    }

    let allVerticals: Option[] = [];

    selectedOptions.forEach(
      (p) => (allVerticals = allVerticals.concat(p.selectedOption))
    );
    console.log(allVerticals);

    // Perform API call to submit the poll with the selected options
    try {
      const submitted = await submitPoll(poll, allVerticals);

      if (submitted) {
        Alert.alert("Success", "Your response has been submitted.", [
          { text: "OK", onPress: onClose },
        ]);
      } else {
        Alert.alert(
          "Error",
          "Failed to submit your response. Please try again.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Error submitting poll:", error);
      Alert.alert(
        "Error",
        "Failed to submit your response. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{poll.title}</Text>
          <Text style={styles.description}>{poll.description}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color={theme.colors.primaryText} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {poll.questions.map((question: Question, index: number) => (
          <PollQuestion
            key={question.id}
            question={question}
            questionIndex={index}
            onOptionSelect={handleOptionSelect}
            isHighlighted={isSubmitted && selectedOptions[index] === undefined}
          />
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    flexDirection: "column", // Change this line
  },
  header: {
    flexDirection: "row", // Change this line
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.containerBackground,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderColor: theme.colors.borderColor,
  },
  title: {
    ...theme.text.subTitle,
    fontSize: 25,
    textAlign: "left",
    fontWeight: "bold",
    color: theme.colors.primaryText,
  },
  content: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  submitButtonText: {
    ...theme.text.buttonText,
    fontWeight: "bold",
    color: theme.colors.white,
  },
  closeButton: {
    padding: 6,
  },
  description: {
    fontSize: 16,
    color: theme.colors.secondaryText,
    textAlign: "left",
  },
  ption: {
    fontSize: 16,
    color: theme.colors.secondaryText,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});

export default PollScreen;
