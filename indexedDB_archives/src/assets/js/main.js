"use strict";

const databaseReq = indexedDB.open("database", 2);
const objectFile = {};
const objectURL = {};
let database;

databaseReq.onupgradeneeded = ({ target }) => {
  database = target.result;

  if (!database.objectStoreNames.contains("archives")) {
    const archives = database.createObjectStore("archives", {
      autoIncrement: true,
    });

    archives.createIndex("timestamp", "timestamp");
  }
};

const displayArchives = (archives) => {
  let archiveList = "<ul>";

  archives.forEach((archive) => {
    const fileNames = archive.fileNames
      ? archive.fileNames.join(", ")
      : "No files";

    archiveList += `
      <li class="archive">
        <div class="infoWrapper">
          <div>
            <p>Type: ${archive.archive[0].type};</p>
            <p>Size: ${archive.archive[0].size} bytes;</p>
            <p>Creation date: ${new Date(archive.timestamp).toLocaleDateString("ru")};</p>
            <p>Creation time: ${new Date(archive.timestamp).toLocaleTimeString("ru")};</p>
          </div>

          <div class="functionalWrapper">
            <button class="deleteBtn" onclick="deleteArchive(${archive.timestamp})">X</button>
              <div>
                <a href="${objectURL[archive.timestamp]}" class="downloadLink" download="archive.zip">Download</a>
                <button class="previewBtn" onclick="toggleHiding(${archive.timestamp})">Preview</button>
              </div>
          </div>
        </div>

        <p class="fileNames" data-id="${archive.timestamp}" style="display: none;">${fileNames}</p>
      </li>`;
  });

  archiveList += "</ul>";

  document.getElementById("archiveContainer").innerHTML = archiveList;
};

const getAndDisplayArchives = (database) => {
  const transaction = database.transaction(["archives"], "readonly");
  const store = transaction.objectStore("archives");
  const cursor = store.openCursor();
  const allArchives = [];

  cursor.onsuccess = ({ target }) => {
    const result = target.result;

    if (result) {
      allArchives.push(result.value);
      result.continue();
    } else {
      displayArchives(allArchives);
    }
  };

  cursor.onerror = ({ target }) =>
    alert("Error in cursor request: " + target.errorCode);
};

databaseReq.onsuccess = ({ target }) => {
  database = target.result;

  getAndDisplayArchives(database);
};

databaseReq.onerror = ({ target }) =>
  console.error("Database error:", target.error);

const addStickyArchive = (database, content, valueURL, fileNames) => {
  const transaction = database.transaction(["archives"], "readwrite");
  const store = transaction.objectStore("archives");

  const archive = {
    archive: [content],
    timestamp: Date.now(),
    fileNames,
  };

  objectFile[archive.timestamp] = fileNames.join(", ");
  objectURL[archive.timestamp] = valueURL;

  store.add(archive).onerror = ({ target }) =>
    alert("Error adding archive: " + target.errorCode);

  transaction.oncomplete = () => getAndDisplayArchives(database);
};

const createArchive = (event) => {
  event.preventDefault();

  const input = document.getElementById("input");
  const files = input.files;

  if (!files.length) {
    return;
  }

  const zip = new JSZip();
  const fileNames = [];

  Array.from(files).forEach((file) => {
    zip.file(file.name, file);

    fileNames.push(file.name);
  });

  input.value = "";

  zip.generateAsync({ type: "blob" }).then((content) => {
    const valueURL = URL.createObjectURL(content);

    addStickyArchive(database, content, valueURL, fileNames);
  });
};

const toggleHiding = (timestamp) => {
  const fileNames = document.querySelector(`p[data-id='${timestamp}']`);

  if (fileNames) {
    fileNames.style.display =
      fileNames.style.display === "none" ? "block" : "none";
  }
};

const deleteArchive = (timestamp) => {
  const transaction = database.transaction(["archives"], "readwrite");
  const store = transaction.objectStore("archives");
  const index = store.index("timestamp");

  index.getKey(timestamp).onsuccess = ({ target }) => {
    const key = target.result;

    if (key) {
      store.delete(key).onsuccess = () => {
        console.log("Archive deleted successfully");

        getAndDisplayArchives(database);
      };
    } else {
      console.log("No matching record found");
    }
  };

  transaction.onerror = ({ target }) =>
    alert("Archive delete error: " + target.errorCode);
};
