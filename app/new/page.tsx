"use client";

import { createWorkspace } from "@/actions/workspace/create-workspace";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createWorkspaceSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("workspace") as string,
    };

    const validatedField = createWorkspaceSchema.safeParse(data);
    if (!validatedField.success) {
      toast.error(validatedField.error.errors[0].message);
      return;
    }

    const res = await createWorkspace(data);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);
      router.replace("/workspace");
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create your first workspace</CardTitle>
            <CardDescription>Enter a title for your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Input
                  id="workspace"
                  name="workspace"
                  placeholder="To-do"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Create
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
