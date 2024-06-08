import { useState , useEffect} from "react";
interface Task{
    id:number,
    text:string,
    completed:boolean
}
function TodoList(){
    const[tasks, setTasks] = useState<Task[]>([]);
    const [text, setText] = useState('');
    const [id, setId] = useState(1);

    const addTask=(text:string)=>{
        const newTask={
            id:id,
            text:text,
            completed:false,
        }
        setTasks(tasks=>[...tasks, newTask]);
        setText("");
        setId(id=>id+1)
    }

    const deleteTask=(id:number)=>{
        setTasks(tasks.filter(task=> task.id !==id))
    }

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (storedTasks.length > 0) {
            setTasks(storedTasks);
            setId(storedTasks[storedTasks.length - 1].id + 1);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    return (
        <>
            <div className="todo-list">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={() => addTask(text)}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default TodoList;