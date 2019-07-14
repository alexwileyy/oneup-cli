// Import Core React Library
import React, { Component } from 'react';

// Import Redux, Actions and Store
import {bindActionCreators} from "redux";
import { connect } from 'react-redux'
import * as Actions from '../../../../redux/actions/EXAMPLE';

// Import helpers

// Import Components

// Import third-party modules
import PropTypes from 'prop-types';

// Import styles
import Styles from './example.module.scss';

class Alex extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Update the persons name
     * @param _
     */
    updateName = _ => {
        this.props.updateName()
    };

    render() {

        const { example } = this.props;

        //TODO: Refactor to use fragments
        return (
            <div>
                <p>This is an example of a class stateful component</p>
                <p>My name is {example.name}</p>
                <button onClick={this.updateName}>Update Name</button>
            </div>
        )
    }

}

/**
 * Prop Types for Example component
 * @type {{}}
 */
Alex.propTypes = {

};

/**
 * This function maps the state to a
 * prop called 'state'.
 *
 * In larger apps it is often good
 * to be more selective and only
 * map the part of the state tree
 * that is necessary.
 */
const mapStateToProps = state => {
    return {
        example: state.example
    }
};

/**
 * This function maps actions to props
 * and binds them so they can be called
 * directly.
 *
 * In this case all actions are mapped
 * to the 'actions' prop.
 */
const mapDispatchToProps = dispatch => (bindActionCreators(Actions, dispatch));

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alex);