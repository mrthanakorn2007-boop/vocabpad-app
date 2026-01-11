import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const useVocabList = (uid) => {
       const [vocabList, setVocabList] = useState([]);
       const [loading, setLoading] = useState(true);

       useEffect(() => {
              if (!uid) {
                     setVocabList([]);
                     setLoading(false);
                     return;
              }

              // สร้างคำสั่งดึงข้อมูล: ไปที่ users -> uid -> vocabularies แล้วเรียงตามเวลาล่าสุด
              const q = query(
                     collection(db, "users", uid, "vocabularies"),
                     orderBy("created_at", "desc")
              );

              // สั่งเฝ้าดูข้อมูล (Real-time Listener)
              const unsubscribe = onSnapshot(q, (snapshot) => {
                     const data = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                     }));
                     setVocabList(data);
                     setLoading(false);
              });

              return () => unsubscribe();
       }, [uid]);

       return { vocabList, loading };
};