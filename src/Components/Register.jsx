"use client";
import React, { useActionState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { register } from "@/utils/api/Auth";

const Register = () => {
  const [state, action, isPending] = useActionState(register, {
    message: "",
    error: "",
  });
  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.message, state?.error]);
  return (
    <div className="space-y-3">
      <h1 className="font-semibold text-lg">Registrasi</h1>
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
            {isPending ? "Loading ..." : "Register"}
          </Button>
          <Link href="/login" className="font-semibold">
            already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
