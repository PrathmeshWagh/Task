import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator,DrawerContentScrollView  } from "@react-navigation/drawer";
import Home from "./src/screens/Home";
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import Shopping from './src/screens/Shopping';
import Account from './src/screens/Account';
import { Feather, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Home2 from './src/screens/Home2';
import {View,TouchableOpacity,Text} from 'react-native'

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <DrawerContentScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
        >
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
        >
          <Text>Profile</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName='StackNavigator' screenOptions={{headerShown:false,tabBarStyle:{backgroundColor:'red'},tabBarShowLabel:false}}>
      <BottomTab.Screen
        name='StackNavigator'
        component={StackNavigator}
        options={{
          tabBarIcon: () => (
            <Feather name="home" size={24} color="white" />
          ),
        }}
      />
      <BottomTab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: () => (
            <EvilIcons name="search" size={35} color="white" />
          ),
        }}
      />
      <BottomTab.Screen
        name='Shopping'
        component={Shopping}
        options={{
          tabBarIcon: () => (
            <Feather name="shopping-cart" size={24} color="white" />
          ),
        }}
      />
      <BottomTab.Screen
        name='Account'
        component={Account}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" size={30} color="white" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const StackNavigator = () =>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Home' component={Home}/>
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='BottomTabNavigator'  drawerContent={(props) => <CustomDrawerContent {...props} />} >
        <Drawer.Screen name='BottomTabNavigator' component={BottomTabNavigator} options={{headerShown:false}}/>
        <Drawer.Screen name='Profile' component={Profile}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
