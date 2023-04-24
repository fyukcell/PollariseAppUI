import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Card, CardProps } from "react-native-elements";
import { Poll } from "../utils/models";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons"; // Add this line
import moment from "moment";
import Share from "react-native-share";
import { theme } from "../styles/theme";

interface PollCardProps extends Omit<CardProps, "children"> {
  poll: Poll;
  onPress: () => void;
}

const PollCard: React.FC<PollCardProps> = ({ poll, onPress, ...cardProps }) => {
  const getTimeRemaining = () => {
    const now = moment();
    const endDate = moment(poll.endDate);
    const duration = moment.duration(endDate.diff(now));
    const hoursRemaining = duration.asHours();
    const daysRemaining = duration.asDays();

    if (hoursRemaining <= 0) {
      return { text: "Ended", color: "#FF0000" };
    }

    if (daysRemaining > 2) {
      return {
        text: `${Math.round(daysRemaining)}d remaining`,
        color: "#AAA",
      };
    }

    return {
      text: `${Math.round(hoursRemaining)}h remaining`,
      color: "#AAA",
    };
  };
  const timeRemaining = getTimeRemaining(); // Add this line

  const handleShare = async () => {
    try {
      const shareOptions = {
        message: "Pollarise: Get your voice up! \n" + poll.title,
        url:
          Platform.OS === "ios"
            ? "https://apps.apple.com/us/app/your-app-name/id1234567890"
            : "https://play.google.com/store/apps/details?id=com.yourappname",
        title: "Share Poll",
      };
      const result = await Share.open(shareOptions);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Card {...cardProps} containerStyle={styles.cardContainer}>
        <View style={styles.topRow}>
          <View style={styles.participants}>
            <Icon name="account-group" size={14} color="#AAA" />
            <Text style={styles.participantsText}>{poll.participants}</Text>
          </View>
          <View style={styles.timeRemaining}>
            <Icon name="timer" size={14} color="#AAA" />
            <Text
              style={[
                styles.timeRemainingText,
                { color: timeRemaining.color }, // Add this line
              ]}
            >
              {timeRemaining.text}
            </Text>
          </View>
        </View>
        <Card.Title style={styles.title}>{poll.title}</Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{poll.description}</Text>
        <View style={styles.bottomSection}>
          <View style={styles.participationContainer}>
            {poll.participated && (
              <View style={styles.participationCheckmark}>
                <MaterialIcon name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.participationText}>Participated</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Icon name="share" size={24} color="#AAA" />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    borderColor: theme.colors.border,
    borderWidth: 1,
    marginHorizontal: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.cardBackground,
  },
  participantsText: {
    fontSize: 14,
    color: theme.colors.secondaryText,
    marginLeft: 4,
  },
  timeRemainingText: {
    fontSize: 14,
    marginLeft: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primaryText,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: theme.colors.secondaryText,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  participants: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeRemaining: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  participationContainer: {
    flex: 1,
  },
  shareButton: {
    marginLeft: 10,
  },
  participationCheckmark: {
    flexDirection: "row",
    alignItems: "center",
  },
  participationText: {
    color: "#4CAF50",
    marginLeft: 4,
  },
});

export default PollCard;
