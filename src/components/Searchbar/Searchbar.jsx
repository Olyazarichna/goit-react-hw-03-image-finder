import { React, Component } from 'react';

export class Searchbar extends Component {
    state = {
        searchValue: '',
    }
    handleSubmit=(event)=>{
        console.log(event);
        event.preventDefault();
        console.log(this.props)
    }
    handleChange=(event)=>{
        const {name, value} = event.currentTarget;
        this.setState({[name]: value})
    }
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchValue"
            value={this.state.searchValue}
           onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
