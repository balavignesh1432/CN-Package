//Components
import Todo from '../components/Todo';
import Doing from '../components/Doing';
import Done from '../components/Done';

function BoardPage(){
    
    return(
        <div className="boardLists">
            <Todo />
            <Doing />
            <Done />
            {/* <Chatroom/> */}
        </div>
    )
}

export default BoardPage;