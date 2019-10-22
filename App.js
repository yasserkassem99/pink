/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
  Image,
  ActivityIndicator,
  
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios"


const App = (props) => {


  const [isLive,setIsLive] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    setIsLoading(true)
    axios.get('https://api.ride-int.com/api/isRideAvailable')
    .then(res=>{
      setIsLive(res.data.data.isAvailable)
      setIsLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setIsLoading(false)
    })
  },[])

  const openFacebook = ()=> {
    Linking.openURL("https://www.facebook.com/ride.int/")
    .catch((err) => console.error('An error occurred', err));
  }

  const openGooglePlay = ()=> {
    Linking.openURL("https://play.google.com/store/apps/details?id=com.core_ride.user")
    .catch((err) => console.error('An error occurred', err));
  }


    let footer = (<View style={{flex:0.1,marginTop:-40}}>
      <View style={styles.social}>
      <Text style={{fontSize:18,color:"#1a2849"}}>Lunching Soon</Text>
      <Text style={{fontSize:18,color:"#1a2849",paddingHorizontal:5}}>|</Text>
      <Text style={{fontSize:18,color:"#1a2849"}}>ترقبوا إنطلاق التطبيق قريبا</Text>
      </View>
      <View style={{flex:0.25,alignItems:"center",alignItems:"center"}}>
        <TouchableOpacity onPress={openFacebook}>
        <Icon size={50} name="facebook-square" color="#3D5B9A"/>
        </TouchableOpacity>
        </View>
      </View>)

      if(isLive){
          footer = (
            <View style={{flex:0.2,marginTop:-50}}>
               <View style={styles.download}>
                  <Text style={{fontSize:18,color:"#1a2849"}}>حمل التطبيق الآن</Text>
                  <Text  style={{fontSize:18,color:"#1a2849"}}>Download Now</Text>
               </View>
               <View style={styles.downLoadIcon}>
                    <TouchableOpacity activeOpacity={0.6} onPress={openGooglePlay}>
                      <Image style={{width:200,height:100}} source={require("./assest/download.png")}/>
                    </TouchableOpacity>
               </View>
            </View>
          )
      }

  return (
    <>
      <StatusBar barStyle="light-content" />
      
        {isLoading ?
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size="large" color="pink"/>
        </View>:
          <View style={styles.container}>
            <View style={styles.card}>
            <View style={styles.logoCont}>
            <Image source={require('./assest/pink.png')} style={{width:200,height:150}} />
            </View> 
            <View style={styles.AR}>
            <Text style={{fontSize:18,color:"#1a2849"}}>
                تم دمج تطبيق Pink مع تطبيق RIDE وسوف تكون خدمات Pink متوفرة من خلال تطبيق RIDE.
              </Text>
            </View>
            <View style={styles.EN}>
              <Text style={{fontSize:17,color:"#1a2849"}}>
              We are migrating Pink services to RIDE App.
              </Text>
            </View>
           {footer}
            </View>
            
          </View>}
      
    </>
  );
};

const styles = StyleSheet.create({
 container: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#fff"
  },
  card:{
    flex:0.8,
    width:"95%",
    backgroundColor:"#fff",
    alignItems:"center",
    padding:4},
    logoCont:{
      flex:0.2
    },
    logoCont:{
      flex:0.2,
      alignItems:"center",
      justifyContent:"center",
      marginTop:15
    },
  AR:{
    flex:0.2,
    width:"95%",
    justifyContent:"flex-end",
    paddingHorizontal:15,
    borderRadius:3,
    marginTop:0,
  },
  EN:{
    flex:0.2,
    width:"95%",
    paddingHorizontal:15,
    borderRadius:3,
    marginTop:20
   
  },
  social:{
    height:"75%",
    alignItems:"center",
    flexDirection:"row",
    width:"95%"
  },
  download:{
    flex:0.2,
    alignItems:"center",
    
  },
  downLoadIcon:{
    flex:0.4,
    alignItems:"center",
    marginTop:15
  }
});

export default App;
