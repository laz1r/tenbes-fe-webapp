import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Input = ({ onSendMessage }) => {
    const [text, setText] = useState("")

    let onChange = (e) => {
        setText(e.target.value)
    }

    let onSubmit = () => {
        setText("")
        onSendMessage(text);
    }

    return (
        <div className="message-input">
            <TextField
                className="inputField"               
                placeholder="Enter your message and press ENTER"
                onChange={e => onChange(e)}
                margin="none"
                variant="outlined"
                value={text}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        onSubmit(text);
                    }
                }}                
                style={{ height: "0px", width: "0%" }} // 30px, 80%
            />

            <Button size="small" variant="contained" color="primary" onClick={onSubmit}>
                Send
            </Button>
        </div>
    );
}


export default Input;