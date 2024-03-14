
import "@radix-ui/themes/styles.css";
import { Flex, Button } from "@radix-ui/themes";
import { Theme } from "@radix-ui/themes";
import Link from "next/link";
// import { Tweet } from "react-tweet";
export default function HomePage() {
  return (
    <div>
      <p>Welcome to Zoro !</p>
      {/* <Flex direction="column" gap="2">
        <Button>Let's go</Button>
      </Flex> */}
      <br></br>
      <br></br>
      <Theme>
        <Flex direction="column" gap="2">
          <Button>
            <Link href="./login">Login</Link>
          </Button>
          <br></br>
          <Button>
            <Link href="./signup">SignUp</Link>
          </Button>
        </Flex>
        <Theme
          appearance="light"
          accentColor="iris"
          grayColor="sand"
          radius="small"
          scaling="105%"
        ></Theme>
      </Theme>
    </div>
  );
}
