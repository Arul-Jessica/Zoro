"use client";
import Link from "next/link";
import React from "react";
import { api } from "~/trpc/react";

const MyRequestPage = () => {
  const getRequests = api.request.list.useQuery();
  return (
    <div>
      Requests I sent - and their status
      <table className="min-w-full justify-center border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Project Request came for</th>
            <th className="px-4 py-2">User who requested</th>
          </tr>
        </thead>
        <tbody>
          {getRequests?.data?.requests.map((request) => (
            <tr key={request.id} className="border-t border-gray-300">
              <td className="px-4 py-2">{request.id}</td>
              <td className="px-4 py-2">{request.projectId}</td>
              <td className="px-4 py-2">{request.userId}</td>
              <td className="px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>
    </div>
  );
};

export default MyRequestPage;
