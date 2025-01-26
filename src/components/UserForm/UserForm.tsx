import {useState} from "react";


const UserForm = () => {
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('');

    const url = 'http://146.185.154.90:8000/messages';
    const data = new URLSearchParams();

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message) {

            data.set('message', message);
            data.set('author', author);

            const response = await fetch(url, {
                method: 'POST',
                body: data,
            })
            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }
            setMessage("");
            setAuthor("");
        }
    };



    return (
        <form className='d-flex flex-column mt-3' style={{width: '600px'}} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="authorInput" className="form-label">Author:</label>
                <input type="text"
                       className="form-control"
                       id="authorInput"
                       value={author}
                       onChange={handleAuthorChange}
                />
            </div>
            <div className="form-floating">
                <textarea className="form-control"
                          placeholder="Leave a comment here"
                          id="message"
                          style={{height: "100px"}}
                          value={message}
                          onChange={handleChange}
                ></textarea>
                <label htmlFor="message">Message</label>
            </div>
            <button type='submit' className='btn btn-primary mt-3'>Send</button>
        </form>
    );
};

export default UserForm;