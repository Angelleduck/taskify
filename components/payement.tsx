"use client";

import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getUser } from "@/actions/getUser";

export function ButtonPayment() {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT!,
    }).then((paddle) => setPaddle(paddle));
  }, []);

  const handleCheckout = async () => {
    const session = await getUser();
    if (!session) {
      return;
    }
    if (!paddle) return alert("something went wrong please refresh");

    paddle.Checkout.open({
      items: [{ priceId: "pri_01k9wg68r41t96nrgxn4srd4cb", quantity: 1 }],
      settings: {
        displayMode: "overlay",
        variant: "one-page",
        theme: "dark",
        successUrl: process.env.APP_URL,
      },
      customData: {
        userId: session.user.id,
      },
    });
  };

  return (
    <Button className="w-full h-10" onClick={handleCheckout}>
      upgrade
    </Button>
  );
}
