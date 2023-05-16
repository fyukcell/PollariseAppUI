// Src/Components/PollQuestion.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Option, Question } from "../utils/models";
import { theme } from "../styles/theme";

interface PollQuestionProps {
  question: Question;
  questionIndex: number;
  onOptionSelect: (
    questionIndex: number,
    optionIndex: number,
    options: Option
  ) => void;
  isHighlighted: boolean;
}

const PollQuestion: React.FC<PollQuestionProps> = ({
  question,
  questionIndex,
  onOptionSelect,
  isHighlighted,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (index: number, selectedOptions: Option) => {
    setSelectedOption(index);
    onOptionSelect(questionIndex, index, selectedOptions);
  };

  return (
    <View
      style={[styles.container, isHighlighted && styles.highlightedContainer]}
    >
      <Text style={styles.title}>{question.title}</Text>
      <Text style={styles.description}>{question.description}</Text>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionButton,
            selectedOption === index && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(index, option)}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === index && styles.selectedOptionText,
            ]}
          >
            {option.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: theme.colors.borderColor,
    borderRadius: 10,
    backgroundColor: theme.colors.containerBackground,
    padding: 10,
  },
  title: {
    ...theme.text.subTitle,
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primaryText,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: theme.colors.secondaryText,
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: theme.colors.containerBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  selectedOption: {
    backgroundColor: theme.colors.accent,
    elevation: 3,
  },
  optionText: {
    ...theme.text.buttonText,
    fontWeight: "normal",
    color: theme.colors.primaryText,
  },
  selectedOptionText: {
    fontWeight: "bold",
    color: theme.colors.white,
  },
  highlightedOption: {
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  highlightedContainer: {
    borderColor: "#FF0000",
    borderWidth: 2,
  },
});

export default PollQuestion;
