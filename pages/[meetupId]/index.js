import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetails from "@/components/meetups/MeetupDetails";

const MeetupDetailsPage = ({ meetupData }) => {
  return (
    <MeetupDetails
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://faizansiddiqui:Bismillah@mycluster.zsttz8l.mongodb.net/meetups?retryWrites=true&w=majority&appName=mycluster"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const objectMeetupId = new ObjectId(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://faizansiddiqui:Bismillah@mycluster.zsttz8l.mongodb.net/meetups?retryWrites=true&w=majority&appName=mycluster"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const selectedMeetups = await meetupCollections.findOne({
    _id: objectMeetupId,
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        image: selectedMeetups.image,
        address: selectedMeetups.address,
        description: selectedMeetups.description,
      },
    },
  };
}

export default MeetupDetailsPage;
