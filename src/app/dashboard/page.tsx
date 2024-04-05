"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { MultiSelect } from "~/components/ui/MultiSelect";

import { Form } from "~/components/ui/form";
// import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

const dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const getprojects = api.project.list.useQuery();
  // const techStacks = api.techstack.list.useQuery();
  console.log(getprojects);
  if (!session.data?.user) {
    router.push("/login");
    toast.error("Please login to continue");
  }
  return (
    <div>
      dashboard
      <h1>{session.data?.user.name} Welcome</h1>
      {/* <Button>Feed</Button>
      <Button>Projects</Button> */}
      {/* <Button>
        <Link href="/allprojects">others</Link>
      </Button> */}
      <div className="">
        <table className="min-w-full justify-center border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Project Title</th>
              <th className="px-4 py-2">Project Description</th>
              <th className="px-4 py-2">Git Link</th>
              <th className="px-4 py-2">Domain</th>
              <th className="px-4 py-2">TechStacks</th>
            </tr>
          </thead>
          <tbody>
            {getprojects?.data?.projects.map((project) => (
              <tr key={project.id} className="border-t border-gray-300">
                <td className="px-4 py-2">{project.id}</td>
                <td className="px-4 py-2">{project.title}</td>
                <td className="px-4 py-2">{project.description}</td>
                <td className="px-4 py-2">{project.gitl}</td>
                <td className="px-4 py-2">{project.domain}</td>
                <td className="px-4 py-2">
                  {project.TechStacks?.map((techStack) => (
                    <span key={techStack.projectId}>{techStack.name}</span>
                  ))}
                </td>

                <td className="px-4 py-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <br></br>
        <Button>
          <Link href="../collaboration/post">Post a collaboration</Link>
        </Button>
        <Button>
          <Link href="../collaboration/check">Check for collaboration</Link>
        </Button>
        <Button>
          <Link href="../collaboration/request">Request status</Link>
        </Button>
        <Button>
          <Link href="../collaboration/sent request">Your Requests</Link>
        </Button>
      </div>
    </div>
  );
};

export default dashboard;

{
  /* <table className="min-w-full border border-gray-300 bg-white">
  <thead>
    <tr className="bg-gray-100">
      <th className="px-4 py-2">ID</th>
      <th className="px-4 py-2">Roll No</th>
      <th className="px-4 py-2">Name</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Department</th>
      <th className="px-4 py-2">Created At</th>
      <th className="px-4 py-2">Updated At</th>
    </tr>
  </thead>
  <tbody>
    {studentsData?.data?.map((student) => (
      <tr key={student.id} className="border-t border-gray-300">
        <td className="px-4 py-2">{student.id}</td>
        <td className="px-4 py-2">{student.rollno || "N/A"}</td>
        <td className="px-4 py-2">{student.name}</td>
        <td className="px-4 py-2">{student.email}</td>
        <td className="px-4 py-2">{student.department}</td>
        <td className="px-4 py-2">
          {" "}
          {new Date(student.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: false,
          })}
        </td>
        <td className="px-4 py-2">
          {" "}
          {new Date(student.updatedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: false,
          })}
        </td>
        <td className="px-4 py-2">
          <button
            className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-700"
            onClick={() => {
              router.push("/student/edit/" + student.id);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </td>

        <td className="px-4 py-2">
          <button
            className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-700"
            onClick={() => {
              deleteStudent.mutate({ id: student.id });
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>; */
}
