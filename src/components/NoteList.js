import React, {Component} from 'react';

class NoteList extends Component {
    editNote = (index) => {
        this.props.editNote(index);
    }
    render() {
        const { noteList } = this.props;
        const notesDiv = noteList.map((note, index) => {
            if(note.visible)
        return <div key={index} className="card" onClick = {() => this.editNote(index)} >{note.text}</div>;
        });
        
        return (
            <div className="container">
                {notesDiv}
            </div>
        );
    }
}

export default NoteList;