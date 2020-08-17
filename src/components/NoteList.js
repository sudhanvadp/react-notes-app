import React, {Component} from 'react';

class NoteList extends Component {
    editNote = (index) => {
        this.props.editNote(index);
    }
    render() {
        const { noteList } = this.props;
        const notesDiv = noteList.map((note, index) => {
        return <div key={index} className="card" onClick = {() => this.editNote(index)} >{note}</div>;
        });
        
        return (
            <div className="container">
                {notesDiv}
            </div>
        );
    }
}

export default NoteList;