import { verifyEmail } from "@/actions/verify-email";
import { Card } from "@/components/auth/card";
import { ErrorCard } from "@/components/auth/error-card";
import Header from "@/components/auth/header";
import SuccessCard from "@/components/auth/success-card";
import { use, useEffect, useState } from "react";

interface PageProps {
  searchParams: Promise<{
    token: string;
  }>;
}

export default function Page({ searchParams }: PageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = use(searchParams);

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      if (!token) {
        setError("missing token");
        setLoading(false);
        return;
      }
      const res = await verifyEmail(token);
      setLoading(false);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(res.success);
      }
    };
    verify();
  }, [token]);
  return (
    <Card>
      <div className="flex flex-col items-center space-y-6">
        <Header label="Confirming your verification" />
        {loading && <p>loading</p>}
        {error && <ErrorCard message={error} />}
        {success && <SuccessCard message={success} />}
        <a href="/auth/login" className="hover:underline font-normal text-xs">
          Back to login
        </a>
      </div>
    </Card>
  );
}
