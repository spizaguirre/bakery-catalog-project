import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCB4Jeq0qno6lc3uTZTC_SoRlxsbDsSAEI",
    authDomain: "landing-f652b.firebaseapp.com",
    databaseURL: "https://landing-f652b-default-rtdb.firebaseio.com",
    projectId: "landing-f652b",
    storageBucket: "landing-f652b.firebasestorage.app",
    messagingSenderId: "339976118787",
    appId: "1:339976118787:web:9236be2fdeb96aaa5c2436"
};

// Inicializar Firebase una sola vez
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Guarda un voto en Realtime Database
 */
export const saveVote = async (productID) => {
    try {
        const votesRef = ref(database, "votes");
        const newVoteRef = push(votesRef);
        
        await set(newVoteRef, {
            productID: productID,
            timestamp: new Date().toISOString(),
        });

        return {
            status: "success",
            message: "¡Voto guardado correctamente!",
        };
    } catch (error) {
        console.error("Error en saveVote:", error);
        return {
            status: "error",
            message: error.message,
        };
    }
};

/**
 * Obtiene todos los votos registrados
 */
export const getVotes = async () => {
    try {
        const votesRef = ref(database, 'votes');
        const snapshot = await get(votesRef);

        if (snapshot.exists()) {
            return {
                success: true,
                data: snapshot.val()
            };
        }
        return { success: true, data: {} };
    } catch (error) {
        console.error("Error en getVotes:", error);
        return {
            success: false,
            message: error.message
        };
    }
};