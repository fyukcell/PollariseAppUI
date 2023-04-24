import React, { useState, useEffect } from "react";
import {
  FlatList,
  Modal,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Text } from "react-native-elements";
import { Filter, POLL_TYPE, Poll } from "../utils/models";
import PollCard from "./PollCard";
import PollScreen from "./PollScreen";
import Login from "./Login";
import { isUserLoggedIn } from "../utils/auth";
import { samplePolls } from "../utils/sample_data";
import moment from "moment";
import PollResultScreen from "./PollResultsScreen";
import { theme } from "../styles/theme";

interface PollListProps {
  filters: Filter;
}

const PollList: React.FC<PollListProps> = ({ filters }) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchPolls();
  }, [filters]);

  const fetchPolls = async () => {
    setLoading(true);
    // Replace this with your API call to fetch polls based on the filters
    setTimeout(async () => {
      let fetchedPolls: Poll[] = [];
      if (filters?.type === POLL_TYPE.DAILY) {
        fetchedPolls = samplePolls.filter(
          (poll: Poll) => poll.category === POLL_TYPE.DAILY
        );
        // Fetch polls from the API
      } else {
        fetchedPolls = samplePolls.filter(
          (poll: Poll) => poll.category === POLL_TYPE.TRENDING
        );
        // Fetch polls from the API
      }
      setPolls(fetchedPolls);
      setLoading(false); // Set loading to false after fetching polls
    }, 1000);
  };

  const [pollModalVisible, setPollModalVisible] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPolls();
    setRefreshing(false);
  };
  const openPollModal = async (poll: Poll) => {
    const isLoggedIn = await isUserLoggedIn();
    if (!isLoggedIn) {
      setLoginModalVisible(true);
      return;
    }

    const now = moment();
    const endDate = moment(poll.endDate);
    const duration = moment.duration(endDate.diff(now));
    const hoursRemaining = duration.asHours();

    // Check if the user has participated or if the poll has ended
    const userParticipated = poll.participated;
    const pollEnded = hoursRemaining <= 0;

    setShowResults(userParticipated || pollEnded);
    setSelectedPoll(poll);
    setPollModalVisible(true);
  };

  const closePollModal = () => {
    setPollModalVisible(false);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const renderItem = ({ item }: { item: Poll }) => {
    return <PollCard poll={item} onPress={() => openPollModal(item)} />;
  };

  const renderEmptyList = () => (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>
        No polls available. Check back later.
      </Text>
    </View>
  );

  const renderFooter = () => <View style={styles.footer}></View>;

  const renderLoadingIndicator = () => (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={theme.colors.white} />
    </View>
  );

  return (
    <>
      {loading ? (
        renderLoadingIndicator()
      ) : (
        <FlatList
          data={polls}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={renderEmptyList}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        />
      )}
      {selectedPoll && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={pollModalVisible}
          onRequestClose={closePollModal}
        >
          {showResults ? (
            <PollResultScreen poll={selectedPoll} onClose={closePollModal} />
          ) : (
            <PollScreen poll={selectedPoll} onClose={closePollModal} />
          )}
        </Modal>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={loginModalVisible}
        onRequestClose={closeLoginModal}
      >
        <Login onLogin={closeLoginModal} onClose={closeLoginModal} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  emptyListText: {
    color: theme.colors.secondaryText,
    fontSize: 18,
  },
  footerText: {
    color: theme.colors.secondaryText,
    fontSize: 18,
  },
  emptyList: {
    alignItems: "center",
    padding: 20,
  },
  footer: {
    alignItems: "center",
    padding: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PollList;
