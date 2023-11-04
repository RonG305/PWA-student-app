import { openDB } from 'idb';

const DB_NAME = 'StudentDB';
const STORE_NAME = 'students';

// Open the IndexedDB database and create object store if it doesn't exist
const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  }
});

export const addStudentToIndexedDB = async (student) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  await store.add(student);
  await tx.done;
}

export const getAllStudentsFromIndexDB = async () => {
  const db = await dbPromise;
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  return store.getAll();
}

export const clearIndexedDB = async () => {
  const db = await dbPromise;
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  await store.clear();
  await transaction.done;
}



export const updateStudentFromIndexedDB = async (id) => {
    const db = await dbPromise;
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    await store.put(id);
    await transaction.done;
}
  
export const getStudentFromIndexedDB = async (id) => {
    const db = await dbPromise
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const student = await store.get(id);

    return student;
}
  

export const deleteStudentFromIndexedDB = async (id) => {
  const db = await dbPromise;
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  
  await store.delete(id);
  await transaction.done;
}
