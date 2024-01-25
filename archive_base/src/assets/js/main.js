let db;
let objectURL = {};
let objectFile = {};
let dbReq = indexedDB.open("myDatabase", 2);

dbReq.onupgradeneeded = (event) => {
  db = event.target.result;
  // Создадим хранилище объектов notes или получим его, если оно уже существует
  let notes;
  if (!db.objectStoreNames.contains("notes")) {
    notes = db.createObjectStore("notes", { autoIncrement: true });
  } else {
    notes = dbReq.transaction.objectStore("notes");
  }
  // Если в notes еще нет индекса timestamp создадим его
  if (!notes.indexNames.contains("timestamp")) {
    notes.createIndex("timestamp", "timestamp");
  }
};

const displayNotes = (notes) => {
  let listHTML = '<ul class="zipList">';
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    listHTML +=
      '<li class="zip"><button class="btnDelete" onclick="deleteNote(event)" data-id="' +
      note.timestamp +
      '">X</button>    ';
    listHTML +=
      note.myArchive[0].type +
      "    " +
      "Размер архива:   " +
      note.myArchive[0].size +
      "  байт" +
      "    " +
      "Дата создания:  " +
      new Date(note.timestamp).toLocaleString("ru");
    listHTML +=
      "     " +
      "<a href=" +
      objectURL[note.timestamp] +
      ' download ="all-files.zip" class="download" download>Скачать</a>     ';

    listHTML +=
      '     <button class="view" data_id="' +
      note.timestamp +
      '" onclick="noHidden(event)">Просмотреть</button>     ' +
      '<p class="fileList" data_id="' +
      note.timestamp +
      '" style="display: none;">' +
      objectFile[note.timestamp] +
      "</p>" +
      "</li>";
  }
  document.getElementById("notes").innerHTML = listHTML;

  noHidden = (event) => {
    const button_id = event.target.getAttribute("data_id");
    block = document.querySelector(`p[data_id='${button_id}']`);

    block.style.display === "none"
      ? (block.style.display = "initial")
      : (block.style.display = "none");
  };
};

const submitNote = () => {
  let message = document.getElementById("newmessage");
  let files = message.files;
  let filesName = [];
  if (!files.length) {
    return;
  }
  const zip = new JSZip();
  // обходим все файлы используя цикл
  for (let i = 0; i < files.length; i++) {
    // закидываем все в zip
    zip.file(`${files[i].name}`, files[i]);
    // отдельно достаем названия файлов
    filesName.push(files[i].name);
  }

  message.value = "";
  //разрешаем промис
  zip.generateAsync({ type: "blob" }).then(function (content) {
    //кладем данные в сссылку для скачивания
    createURL(content);
    //кладем данные в indexedDB
    addStickyNote(db, content);
  });

  addStickyNote = (db, ...message) => {
    // Запустим транзакцию базы данных и получим хранилище объектов Notes
    let tx = db.transaction(["notes"], "readwrite");
    let store = tx.objectStore("notes");
    // // Добавляем заметку в хранилище объектов
    let note = { myArchive: message, timestamp: Date.now() };

    objectURL[note.timestamp] = valueURL;
    objectFile[note.timestamp] = filesName;

    store.add(note);
    // Ожидаем завершения транзакции базы данных
    tx.oncomplete = () => {
      getAndDisplayNotes(db);
    };
    tx.onerror = (event) => {
      alert("error storing note " + event.target.errorCode);
    };
  };
};

createURL = (content) => {
  valueURL = URL.createObjectURL(content);
};

const getAndDisplayNotes = (db) => {
  let tx = db.transaction(["notes"], "readonly");
  let store = tx.objectStore("notes");
  // Создать запрос курсора
  let req = store.openCursor();
  let allNotes = [];
  req.onsuccess = (event) => {
    // Результатом req.onsuccess в запросах openCursor является IDBCursor
    let cursor = event.target.result;
    if (cursor != null) {
      // Если курсор не нулевой, мы получили элемент.
      allNotes.push(cursor.value);
      cursor.continue();
    } else {
      // Если у нас нулевой курсор, это означает, что мы получили все данные, поэтому отображаем заметки, которые мы получили.
      displayNotes(allNotes);
    }
  };
  req.onerror = (event) => {
    alert("error in cursor request " + event.target.errorCode);
  };
};

const deleteNote = (event) => {
  // получаем признак выбранной записи
  const valueTimestamp = parseInt(event.target.getAttribute("data-id"));
  // открываем транзакцию чтения/записи БД, готовую к удалению данных
  const tx = db.transaction(["notes"], "readwrite");
  // описываем обработчики на завершение транзакции
  tx.oncomplete = () => {
    console.log("Transaction completed.");
    getAndDisplayNotes(db);
  };
  tx.onerror = function (event) {
    alert("error in cursor request " + event.target.errorCode);
  };
  // создаем хранилище объектов по транзакции
  const store = tx.objectStore("notes");
  const index = store.index("timestamp");

  // получаем ключ записи
  const req = index.getKey(valueTimestamp);
  req.onsuccess = () => {
    const key = req.result;
    // выполняем запрос на удаление указанной записи из хранилища объектов
    let deleteRequest = store.delete(key);
    deleteRequest.onsuccess = () => {
      // обрабатываем успех нашего запроса на удаление
      console.log("Delete request successful");
    };
  };
};
