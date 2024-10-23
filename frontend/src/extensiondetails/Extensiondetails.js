import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExtensionDetails() {
    const [customFields, setCustomFields] = useState([{ label: '', value: '' }]);


    const handleAddField = () => {
        setCustomFields([...customFields, { label: '', value: '' }]);
    };

    const handleFieldChange = (index, e) => {
        const newFields = [...customFields];
        newFields[index].label = e.target.value;
        setCustomFields(newFields);
    };

    const handleValueChange = (index, e) => {
        const newFields = [...customFields];
        newFields[index].value = e.target.value;
        setCustomFields(newFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(customFields)
        // Handle form submission logic here
        axios
				.post(
					'http://localhost:5001/profile',
					{
            extensionDetails:customFields
					},
					{
						headers: {
							userid: localStorage.getItem('userId'),
							Authorization: `Bearer ${localStorage.getItem('userId')}`
						}
					}
				)
				.catch((err) => {
					console.log(err.message);
				});

    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            {customFields.map((field, index) => (
                <div key={index}>
                    <label>Custom Field Label:</label>
                    <input 
                        type="text" 
                        value={field.label} 
                        onChange={(e) => handleFieldChange(index, e)} 
                        style={inputStyle}
                    />
                    <label>Custom Field Value:</label>
                    <input 
                        type="text" 
                        value={field.value} 
                        onChange={(e) => handleValueChange(index, e)} 
                        style={inputStyle}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddField} style={buttonStyle}>Add Custom Field</button>
            <br></br>
            <button type="submit" style={buttonStyle}>Submit</button>
        </form>
    );
}

export default ExtensionDetails;
