//import liraries
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {HP, WP} from '../../infrustructure/theme/responsive';

interface Props {
  children?: any;
  style?: any;
}

// create a component
const LinearGradientComp: FC<Props> = ({children, style}) => {
  return (
    <LinearGradient
      colors={['#4AD594', '#000000']}
      start={{x: 0.5, y: 0.7}}
      end={{x: 0.5, y: 0.7}}
      angle={21}
      useAngle={true}
      angleCenter={{x: 1, y: 1}}
      locations={[0.54, 0.55]}
      style={{...style}}>
      {children}
    </LinearGradient>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },

  fristrow: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  onlymargin: {
    margin: 5,
  },

  logo: {
    marginTop: HP(100),
    resizeMode: 'contain',
    width: WP(234),
  },
});

//make this component available to the app
export {LinearGradientComp};
