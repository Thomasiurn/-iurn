import { useTailwind } from "tailwind-rn/dist";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AddName from "../screens/AddName";
import AddMemorial from "../screens/AddMemorial";
import AddMemory from "../screens/AddMemory";
import HomePage from "../screens/HomePage";
import RememberWhen from "../screens/RememberWhen";
export default function SignedInUserNavigator() {
  const Stack = createStackNavigator();
  const tailwind = useTailwind();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NewHome" component={HomePage} />
      <Stack.Screen name="RememberWhen" component={RememberWhen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddName" component={AddName} />
      <Stack.Screen name="AddMemorial" component={AddMemorial} />
      <Stack.Screen name="AddMemory" component={AddMemory} />
    </Stack.Navigator>
  );
}
