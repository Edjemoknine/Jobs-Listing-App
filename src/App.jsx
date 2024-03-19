import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import Layout from "./pages/Layout";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJob";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";

const addJob = async (newJob) => {
  await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });
  return;
};

// Delete Job
const deleteJob = async (id) => {
  await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
  });
  return;
};

// Update Job
const updateJob = async (job) => {
  await fetch(`/api/jobs/${job.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  return;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route
        path="/jobs/:id"
        element={<JobPage deleteJob={deleteJob} />}
        loader={jobLoader}
      />
      <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
      <Route
        path="/edit-job/:id"
        element={<EditJobPage updateJobSubmit={updateJob} />}
        loader={jobLoader}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
