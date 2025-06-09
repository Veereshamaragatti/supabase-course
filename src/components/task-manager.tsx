import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import { Session } from "@supabase/supabase-js";
import "./task.css";

interface Task {
  id: number;
  title: string;
  description?: string | null;
  created_at: string;
  image_url?: string | null;
  email: string;
}

function TaskManager({ session }: { session: Session }) {
  const [newTask, setNewTask] = useState({ title: "" });
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .eq("email", session.user.email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error reading tasks: ", error.message);
      return;
    }

    setTasks(data || []);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const { error, data } = await supabase
      .from("tasks")
      .insert({ title: newTask.title.trim(), email: session.user.email })
      .select()
      .single();

    if (error) return;

    setTasks(prev => [data, ...prev]);
    setNewTask({ title: "" });
  };

  const deleteTask = async (id: number) => {
    await supabase.from("tasks").delete().eq("id", id).eq("email", session.user.email);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <span className="task-title">{task.title}</span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">🗑</button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="new-task-form">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTask.title}
          onChange={(e) => setNewTask({ title: e.target.value })}
          className="new-task-input"
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default TaskManager;
