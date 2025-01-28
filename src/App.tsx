import './App.css'
import UserForm from "./components/UserForm/UserForm.tsx";
import UserMessage from "./components/UserMessage/UserMessage.tsx";

const App = () => {
    return (
        <div className='container'>
            <div className='chat' style={{width: '600px'}}>
                <UserForm></UserForm>
                <hr/>
                <UserMessage></UserMessage>
            </div>
        </div>

    )
};

export default App
