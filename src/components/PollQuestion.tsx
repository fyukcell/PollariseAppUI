import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { OptionVerticalImpact, Question } from "../utils/models";
import { theme } from "../styles/theme";

interface PollQuestionProps {
  question: Question;
  questionIndex: number;
  onOptionSelect: (
    questionIndex: number,
    optionIndex: number,
    optionVerticals: OptionVerticalImpact[]
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

  const handleOptionSelect = (
    index: number,
    verticals: OptionVerticalImpact[]
  ) => {
    setSelectedOption(index);
    onOptionSelect(questionIndex, index, verticals);
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
          onPress={() =>
            handleOptionSelect(index, option.option_vertical_impact)
          }
        >
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    backgroundColor: theme.colors.cardBackground,
    padding: 10,
  },
  title: {
    fontSize: 16,
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
    backgroundColor: theme.colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
    elevation: 2,
  },
  optionText: {
    fontSize: 14,
    color: theme.colors.primaryText,
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
