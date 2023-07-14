import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

function NoteItem({note}) {
    const {user}=useSelector((state)=>state.auth)
    return (
        <div className="note" style={{
            backgroundColor:note.isStaff?'rgba(0,0,0,0.7)':'white',
            color:note.isStaff?' white':'black'
        }}>
            <h4>Note From {note.isStaff? <span>Staff</span> : <span>{user.name}</span>}</h4>
            <p>{note.text}</p>
          {/*   <div className="note-date">
                {new Date(note.createdAt).useLocaleString('us-en')}
            </div> */}
        </div>
    );
}

export default NoteItem;