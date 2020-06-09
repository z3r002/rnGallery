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
import ImageElement from './src/ImageElement';
import mainStore from './src/screeens/main/MainStore';

class Example extends Component {
  // constructor() {
  //     super()
  //     this.state = {
  //         isLoading: true,
  //         dataSource: []
  //     }
  // }

  renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.press(item)}
        style={{flex: 1, flexDirection: 'column'}}>
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

    // networkService("photos")
    //      .then((responseJson) => {
    //          this.setState({
    //              dataSource: responseJson,
    //              isLoading: false
    //          })
    //      })
    //      .catch((error) => {
    //          console.log(error)
    //      })
  }

  render() {
    if (mainStore.loader) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
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
    backgroundColor: 'black',
  },

  image: {
    height: Dimensions.get('window').height / 2.5,
    width: Dimensions.get('window').width / 2,
  },
});
