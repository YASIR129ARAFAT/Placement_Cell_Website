import React from "react";
import MessageCard from "../components/MessageCard";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";

function OpeningsPage({ className = "" }) {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("rjegbhr");
  };
  const handleClick2 = (e) => {
    console.log("hiththjt");
  };

  const annc = [
    //from db
    {
      username: "Yasir Arafat",
      isAdmin: 1,
      time: "6:40 pm",
      date: "6 Jan 2014",
      company: "Example Company",
      duration: "3 months",
      branches: "Computer Science, Electrical Engineering",
      stipend: "$1000 per month",
      location: "Example City",
      formlink: "/example-form-link",
      deadline: "2024-02-15",
    },
    {
      username: "John Doe",
      isAdmin: 0,
      time: "9:15 am",
      date: "10 Feb 2014",
      company: "Tech Innovations",
      duration: "6 months",
      branches: "Information Technology",
      stipend: "$1200 per month",
      location: "Tech City",
      formlink: "/tech-form-link",
      deadline: "2024-03-20",
    },
    {
      username: "Jane Smith",
      isAdmin: 1,
      time: "2:30 pm",
      date: "15 Mar 2014",
      company: "Innovative Solutions",
      duration: "4 months",
      branches: "Computer Science",
      stipend: "$1100 per month",
      location: "Innovation Town",
      formlink: "/innovative-form-link",
      deadline: "2024-04-10",
    },
    {
      username: "Samuel Johnson",
      isAdmin: 0,
      time: "7:45 pm",
      date: "20 Apr 2014",
      company: "Digital Creations",
      duration: "5 months",
      branches: "Computer Science, Electrical Engineering",
      stipend: "$1300 per month",
      location: "Digital City",
      formlink: "/digital-form-link",
      deadline: "2024-05-15",
    },
    {
      username: "Emily Brown",
      isAdmin: 1,
      time: "11:00 am",
      date: "25 May 2014",
      company: "Tech World",
      duration: "2 months",
      branches: "Information Technology",
      stipend: "$1000 per month",
      location: "Tech Central",
      formlink: "/tech-world-form-link",
      deadline: "2024-06-05",
    },
  ];

  return (
    <>
      <Sidebar>
        <div className={`h-full mt-20 w-[70%] rounded-lg p-4`}>
          {annc.map((pp) => {
            pp.isResultsAnnouncement = 0;
            return (
              <MessageCard key={pp.username} obj={pp} className="w-full">
                <Button className="mt-4" onClick={handleClick}>
                  Comment
                </Button>
              </MessageCard>
            );
          })}
        </div>
      </Sidebar>
      <div className="sticky bottom-0 bg-blue-50 left-0 w-full flex justify-center pb-4 border border-t-2 border-blue-700 ">
          <Button onClick={handleClick2} className="mt-4 w-[60%]">Announce new opening</Button>
      </div>
    </>
  );
}

export default OpeningsPage;
