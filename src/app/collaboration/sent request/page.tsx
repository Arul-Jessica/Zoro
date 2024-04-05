import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

const MyRequestPage = () => {
  return (
    <div>
      Requests I sent - and their status
      <Button>
        <Link href="../request">Requests</Link>
      </Button>
    </div>
  );
};

export default MyRequestPage;
