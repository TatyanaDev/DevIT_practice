"use strict";

const dbReq = indexedDB.open("myDatabase", 2);
const objectFile = {};
const objectURL = {};
let db;

dbReq.onupgradeneeded = (event) => {
  db = event.target.result;

  if (!db.objectStoreNames.contains("notes")) {
    const notes = db.createObjectStore("notes", { autoIncrement: true });

    notes.createIndex("timestamp", "timestamp");
  }
};

const displayNotes = (notes) => {
  let listHTML = '<ul class="zipList">';

  notes.forEach((note) => {
    const fileNames = note.fileNames ? note.fileNames.join(", ") : "No files";

    listHTML += `
      <li class="zip">
        <button class="btnDelete" onclick="deleteNote(${
          note.timestamp
        })">X</button>
        ${note.myArchive[0].type} Размер архива: ${
      note.myArchive[0].size
    } байт Дата создания: ${new Date(note.timestamp).toLocaleString("ru")}
        <a href="${
          objectURL[note.timestamp]
        }" class="download" download="all-files.zip">Скачать</a>
        <button class="view" onclick="toggleHidden(${
          note.timestamp
        })">Просмотреть</button>
        <p class="fileList" data-id="${
          note.timestamp
        }" style="display: none;">${fileNames}</p>
      </li>`;
  });

  listHTML += "</ul>";

  document.getElementById("notes").innerHTML = listHTML;
};

const getAndDisplayNotes = (db) => {
  const tx = db.transaction(["notes"], "readonly");
  const store = tx.objectStore("notes");
  const req = store.openCursor();
  const allNotes = [];

  req.onsuccess = (event) => {
    let cursor = event.target.result;

    if (cursor) {
      allNotes.push(cursor.value);
      cursor.continue();
    } else {
      displayNotes(allNotes);
    }
  };

  req.onerror = (event) =>
    alert("Error in cursor request: " + event.target.errorCode);
};

dbReq.onsuccess = (event) => {
  db = event.target.result;

  getAndDisplayNotes(db);
};

dbReq.onerror = (event) => console.error("Database error:", event.target.error);

const addStickyNote = (db, content, valueURL, filesName) => {
  const tx = db.transaction(["notes"], "readwrite");
  const store = tx.objectStore("notes");

  let note = {
    myArchive: [content],
    timestamp: Date.now(),
    fileNames: filesName,
  };

  objectURL[note.timestamp] = valueURL;
  objectFile[note.timestamp] = filesName.join(", ");

  store.add(note).onerror = (event) =>
    alert("Error adding note: " + event.target.errorCode);

  tx.oncomplete = () => getAndDisplayNotes(db);
};

const submitNote = (event) => {
  event.preventDefault();

  const message = document.getElementById("newmessage");
  const files = message.files;

  if (!files.length) {
    return;
  }

  const zip = new JSZip();
  const filesName = [];

  Array.from(files).forEach((file) => {
    zip.file(file.name, file);
    filesName.push(file.name);
  });

  message.value = "";

  zip.generateAsync({ type: "blob" }).then((content) => {
    const valueURL = URL.createObjectURL(content);

    addStickyNote(db, content, valueURL, filesName);
  });
};

const toggleHidden = (timestamp) => {
  const fileListElement = document.querySelector(`p[data-id='${timestamp}']`);

  if (fileListElement) {
    fileListElement.style.display =
      fileListElement.style.display === "none" ? "block" : "none";
  }
};

const deleteNote = (timestamp) => {
  const tx = db.transaction(["notes"], "readwrite");
  const store = tx.objectStore("notes");
  const index = store.index("timestamp");

  index.getKey(timestamp).onsuccess = () =>
    (store.delete(this.result).onsuccess = () => {
      console.log("Note deleted successfully.");

      getAndDisplayNotes(db);
    });

  tx.onerror = (event) =>
    alert("Error in delete transaction: " + event.target.errorCode);
};
