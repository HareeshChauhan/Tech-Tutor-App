import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Explore() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* AI Support Section */}
      <TouchableOpacity style={styles.card} onPress={() => router.push('/screens/Chatbot')}>
        <Image source={require('@/assets/images/chatbot.jpeg')} style={styles.image} />
        <View style={{padding:10,}}>
        <Text style={styles.title}>AI Support</Text>
        <Text style={styles.subtitle}>Solve your doubts instantly with AI-powered assistance.</Text>
        </View>
      </TouchableOpacity>

      {/* Quiz Section */}
      <TouchableOpacity style={styles.card} onPress={() => router.push('/screens/Quizz')}>
        <Image source={require('@/assets/images/quizz.jpeg')} style={styles.image} />
        <View style={{padding:10,}}>
        <Text style={styles.title}>Quiz Challenge</Text>
        <Text style={styles.subtitle}>Test your knowledge with fun and interactive quizzes.</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => router.push('/screens/Compiler')}>
      <View style={{
        justifyContent:'center',
        width: 120,
    // height: "100%",
    paddingLeft:10,
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15,
    marginRight:10,}}>

      <FontAwesome5 name="laptop-code" size={80} color="black"/>
      </View>
        <View style={{padding:10,}}>
        <Text style={styles.title}>Compiler</Text>
        <Text style={{width:'40%',
    fontFamily:'outfit',
    fontSize: 16,
    color:Colors.dgray,
    marginTop: 5,}}>Write, compile, and run your code in multiple programming languages.</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
  },
  card: {
    flexDirection:'row',
    // width: '%',
    backgroundColor:Colors.bluebg,
    borderRadius: 15,
    // padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 120,
    height: "100%",
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15,
    marginRight:10,
    // marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontFamily:'outfit-bold',
    color:Colors.black,
  },
  subtitle: {
    width:'50%',
    fontFamily:'outfit',
    fontSize: 16,
    color:Colors.dgray,
    marginTop: 5,
  },
});
