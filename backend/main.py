from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import models
from model.database import DBSession
from schemas import NoteInput
from sqlalchemy.orm.exc import UnmappedInstanceError

app = FastAPI(title="Notes App")

origins = ["http://localhost:5173"]  # Default port for Vite

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create
@app.post("/api/note")
async def add_note(note: NoteInput):
    db = DBSession()
    try:
        if (len(note.title) == 0) or (len(note.body) == 0):
            raise HTTPException(
                status_code=400,
                detail={
                    "status": "400 Bad Request",
                    "msg": '"title" or "body" is empty.',
                },
            )
        new_note = models.Note(title=note.title, body=note.body)
        db.add(new_note)
        db.commit()
        db.refresh(new_note)
    finally:
        db.close()
    return new_note


# Read
@app.get("/api/notes")
async def read_notes():
    db = DBSession()
    try:
        notes = db.query(models.Note).all()
    finally:
        db.close()
    return notes


# Update
@app.put("/api/note/{note_id}")
async def update_note(note_id: int, updated_note: NoteInput):
    if (len(updated_note.title) == 0) or (len(updated_note.body) == 0):
        raise HTTPException(
            status_code=400,
            detail={
                "status": "400 Bad Request",
                "msg": '"title" or "body" is empty.',
            },
        )
    db = DBSession()
    try:
        note = db.query(models.Note).filter(models.Note.id == note_id).first()
        note.title = updated_note.title
        note.body = updated_note.body
        db.commit()
        db.refresh(note)
    finally:
        db.close()
    return note


# Delete
@app.delete("/api/note/{note_id}")
async def delete_note(note_id: int):
    db = DBSession()
    try:
        note = db.query(models.Note).filter(models.Note.id == note_id).first()
        db.delete(note)
        db.commit()
    except UnmappedInstanceError:
        raise HTTPExpception(
            status_code=400,
            detail={
                "status": "400 Bad Request",
                "msg": f'Note with "id": {note_id} doesn\'t exist.',
            },
        )
    finally:
        db.close()
    return {"status": "200", "msg": "Note deleted successfully."}
