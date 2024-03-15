"use client";
import React, { useState } from "react";


const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    regno: "",
    email: "",
    password: "",
    department: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


}
export default Page;
