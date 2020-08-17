import React, {Component } from 'react';
import './AddNote.css';
class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    deleteNote = () => {
        this.props.deleteNote(this.props.index);
    }

    addNote = () => {
        if(this.state.text.trim() === "")
            return;
        if(this.props.index===-1){
            this.props.addNote(this.state.text);
        }
        else {
            this.props.updateList(this.props.index, this.state.text);
        }
        this.setState({text: ""});

    }

    cancelNote = () => {
        this.props.cancelNote();
    }

    render() {

        var deleteButton = <div></div>;
        if(this.props.index!==-1) {
            deleteButton = (<button className="formButton" onClick={this.deleteNote}>
                Delete
            </button>);
        }
        return (
            <div>
                <form onSubmit= {(event) => event.preventDefault()}>
                    <textarea rows = "15" cols = "50" 
                        type ="text"
                        value = {this.state.text}
                        onChange={(e) => this.setState({ text: e.target.value })}
                    />
                    <br />
                    <button className="formButton" onClick={this.addNote}>
                        {this.props.index===-1?"Submit":"Update"}
                    </button>
                    <button className="formButton" onClick={this.cancelNote}>
                        Cancel
                    </button>
                    {deleteButton}
                </form>
            </div>
        );
    }
}

export default AddNote;