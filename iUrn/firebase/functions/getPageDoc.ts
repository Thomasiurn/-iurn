import { doc, Firestore, getDoc } from "firebase/firestore";
export default function getPageDoc(db: Firestore) {
  return async (userId: string) => {
    const docRef = doc(db, "Pages", userId)
  const docSnap = await getDoc(docRef)

  const data = docSnap.exists() ? docSnap.data() : null

  if (data === null || data === undefined) return null

  return { userId, ...data }
  };
}


