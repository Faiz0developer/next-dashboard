import { Fragment } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "@/components/meetups/MeetupList";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Next Meetup</title>
        <meta
          name="description"
          content="Browse a huge list of highly active next meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getServerSideProps() {
  // fetch data from API or database or read file
  const client = await MongoClient.connect(
    "mongodb+srv://faizansiddiqui:Bismillah@mycluster.zsttz8l.mongodb.net/meetups?retryWrites=true&w=majority&appName=mycluster"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

// export async function getStaticProps() {
//   // fetch data from API or database or read file
//   const client = await MongoClient.connect(
//     "mongodb+srv://faizansiddiqui:Bismillah@mycluster.zsttz8l.mongodb.net/meetups?retryWrites=true&w=majority&appName=mycluster"
//   );
//   const db = client.db();

//   const meetupCollections = db.collection("meetups");

//   const meetups = await meetupCollections.find().toArray();

//   client.close();

//   return {
//     props: {
//       meetups: meetups.map((meetup) => ({
//         title: meetup.title,
//         address: meetup.address,
//         image: meetup.image,
//         id: meetup._id.toString(),
//       })),
//     },
//     revalidate: 1,
//   };
// }

// export async function getServerSideProps(context) {
// const res = context.res;
// const req = context.req;

// fetch data from API or database or read file
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default Home;
