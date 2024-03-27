import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NewMeetupPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    setLoading(true);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    const data = await response.json();

    router.push("/");
  };

  return (
    <>
      <NewMeetupForm onAddMeetup={addMeetupHandler} loading={loading} />
    </>
  );
};

export default NewMeetupPage;
