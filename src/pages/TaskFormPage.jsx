import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function TaskFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (params.id) {
                await updateTask(params.id, data);
                toast.success("Tarea Actualizada", {
                    position: "bottom-right",
                    style: {
                        background: "#101010",  
                        color: "#fff"
                    }
                });
            } else {
                await createTask(data);
                toast.success("Tarea Creada", {
                    position: "bottom-right",
                    style: {
                        background: "#101010", 
                        color: "#fff"
                    }
                });

            }
            navigate('/tasks'); 
        } catch (error) {
            console.error('Error saving task:', error);
        }
    });

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                try {
                    const res = await getTask(params.id);
                    console.log(res.data); 
                    setValue('title', res.data.title);
                    setValue('description', res.data.description);
                } catch (error) {
                    console.error('Error fetching task:', error);
                }
            }
        }
        loadTask();
    }, [params.id, setValue]);

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.title && <span>Title is Required</span>}
                <textarea
                    rows="3"
                    placeholder="Description"
                    {...register("description", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.description && <span>Description is Required</span>}
                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
            </form>
            {params.id && (
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('Are you sure?');
                            if (accepted) {
                                try {
                                    await deleteTask(params.id);
                                    toast.success("Tarea Eliminada", {
                                        position: "bottom-right",
                                        style: {
                                            background: "#101010",  
                                            color: "#fff"
                                        }
                                    });
                                    navigate('/tasks');
                                } catch (error) {
                                    console.error('Error deleting task:', error);
                                }
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default TaskFormPage;
