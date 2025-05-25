"use client";
import React, { useActionState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { login } from "@/utils/api/Auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [state, action, isPending] = useActionState(login, {
    error: "",
    accessToken: "",
    message: "",
    role: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (state?.accessToken) {
      toast.success(state.message);
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("role", state.role);
      console.log(state.role);
      if (state.role === "admin") {
        router.replace("/dashboard/admin");
        return;
      }
      router.replace("/dashboard/user");
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state.accessToken, state.message, state.error, router]);
  return (
    <div className="space-y-3">
      <h1 className="font-semibold text-lg">
        Login{" "}
        <span className="text-slate-300">
          (akun admin, username: admin, password: password)
        </span>
      </h1>
      <form action={action} className="space-y-4 ">
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">password</Label>
          <Input
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
        </div>
        <div className="flex flex-col">
          <Button disabled={isPending}>
            {isPending ? "Loading ..." : "Login"}
          </Button>
          <Link href="/register" className="font-semibold">
            Not have an account yet?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
