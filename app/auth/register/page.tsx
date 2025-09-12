"use client";

import GoogleIcon from "@/components/icons/google-icon";
import Link from "next/link";

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { registerSchema } from "@/schemas";
import { Input } from "@/components/auth/input";
import { register as signUp } from "@/actions/register";
import { useState } from "react";
import SuccessCard from "@/components/auth/success-card";
import { ErrorCard } from "@/components/auth/error-card";
import { GithubButton } from "@/components/auth/github-button";
import ButtonSubmit from "@/components/auth/submit-button";
import { Card } from "@/components/auth/card";
import Logo from "@/components/logo";

type InputField = z.infer<typeof registerSchema>;

export default function Page() {
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InputField>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<InputField> = async (data) => {
    try {
      setSuccess("");
      const res = await signUp(data);

      if (res?.error) {
        setError("root", {
          message: res.error,
        });
      } else if (res?.success) {
        setSuccess(res.success);
      }
    } catch {
      setError("root", {
        message: "Sorry, something went wrong",
      });
    }
  };

  return (
    <Card>
      <Logo />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="name">Name</label>

          <Input
            register={register}
            id="name"
            type="text"
            placeholder="Simon Doe"
          />
          {errors.name && <ErrorCard message={errors.name.message} />}
        </div>
        <div className="space-y-1">
          <label htmlFor="email">Email</label>

          <Input
            register={register}
            id="email"
            type="email"
            placeholder="jhon.doe@example"
          />
          {errors.email && <ErrorCard message={errors.email.message} />}
        </div>
        <div className="space-y-1">
          <label htmlFor="password">Password</label>

          <Input
            register={register}
            id="password"
            type="password"
            placeholder="********"
          />
          {errors.password && <ErrorCard message={errors.password.message} />}
        </div>
        <div className="space-y-1">
          <label htmlFor="confirmPassword">Confirm password</label>

          <Input
            register={register}
            id="confirmPassword"
            type="password"
            placeholder="********"
          />
          {errors.confirmPassword && (
            <ErrorCard message={errors.confirmPassword.message} />
          )}
        </div>

        <ButtonSubmit
          isSubmitting={isSubmitting}
          label="Create account"
          loadingLabel="Creating account..."
        />

        {errors.root && <ErrorCard message={errors.root.message} />}
        {success && <SuccessCard message={success} />}
      </form>

      <div className="flex gap-2">
        <button
          type="button"
          className="flex flex-1 border rounded-md items-center justify-center py-2 hover:bg-black/5 transition"
        >
          <GoogleIcon className="h-5 w-5" />
        </button>
        <GithubButton />
      </div>

      <div className="flex justify-center">
        <Link
          href="/auth/login"
          className="text-sm font-light hover:underline text-center text-neutral-800 hover:text-black"
        >
          Already have an account?
        </Link>
      </div>
    </Card>
  );
}
