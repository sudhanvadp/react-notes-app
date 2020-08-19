import React from 'react';
import AddNote from './AddNote';
import SearchBox from './SearchBox';
import NoteList from './NoteList';
import Modal from 'react-modal';
import './App.css'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement('#root');
class App extends React.Component {
    state = {
        noteList : [],
        isOpen: false,
        seletedIndex: -1
    }

    addNote = (text) => {
        this.setState(prevState => ({
            noteList: [...prevState.noteList, {text, visible: true}],
            isOpen: false
          }))
        
    }

    cancelNote = () => {
        this.setState({isOpen: false})
        
    }

    editNote = (index) => {
        this.setState({seletedIndex: index
            }, 
            this.toggleModal()
        );
        
    }

    onClickAdd = () => {
        this.setState({seletedIndex: -1},
            this.toggleModal
            );
    }
    toggleModal = event => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    updateList = (index, text) => {
        const {noteList} = this.state;
        const newArray = [
            ...noteList.slice(0, index),
            {text, visible: true}, 
            ...noteList.slice(index + 1)
          ]
        this.setState({
            noteList : newArray,
            isOpen: false
        })
    }

    deleteNote = (index) => {
        const {noteList} = this.state;
        const newArray = [
            ...noteList.slice(0, index),
            ...noteList.slice(index + 1)
          ]
        this.setState({
            noteList : newArray,
            isOpen: false
        })
    }

    searchFire = (text) => {
        text = text.toUpperCase();
        console.log("Search Text: "+ text);
        const {noteList} = this.state;
        noteList.map((item, i) => {
            var curr = item.text;
            if(curr.toUpperCase().indexOf(text)>-1) {
                item.visible=true;
            }
            else{
                item.visible=false;
            }
        });

        this.forceUpdate()
    }

    render() {
    const { isOpen,  seletedIndex} = this.state;

        return (
            <div>
                <div className="header" >React Notes</div>
                <SearchBox searchFire = {this.searchFire}/>
                <button className="plusButton" onClick={this.onClickAdd}>+</button>
                <Modal
                    id="basic modal"
                    isOpen={isOpen}
                    closeTimeoutMS={500}
                    contentLabel="modalB"
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.toggleModal}
                    aria={{
                        labelledby: "heading",
                        describedby: "fulldescription"
                    }}
                    style={customStyles}

                >
                    <AddNote 
                        addNote={this.addNote} 
                        cancelNote={this.cancelNote} 
                        index={this.state.seletedIndex} 
                        updateList={this.updateList}
                        text={seletedIndex===-1? "": this.state.noteList[seletedIndex].text}
                        deleteNote = {this.deleteNote}
                    />
                </Modal>
                {this.state.noteList.length===0? <div className="instruction" >Please press + button add notes </div> : <NoteList noteList={this.state.noteList} editNote = {this.editNote} />}
                
            </div>
        );
    }

}

export default App;