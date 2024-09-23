// app/page.tsx
import { addTask } from "@actions/actions";
import prisma from "@utils/db";


export default async function Home() {
  const tasks = await prisma.task.findMany();
  return (
    <>
      <main className="bg-zinc-200 flex min-h-screen flex-col items-center pt-10">
        <h1 className="text-3xl font-medium">All tasks :</h1>
        <ul className="my-10 text-center">
          {tasks.map((task) => (
            <li key={task.id}> {task.title}</li>
          ))}
        </ul>

        <form action={addTask} className="space-x-2 h-4">
          <input type="text" name="title" className="px-2 py-1 rounded" />
          <button
            type="submit"
            className="bg-blue-500 px-3 py-1 text-white rounded"
          >
            Add Task
          </button>
        </form>
      </main>
    </>
  );
};


