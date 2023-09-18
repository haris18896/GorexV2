//import liraries
import React, {useEffect, useState} from 'react';
import {StyleSheet, Modal, View, ActivityIndicator, Text} from 'react-native';

//**prop types */
import PropTypes from 'prop-types';

//** theme */
import {fonts} from '../../infrustructure/theme/fonts';
import {colors} from '../../infrustructure/theme/colors';
import {HP, WP} from '../../infrustructure/theme/responsive';

const Loader = ({visible}: any) => {
  const [show, setShow] = useState(visible);
  useEffect(() => {
    if (visible) {
      setShow(visible);
    } else {
      setTimeout(() => {
        setShow(visible);
      }, 100);
    }
  }, [visible]);
  return (
    <Modal transparent visible={show} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={colors.primary.main} />
          <Text style={styles.waitTextStyle}>Please wait a moment</Text>
        </View>
      </View>
    </Modal>
  );
};
Loader.propTypes = {
  visible: PropTypes.bool,
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#0000004D',
    flex: 1,
    justifyContent: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
    borderRadius: WP(5),
    height: HP(150),
    justifyContent: 'center',
    width: WP(150),
  },
  waitTextStyle: {
    fontFamily: fonts.soraMedium,
    fontSize: 14,
    color: colors.primary.main,
  },
});

export {Loader};
