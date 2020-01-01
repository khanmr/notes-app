// Read existing notes from localStorage
const getSavedNotes = function() {
  const notesJSON = localStorage.getItem("notes");

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

// Save the notes to localStorage
const saveNotes = function(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = function(id) {
  const noteIndex = notes.findIndex(function(note) {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate the DOM structure for a note
const generateNoteDOM = function(note) {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  // const button = document.createElement("button");
  const statusEl = document.createElement("p");

  // // Setup the remove note button
  // button.textContent = "x";
  // button.style.textAlign = "right";
  // button.classList.add("button");
  // noteEl.appendChild(button);
  // button.addEventListener("click", function() {
  //   removeNote(note.id);
  //   saveNotes(notes);
  //   renderNotes(notes, filters);
  // });

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  //setup link
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  //status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

//Sort by
const sortNotes = function(notes, sortBy) {
  if (sortBy === "byEdited") {
    return notes.sort(function(a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort(function(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort(function(a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// Render application notes
const renderNotes = function(notes, filters) {
  const notesElement = document.querySelector("#notes");
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  notesElement.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(function(note) {
      const noteEl = generateNoteDOM(note);
      notesElement.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes.";
    emptyMessage.classList.add("empty-message");
    notesElement.appendChild(emptyMessage);
  }
};

//Get last edited note
const generateLastEdited = function(timestamp) {
  return `Last edited: ${moment(timestamp).fromNow()}`;
};
