import { openDB } from "idb";

const initdb = async () =>
  openDB("JATE", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("JATE")) {
        console.log("JATE database already exisits");
        return;
      }
      db.createObjectStore("JATE", { keyPath: "id", autoIncrement: true });
      console.log("JATE database created");
    },
  });

export const putDb = async (notes) => {
  console.log("Put to the ase");
  const JATEDb = await openDB("JATE", 1);
  const tx = JATEDb.transaction("JATE", "readwrite");
  const store = tx.objectStore("JATE");
  const request = store.put({id:1, value:notes});
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

export const getDb = async () => {
  console.log("GET all from the database");
  const JATEDb = await openDB("JATE", 1);
  const tx = JATEDb.transaction("JATE", "readonly");
  const store = tx.objectStore("JATE");
  const request = store.get(1);
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

// export const deleteDb = async (id) => {
//   console.log("DELETE from the database", id);
//   const JATEDb = await openDB("JATE", 1);
//   const tx = JATEDb.transaction("JATE", "readwrite");
//   const store = tx.objectStore("JATE");
//   const request = store.delete(id);
//   const result = await request;
//   console.log("result.value", result);
//   return result;
// };

initdb();
