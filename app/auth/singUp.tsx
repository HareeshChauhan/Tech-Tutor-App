import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';
import {UserDetailContext} from '@/context/UserDetailContext';
import { User } from "firebase/auth";
import Colors from '@/constants/Colors';
import useBackHandler from "@/constants/useBackHandler";

export default function SignUp() {
  useBackHandler();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!fullName) {
      ToastAndroid.show('Full Name required', ToastAndroid.BOTTOM);
      return false;
    }
    if (/\d/.test(fullName)) {
      ToastAndroid.show('Invalid Name Format', ToastAndroid.BOTTOM);
      return false;
    }
    if (!email.includes('@')) {
      ToastAndroid.show('Invalid Email Format', ToastAndroid.BOTTOM);
      return false;
    }
    if (password.length < 6) {
      ToastAndroid.show('Password too short', ToastAndroid.BOTTOM);
      return false;
    }
    if (password.length > 256) {
      ToastAndroid.show('Password too long', ToastAndroid.BOTTOM);
      return false;
    }
    return true;
  };

  const CreateNewAccount = () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(resp) => {
        // Signed up 
        const user=resp.user;
        console.log(user);
        await SaveUser(user);
        setLoading(false);
        router.replace('../Home')
      })
      .catch(e=>{
        console.log(e.message)
        setLoading(false);
        ToastAndroid.show('Incorrect Email & Password', ToastAndroid.BOTTOM)
      })
  };

  const SaveUser = async(user: User) => {
    const data = {
      name: fullName,
      email: email,
      password: password,
      uid: user?.uid
    };
    await setDoc(doc(db,'users',email), data);
    setUserDetail(data);
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Create New Account</Text>
      <Text style={styles.subtitle}>Let's get your learning journey started.</Text>

      <TextInput placeholder='Full Name' value={fullName} onChangeText={setFullName} style={styles.textInput} />
      <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={styles.textInput} keyboardType='email-address' />
      <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry style={styles.textInput} />

      <TouchableOpacity onPress={CreateNewAccount} disabled={loading} style={styles.button}> 
      {!loading ?<Text style={styles.buttonText}>Create Account</Text>:
                <ActivityIndicator size={'large'} color={'white'} />}
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace('../auth/signIn')}>
          <Text style={styles.signInLink}>Sign In Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,backgroundColor:Colors.white },
  logo: { width: 100, height: 100,borderRadius:10, },
  title: { marginTop: 10, fontSize: 24, fontFamily: 'outfit-bold' },
  subtitle: { fontSize: 16, fontFamily: 'outfit', color: 'gray', marginBottom: 10 },
  textInput: { width: '90%', borderWidth: 1, borderRadius: 10, padding: 10, margin: 10, fontSize: 16, color: 'gray' },
  button: { padding: 10, backgroundColor: Colors.primary, width: '90%', borderRadius: 10, justifyContent: 'center', marginTop: 5 },
  buttonText: { fontSize: 20, color: 'white', fontFamily: 'outfit-bold', textAlign: 'center' },
  signInContainer: { flexDirection: 'row', marginTop: 5 },
  signInText: { fontFamily: 'outfit' },
  signInLink: { color: Colors.primary, fontFamily: 'outfit-bold', marginLeft: 5 },
});