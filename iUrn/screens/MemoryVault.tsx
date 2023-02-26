import { RandomMemory } from "../components/RandomMemory";
import { Text, View, Image, Dimensions, PixelRatio } from "react-native";
import { useTailwind } from "tailwind-rn";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { UserNdefParams } from "../types";
import getAndSetMemory from "../local_functions/getAndSetMemory";
import goBack from "../local_functions/goBack";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

//TODO: add typing to userNdef
export default function HomeScreen({
  params,
  navigation,
}: {
  params: UserNdefParams;
  navigation: StackNavigationHelpers;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState<Array<number> | null>(null);
  const [userDoc, setUserDoc] = useState<DocumentData | null>(null);
  useEffect(() => {
    getAndSetMemory(setIsLoading, params, setDimensions, setUserDoc);
  }, []);
  const tailwind = useTailwind();

  return (
    <View style={tailwind("bg-light-primary w-full h-full")}>
      {/*DESIGN: This should be in the upper right corner*/}
      <IconButton
        icon="close"
        onPress={() => navigation.navigate("ScanScreen")}
        accessibilityLabel="Close"
        accessibilityHint="Navigates to the home page"
      />
      {isLoading == false && (
        <RandomMemory
          tailwind={tailwind}
          userDoc={userDoc}
          dimensions={dimensions}
        />
      )}
    </View>
  );
}
