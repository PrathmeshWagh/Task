import { StyleSheet, Text, View,StatusBar,Image, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react';
import { Ionicons,Entypo,Octicons,MaterialCommunityIcons,EvilIcons  } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Home = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    getAPIData()
  },[])

  const getAPIData = async() =>{
    try {
      const response = await axios.get('https://fakestoreapi.com/products?limit=6')
      setData(response.data)
      setLoading(false);
    } catch (error) {
      console.log('Error is ',error)
      setLoading(false);
    }
  }

  const listEmpty = () =>{
    if (loading) {
      return <ActivityIndicator size="large" color="blue" />;
    }
    return <View style={{alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:25, fontWeight:'bold'}}>No data available</Text></View>
  }

  const renderData = ({item}) =>{
    return (
      <View style={{flex:1, paddingVertical:20,marginHorizontal:9}}>
        <View style={styles.imgcontainer}>
        <EvilIcons name="heart" size={30} color="pink" style={{alignSelf:'flex-end'}}/>
        <Image src={item.image} style={{width:120, height:120}} resizeMode='contain' />
        </View>
        <Text style={{fontWeight:'600'}}>{`$${item.price}.00`}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail"  style={{fontWeight:'600'}}>{item.title}</Text>
       <Text style={{fontWeight:'600'}}>{`Rating : ${item.rating.rate}`}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}> 
     {/* header component */}     
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={openDrawer}>
        <Ionicons name="reorder-three" size={35} color="red" />
        </TouchableOpacity>
      

      <View style={{backgroundColor:'red'}}>
        <Text style={{color:'white',fontSize:20,paddingHorizontal:5, fontWeight:300}}>LFK</Text>
        <Text style={{color:'white',fontSize:12,paddingHorizontal:5}}>Living Free Korea</Text>
      </View>

      <View style={{flexDirection:'row', alignItems:'center'}}>
        <Entypo name="network" size={24} color="red" />
        <Text style={{marginLeft:5}}>EN</Text>
      </View>
      </View>

      {/* sort and filter block */}
      <View style={{flexDirection:'row',borderWidth:0.5, borderColor:'black',}}>
        <View style={styles.sortandFilterContainer}>
        <Octicons name="sort-desc" size={24} color="red" />
          <Text>SORT</Text>
        </View>

        <View style={styles.sortandFilterContainer}>
        <MaterialCommunityIcons name="filter-variant" size={24} color="red" />
          <Text>FILTER</Text>
        </View>
      </View>

      {/* Main Content */}


        <FlatList 
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderData}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={listEmpty}
        />
    
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff',
    paddingTop:20
  },
  headerContainer:{flexDirection:'row', 
  justifyContent:'space-between',
  alignItems:'center',
   paddingHorizontal:20,
   paddingVertical:20},
   sortandFilterContainer:{flexDirection:'row',justifyContent:'center', alignItems:'center', width:'50%', borderRightWidth:0.5,paddingVertical:8},
  flatListContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imgcontainer:{
    borderRadius:8,
    marginBottom:10,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: '#171717',
    shadowOffset: {width: -5, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation:9,
    backgroundColor:'#ffffff'
    
  }
})