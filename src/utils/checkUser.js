import { db } from "@/config/firebaseClient"
import { collection, getDocs, limit, query, where } from "firebase/firestore"

export async function checkUser(email) {
    try {
        const q = query(
            collection(db, "users"),
            where("email", "==", email),
            limit(1)
        );
        const res = await getDocs(q);
        return res.size > 0;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}