import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import mainStore from './src/screens/main/MainStore';
import ImageElement from './src/screens/ImageElement';
import {observer} from 'mobx-react';

@observer
class Example extends Component {
  renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.press(item)}
        style={styles.element}>
        <View>
          <Image style={styles.image} source={{uri: item.thumbnailUrl}} />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  press = item => {
    this.props.navigation.navigate('Details', {uri: item.thumbnailUrl});
  };
  componentDidMount() {
    mainStore.loadPhotos();
  }

  render() {
    if (mainStore.loader) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color="#000000"
            style={styles.indicator}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={mainStore.photos}
            renderItem={this.renderItem}
            numColumns={2}
          />
        </View>
      );
    }
  }
}

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Example} />
        <Stack.Screen name="Details" component={ImageElement} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  element: {
    flex: 1,
    flexDirection: 'column',
  },
  indicator: {
    flex: 1,
  },

  image: {
    margin: 2,
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 2,
  },
});
