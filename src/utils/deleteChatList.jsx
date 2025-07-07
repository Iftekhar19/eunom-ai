import { db } from "@/config/firebase.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";


async function deleteChatWithMessages(chatId) {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const messagesSnap = await getDocs(messagesRef);

 try {
     // Delete each message
     const deletePromises = messagesSnap.docs.map((messageDoc) =>
       deleteDoc(messageDoc.ref)
     );
     await Promise.all(deletePromises);
   
     // Delete the parent chat
     await deleteDoc(doc(db, "chats", chatId));
   
     console.log("Chat and its messages deleted.");
 } catch (error) {
     
    console.log(error)
 }
}
export {deleteChatWithMessages}
