import React, {Component } from 'react';
import './AddNote.css';
class SearchBox extends Component {

    state = {
        text: "",
    };

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
        this.timeOut =  null;
    }
    

    onChange = (e) => {
        this.setState({ text: e.target.value },
            this.debounce()
        )
    }

    debounce = () => {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            this.props.searchFire(this.state.text);
        }, 1000);

    }
    render() {
        return (
            <div>
                <form onSubmit= {(event) => event.preventDefault()}>
                    <input className="searchInput"
                        type ="text"
                        value = {this.state.text}
                        placeholder = "Search"
                        onChange={(e) => this.onChange(e)}
                    />
                </form>
            </div>
        );
    }
}

export default SearchBox;