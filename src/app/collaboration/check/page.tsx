"use client";

import { Link } from "lucide-react";
import React from "react";
import { api } from "~/trpc/react";

const CheckForCollaboration = () => {
  const getprojects = api.project.Alist.useQuery();
  return (
    <div>
      <title>Home to Collaborate</title>

      <h2>
        These projects are availale to collaborate, Go find your partner to
        collaborate
      </h2>
      {getprojects.data?.projects.map((project) => (
        <tr key={project.id} className="border-t border-gray-300">
          <td className="px-4 py-2">{project.id}</td>
          <td className="px-4 py-2">{project.title}</td>
          <td className="px-4 py-2">{project.description}</td>
          <td className="px-4 py-2">{project.gitl}</td>
          <td className="px-4 py-2">{project.domain}</td>
          <td className="px-4 py-2">
            {project.TechStacks?.map((techStack) => (
              <span key={techStack.id}>{techStack.name}</span>
            ))}
          </td>
          <td>
            <button>
              <a href="/CRequestSent">Collaborate</a>
            </button>
          </td>

          <td className="px-4 py-2"></td>
        </tr>
      ))}
    </div>
  );
};

export default CheckForCollaboration;
