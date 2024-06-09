//import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    
    const notesInitial = [
        {
          "_id": "66628cfe980ca954648cbe63",
          "user": "6661b4541dd99cdf7489c737",
          "title": "Note 4",
          "description": "This is 3 note",
          "tag": "Personal",
          "date": "2024-06-07T04:30:54.168Z",
          "__v": 0
        },
        {
          "_id": "66628d01980ca954648cbe65",
          "user": "6661b4541dd99cdf7489c737",
          "title": "Note 44",
          "description": "This is 3 note",
          "tag": "Personal",
          "date": "2024-06-07T04:30:57.540Z",
          "__v": 0
        },
        {
          "_id": "66628d05980ca954648cbe67",
          "user": "6661b4541dd99cdf7489c737",
          "title": "Note 5",
          "description": "This is 3 note",
          "tag": "Personal",
          "date": "2024-06-07T04:31:01.647Z",
          "__v": 0
        },
        {
          "_id": "66628d13980ca954648cbe6b",
          "user": "6661b4541dd99cdf7489c737",
          "title": "Note 353",
          "description": "This is 3 note",
          "tag": "Personal",
          "date": "2024-06-07T04:31:15.167Z",
          "__v": 0
        },
        {
          "_id": "6662d0f76448f32340bf44ab",
          "user": "6661b4541dd99cdf7489c737",
          "title": "mbappe",
          "description": "This is mbappe's madrid",
          "tag": "football",
          "date": "2024-06-07T09:20:55.330Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);


    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;