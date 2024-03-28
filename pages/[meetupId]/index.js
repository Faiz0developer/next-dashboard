import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetails from "@/components/meetups/MeetupDetails";

const MeetupDetailsPage = (props) => {
  return (
    <MeetupDetails
      title={props.meetupData.title}
      image={props.meetupData.image}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export async function getServerSideProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://faizansiddiqui:Bismillah@mycluster.zsttz8l.mongodb.net/meetups?retryWrites=true&w=majority&appName=mycluster"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const selectedMeetups = await meetupCollections.findOne({
    _id: new ObjectId(meetupId),
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

// export async function getStaticPaths() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://faizansiddiqui:Bismillah@mycluster.zsttz8l.mongodb.net/meetups?retryWrites=true&w=majority&appName=mycluster"
//   );
//   const db = client.db();

//   const meetupCollections = db.collection("meetups");

//   const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();

//   client.close();

//   return {
//     fallback: true,
//     paths: meetups.map((meetup) => ({
//       params: { meetupId: meetup._id.toString() },
//     })),
//   };
// }

// export async function getStaticProps(context) {
//   const meetupId = context.params.meetupId;
//   const client = await MongoClient.connect(
//     "mongodb+srv://faizansiddiqui:Bismillah@mycluster.zsttz8l.mongodb.net/meetups?retryWrites=true&w=majority&appName=mycluster"
//   );
//   const db = client.db();

//   const meetupCollections = db.collection("meetups");

//   const selectedMeetups = await meetupCollections.findOne({
//     _id: new ObjectId(meetupId),
//   });

//   client.close();

//   return {
//     props: {
//       meetupData: {
//         id: selectedMeetups._id.toString(),
//         title: selectedMeetups.title,
//         image: selectedMeetups.image,
//         address: selectedMeetups.address,
//         description: selectedMeetups.description,
//       },
//     },
//   };
// }

export default MeetupDetailsPage;
