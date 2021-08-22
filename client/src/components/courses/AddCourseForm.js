import React, { Component, useCallback } from 'react';

class AddCourseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                name: '',
            },
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onInputChange(event) {
        const fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    }

    handleSubmit(event) {
        this.props.addCourse({ name: this.state.fields.name });
        this.setState({
            fields: {
                name: '',
            },
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Name:
                    <br />
                    <input
                        className="add-course-input"
                        onChange={this.onInputChange}
                        placeholder="Enter name"
                        name="name"
                        value={this.state.fields.name}
                        type="text"
                    />
                    <input
                        className="add-course"
                        type="submit"
                        value="Add Course"
                    />
                </form>
            </div>
        );
    }
}

export default AddCourseForm;
