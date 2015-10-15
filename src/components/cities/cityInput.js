'use strict';

var React = require('react');

var CityInput= React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            value: ''
        };
    },
    render: function () {

        return (
            <form className='row city-input'>
                <div className='eight columns'>
                    <input
                        className='u-full-width'
                        type='text'
                        placeholder='Enter city name'
                        value={this.state.value}
                        onChange={this.handleChange} />
                </div>
                <div className='four columns'>
                    <input
                        className='button button-primary'
                        type='submit'
                        value='Add city'
                        onClick={this.handleClick}>
                    </input>
                </div>
            </form>);
    },
    handleChange: function (event) {
        this.setState({
            value: event.target.value
        });
    },
    handleClick: function (event) {
        event.preventDefault();
        this.props.onClick(this.state.value);
        this.setState({
            value: ''
        });
    }
});

module.exports = CityInput;
