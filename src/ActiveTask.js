import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export function ActiveTask({ taskActive, toggleTask, removeTaskActive }) {
  return (
    <div>
      {taskActive.map((task, index) => (
        // <AllTask task={task.text} index={index} setTask={setTask} />
        <div>
          <span className={task.isCompleted ? "completed-task" : "task-name"}>
            <Checkbox checked={task.isCompleted ? true : false} onClick={() => toggleTask(index)} />
            {task.text}
          </span>
          <HighlightOffIcon className="clearIcon" onClick={() => removeTaskActive(index)} />
        </div>
      ))}
    </div>
  );
}
