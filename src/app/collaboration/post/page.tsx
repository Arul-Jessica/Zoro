"use client";
import { api } from "~/trpc/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
function PostNewProject() {
  const session = useSession();
  console.log(session);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTechStacks, setSelectedTechStacks] = useState<number[]>([]);
  const [gitl, setGit] = useState("");
  const [domain, setDomain] = useState("");
  const [techStacks, setTechStacks] = useState([""]);
  const projectMutation = api.project.create.useMutation();
  const router = useRouter();
  const getTechStacks = api.techstack.list.useQuery();
  console.log(getTechStacks);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const techStacks: string[] = [];

    const project = await projectMutation.mutateAsync({
      title,
      description,
      gitl,
      domain,
      techStacks: selectedTechStacks,
    });
    if (project.success) {
      toast.success("Project posted successfully.");
      router.push("/dashboard");
    } else {
      toast.error(project?.message ?? "Something went wrong.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-md bg-white p-6 shadow-md">
        <h2 className="text-center text-lg font-semibold text-gray-700">
          Post Project
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <label htmlFor="title" className="block">
            <span className="text-gray-700">Title</span>
            <input
              type="name"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
                focus:border-indigo-500 focus:outline-none"
              placeholder="Your Project Title"
              required
            />
          </label>

          <label htmlFor="description" className="block">
            <span className="text-gray-700">Project Description</span>
            <input
              type="name"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
                focus:border-indigo-500 focus:outline-none"
              placeholder="Project Aim , Solution , Scope"
              required
            />
          </label>
          <label htmlFor="gitl" className="block">
            <span className="text-gray-700">Enter your project's Git link</span>
            <input
              type="url"
              id="gitl"
              value={gitl}
              onChange={(e) => setGit(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
                focus:border-indigo-500 focus:outline-none"
              placeholder="Project's Git Link"
              required
            />
          </label>
          <label htmlFor="domain" className="block">
            <span className="text-gray-700">Domain</span>
            <input
              type="domain"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
                focus:border-indigo-500 focus:outline-none"
              placeholder="Domain of the Project"
              required
            />
          </label>
          <label htmlFor="techStacks" className="block">
            <span className="text-gray-700">Tech Stacks</span>
            <select
              id="techStacks"
              onChange={(e) =>
                setSelectedTechStacks(
                  Array.from(e.target.selectedOptions, (option) =>
                    parseInt(option.value),
                  ),
                )
              }
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm
                focus:border-indigo-500 focus:outline-none"
              multiple
              required
            >
              {getTechStacks.data?.techstacks.map((techstack) => (
                <option key={techstack.id} value={techstack.id}>
                  {techstack.name}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full transform rounded-md bg-indigo-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
            >
              Post Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostNewProject;
