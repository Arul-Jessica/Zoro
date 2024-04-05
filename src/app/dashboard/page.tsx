"use client";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
// import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
const dashboard = () => {
  return (
    <div>
      dashboard
      <h1>Alamelu Welcome !</h1>
      {/* <Button>Feed</Button>
      <Button>Projects</Button> */}
      {/* <Button>
        <Link href="/allprojects">others</Link>
      </Button> */}
      <div className="flex items-center justify-center gap-9 space-x-5 font-bold ">
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
