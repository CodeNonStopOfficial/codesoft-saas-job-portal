import {signIn } from "@/app/utils/auth";
import { Github, Google } from "@/components/shared/ButtonIcons";
import { GeneralSubmitButton } from "@/components/shared/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



export async function LoginForm() {

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <form
                action={async () => {
                  "use server";
                  await signIn("github", {
                    redirectTo: "/onboading",
                  });
                }}
              >
                <GeneralSubmitButton
                  text="Login with GitHub"
                  icon={<Github />}
                  variant="outline"
                  classname="w-full px-4 py-4.5 items-center justify-center"
                />
              </form>
              <form
                action={async () => {
                  "use server";
                  await signIn("google", {
                    redirectTo: "/onboading",
                  });
                }}
              >
                <GeneralSubmitButton
                  text="Login with Google"
                  icon={<Google />}
                  variant="outline"
                  classname="w-full px-4 py-4.5 items-center justify-center"
                />
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
