import BoardList from "../components/BoardList";

function BoardPage(){
    return(
        <div className="boardLists">
            <BoardList name="To Do"/>
            <BoardList name="Doing"/>
            <BoardList name="Done" />
        </div>
    )
}

export default BoardPage;