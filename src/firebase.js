import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, push, get } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bakeryproject-b147b.firebaseapp.com",
  projectId: "bakeryproject-b147b",
  storageBucket: "bakeryproject-b147b.firebasestorage.app",
  messagingSenderId: "948394689038",
  appId: "1:948394689038:web:c51f7fbc6bca8ad8ae325f",
  measurementId: "G-T2XFDSPCN9",
  databaseURL: "https://bakeryproject-b147b-default-rtdb.firebaseio.com"
};

// Inicialización
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

/**
 * Función para guardar un voto
 */
export const saveVote = async (productID) => {
    try {
        const votesRef = ref(database, "votes");
        const newVoteRef = push(votesRef);
        await set(newVoteRef, {
            productID: productID,
            timestamp: new Date().toISOString(),
        });
        return { status: "success", message: "¡Voto guardado!" };
    } catch (error) {
        return { status: "error", message: error.message };
    }
};

/**
 * Función para obtener los votos
 */
export const getVotes = async () => {
    try {
        const votesRef = ref(database, 'votes');
        const snapshot = await get(votesRef);
        if (snapshot.exists()) {
            return { success: true, data: snapshot.val() };
        }
        return { success: true, data: {} };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export { database };
export default app;