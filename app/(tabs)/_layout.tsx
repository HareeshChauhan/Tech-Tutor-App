import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        tabBarStyle: {
            backgroundColor: 'white',
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
            borderTopWidth: 0, // Remove the border if necessary
          },
          headerStyle: {
            backgroundColor: 'white',  // Optional: Set header background color
            elevation: 0,  // Remove shadow on Android
            shadowOpacity: 0,  // Set shadow height to 0
          },
          
            // Tab bar background
      }}>
        <Tabs.Screen name='Home' options={{
            
            headerTitle: () => (
                <Text style={{
                    fontSize:26,
                    fontFamily:'outfit-bold',
                    color:Colors.primary,
                }}>TechTutor</Text>
            ),
            headerRight: () => (
                <TouchableOpacity style={{marginRight:15}}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
                </TouchableOpacity>
            ),
            tabBarIcon: ({color,size})=> <Ionicons name="home-outline" size={size} color={color} />,
            tabBarLabel: 'Home'
        }}/>
        <Tabs.Screen name='Explore' options={{
            tabBarIcon: ({color,size})=> <Ionicons name="paper-plane-outline" size={size} color={color} />,
            tabBarLabel: 'Explore'
        }}/>
        <Tabs.Screen name='Progress' options={{
            // tabBarStyle: { display: "none" },
            // headerTitle: () => (
            //             <View style={{flexDirection: "row",}}>
            //             <TouchableOpacity onPress={() => router.back()}>
            //             <Ionicons name="arrow-back" size={26} color="black" />
            //             </TouchableOpacity >
            //             <Text style={{marginLeft:5,fontSize:20,fontFamily:'outfit'}}>My Courses</Text>
            //             </View>
            // ),
            headerLeft: ()=>(
                <View style={{marginLeft:5}}>
                <MaterialCommunityIcons name="google-analytics" size={24} color={Colors.black} />
                </View>
            ),
            tabBarIcon: ({color,size})=> <MaterialCommunityIcons name="google-analytics" size={size} color={color} />,
            tabBarLabel: 'Progress'
        }}/>
        <Tabs.Screen name='Profile' options={{
            tabBarStyle: { display: "none" },
            tabBarIcon: ({color,size})=> <Ionicons name="person-circle-outline" size={size} color={color} />,
            tabBarLabel: 'Profile'
        }}/>
    </Tabs>
  )
}