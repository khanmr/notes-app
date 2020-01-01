const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const saveElement = document.querySelector("#save-note");
const removeElement = document.querySelector("#remove-note");
// const cancelElement = document.querySelector("#cancel");
const dateElement = document.querySelector("#last-edited");
const noteId = location.hash.substring(1);
const notes = getSavedNotes();
const note = notes.find(function(note) {
  return note.id === noteId;
});

if (!note) {
  location.assign("/index.html");
}

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener("input", function(e) {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
});

bodyElement.addEventListener("input", function(e) {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
});

saveElement.addEventListener("click", function(e) {
  saveNotes(notes);
  location.assign("/index.html");
});

removeElement.addEventListener("click", e => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/index.html");
});

// cancelElement.addEventListener("click", function(e) {
//   location.assign("/index.html");
// });
