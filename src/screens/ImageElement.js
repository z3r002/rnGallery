import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Image} from 'react-native';

export default class ImageElement extends Component {
  render() {
    return (
      <Image source={{uri: this.props.route.params.uri}} style={styles.image} />
    );
  }
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
