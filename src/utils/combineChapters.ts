import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const combineChapters = async (user: string) => {
  const chaptersRef = collection(db, "users", user, "chapters");
  const snapshot = await getDocs(chaptersRef);
  const all = snapshot.docs.map(
    (doc) => `# ${doc.id}\n\n${doc.data().content}`,
  );
  return all.join("\n\n---\n\n");
};
