import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) { 
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the databse");

  //connection to index db database and version
  const jateDb = await openDB("jate", 1);

  //new transaction & specify store and data privlilleges
  const tx = jateDb.transaction("jate", "readwrite");

  //open desired object store
  const store = tx.objectStore("jate");

  //get all data in the db
  const request = store.put({
    id: 1,
    value: content
  });

  //confirm request
  const result = await request;
  console.log("data saved to db", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the databse");

  //connection to index db database and version
  const jateDb = await openDB("jate", 1);

  //new transaction & specify store and data privlilleges
  const tx = jateDb.transaction("jate", "readonly");

  //open desired object store
  const store = tx.objectStore("jate");

  //get all data in the db
  const request = store.getAll();

  //confirm request
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();
