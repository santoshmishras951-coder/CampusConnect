import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

createRoot(document.getElementById('root')!).render(<App />);
