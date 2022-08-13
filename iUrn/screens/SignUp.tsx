import { useNavigation } from "@react-navigation/native"
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, } from "react-native"
import { Button } from "react-native-paper";
import { useTailwind } from "tailwind-rn/dist";
export default function SignUp({
    navigation,
  }: {
    navigation: StackNavigationHelpers;
  }){
    const tailwind = useTailwind()
    //TODO: export this somewhere
    const inputStyles = {
      ...tailwind("border-b-2 w-2/3 h-10 p-2 text-center border-light-secondary")
    }
    return (
        <View style={tailwind("items-center bg-light-primary w-full h-full")}>
            <Text style={tailwind("mt-12 text-xl")}>Sign up</Text>
            <View style={tailwind("bg-light-secondary h-0.5 w-20 mt-1")}/>
            <TextInput accessibilityLabel="email" placeholder="Email" style={{...inputStyles, ...tailwind("mt-24")}}/>
            <TextInput placeholder="Password" textContentType='password' secureTextEntry={true} style={{...inputStyles, ...tailwind("mt-6")}}/>
            <Button mode="contained" color="#444eff" style={tailwind("rounded-lg mt-8")}>
              Sign up
            </Button>
            <TouchableOpacity onPress={() => {navigation.navigate("SignIn")}}>
                <Text style={tailwind("text-blue-800 mt-[90%]")}>Already have an account?</Text>
            </TouchableOpacity>
        </View>
    ) 
}