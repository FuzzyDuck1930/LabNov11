import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, DocumentData, serverTimestamp, query, } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyD-HYIh8x0onCBChk1wlSDlWIeSUdaFXNM",
    authDomain: "dcatest-2ee5f.firebaseapp.com",
    projectId: "dcatest-2ee5f",
    storageBucket: "dcatest-2ee5f.appspot.com",
    messagingSenderId: "634779052994",
    appId: "1:634779052994:web:e23d3ec2eb58c9d2f6045b",
    measurementId: "G-V8GF33RZ1M"
};

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const productCollection = collection(db, "Products");

    interface Product {
      name?: string;
      price?: string;
      quantity?: string;
      imageUrl?: string;
    }

    export const addProduct = async (product: Product) => {
      try {
        const productCollection = collection(db, "Products");
        await addDoc(productCollection, {
          ...product,
          createdAt: serverTimestamp(),});
        console.log("Se añadió un producto");
      } catch (error) {
        console.error(error);
      }
    };

    export const getProducts = async (): Promise<Product[]> => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const products: any = [];
        querySnapshot.forEach((doc) => {
          const unity = doc.data();
          products.push({
          id: doc.id,
          ...unity,
        });
        });

        products.sort((a: any, b: any) => (b.createdAt ? b.createdAt.toMillis() : 0) - (a.createdAt ? a.createdAt.toMillis() : 0));
        return products.reverse();
      } catch (error) {
        console.error(error);
        return [];
      }
  };

    export default {
      addProduct,
      getProducts
    }