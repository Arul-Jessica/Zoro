import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

const requestPage = () => {
  return (
    <div>
      requestPage
      <Button>
        <Link href="../request">Requests</Link>
      </Button>
    </div>
  );
};

export default requestPage;
