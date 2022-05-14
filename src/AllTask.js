import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export function AllTask({ task, toggleTask, removeTaskAll }) {
  return (
    <div className="task">
      {task.map((task, index) => (
        // <AllTask task={task.text} index={index} setTask={setTask} />
        <div>
          <span className={task.isCompleted ? " completed-task" : "task-name"}>
            <Checkbox checked={task.isCompleted ? true : false} onClick={() => toggleTask(index)} />
            {task.task}
          </span>
          <HighlightOffIcon className="clearIcon" onClick={() => removeTaskAll(index)} />
        </div>
      ))}
    </div>
  );
}
