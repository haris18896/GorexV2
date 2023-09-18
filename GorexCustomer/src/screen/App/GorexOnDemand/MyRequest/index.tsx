import React from 'react';
import {View, StyleSheet} from 'react-native';
import MyRequestTabs from '../../../../navigation/TopTab/MyRequestTabs';

const MyRequest = () => {
  return (
    <View style={styles.mainContainer}>
      <MyRequestTabs />
    </View>
  );
};

export default MyRequest;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
