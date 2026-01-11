import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ฟังก์ชันบันทึกคำศัพท์ใหม่
export const addVocabulary = async (uid, vocabData) => {
       try {
              // บันทึกลงใน users -> [uid] -> vocabularies
              const docRef = await addDoc(collection(db, "users", uid, "vocabularies"), {
                     ...vocabData,          // ข้อมูลคำศัพท์ (word, ipa, meaning...)
                     status: "new",         // สถานะเริ่มต้น: ศัพท์ใหม่
                     practice_count: 0,     // เริ่มต้นยังไม่เคยคัด
                     created_at: serverTimestamp() // เวลาที่บันทึก
              });
              console.log("Saved vocab with ID: ", docRef.id);
              return { success: true, id: docRef.id };
       } catch (error) {
              console.error("Error adding document: ", error);
              return { success: false, error };
       }
};