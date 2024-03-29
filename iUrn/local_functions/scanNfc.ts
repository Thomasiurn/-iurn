import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Alert } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import IFirebase from "../firebase/IFirebase";
export default async function scanNfc({
  navigation,
  userNdef,
  setShowReading,
  setIsScanning,
}: {
  //TODO: fix typing and remove userNdef prop once development is done
  navigation: StackNavigationHelpers;
  userNdef: any;
  setShowReading: Function;
  setIsScanning: Function;
}) {
  let isComplete;
  setIsScanning(true);
  try {
    isComplete = false;
    // register for the NFC tag with NDEF in it
    await NfcManager.requestTechnology(NfcTech.Ndef);
    // the resolved tag object will contain `ndefMessage` property
    const tag = await NfcManager.getTag();
    if (!tag?.ndefMessage[0].payload) return (userNdef = "No NDEF Data");
    const payload = tag?.ndefMessage[0]?.payload;
    payload.shift();
    payload.shift();
    payload.shift();
    userNdef = payload ? String.fromCharCode(...payload) : userNdef;
    isComplete = true;
  } catch (ex) {
    if (ex == "Error") return;
    console.warn("Oops!", ex);
    setIsScanning(false);
  } finally {
    if (isComplete) {
      setShowReading(true);
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
      setIsScanning(false);

      const name = await IFirebase.getUserName(userNdef)

      if(!name) return Alert.alert("Error", "This is not a valid NFC tag")

      Alert.alert(
        "Continue to page?",
        `View the memories of ${
          name
        }`,
        [
          {
            text: "Stay here",
            onPress: () => {
              setShowReading(false);
              scanNfc({ navigation, userNdef, setShowReading, setIsScanning });
            },
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              const isUserLiving = await IFirebase.getUserLiving(userNdef)
              if(isUserLiving == false) navigation.navigate("AfterScanning", { userNdef });
              else navigation.navigate("SignIn")
              setShowReading(false);
            },
          },
        ]
      );
      setShowReading(false);
    } else {
      await NfcManager.cancelTechnologyRequest();
      scanNfc({ navigation, userNdef, setShowReading, setIsScanning });
    }
  }
}
