"use client";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import { useEffect, useState, useContext } from "react";

import dynamic from "next/dynamic";
import ThreadsList from "../../(JobSeekerModel)/messages/components/ThreadsList";

const ChatWindow = dynamic(
  () => import("../../(JobSeekerModel)/messages/components/ChatWindow"),
);

function Messages() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الرسائل");
    setnumberOfSideBar(6);
  }, [setnameOfSideBar, setnumberOfSideBar]);

  const [activeId, setActiveId] = useState("t1");

  const threads = [
    {
      id: "t1",
      time: "10:30 AM",
      company: "Google",
      name: "Sarah - Google Recruiter",
      role: "Senior Software Engineer",
      preview: "ke to schedule an interview",
      unread: 2,
      avatar: "S",
    },
    {
      id: "t2",
      time: "Yesterday",
      company: "Microsoft",
      name: "Ahmed - Microsoft",
      role: "UI/UX Designer",
      preview: "Thank you for your application",
      unread: 0,
      avatar: "A",
    },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      side: "other",
      text: "Hi Ahmed, thank you for applying!",
      time: "10:20 AM",
    },
    {
      id: 2,
      side: "me",
      text: "Thank you for the opportunity!",
      time: "10:25 AM",
    },
    {
      id: 3,
      side: "other",
      text: "We would like to schedule an interview",
      time: "10:30 AM",
    },
  ]);

  return (
    <div className="flex gap-2 mb-40">
      <div className="hidden md:block">
        <ThreadsList
          threads={threads}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
      <div>
        <ChatWindow
          header={{
            title: "Sarah - Google Recruiter",
            subtitle: "Senior Software Engineer",
            avatar: "S",
          }}
          messages={messages}
          aiSuggestion={{
            text: 'يمكنك الرد: "شكرًا، أنا متحمس لفرصة المقابلة. متى يناسبكم الوقت؟"',
            actionText: "استخدام هذا الرد",
            onUse: () =>
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  side: "me",
                  text: "شكرًا، أنا متحمس لفرصة المقابلة. متى يناسبكم الوقت؟",
                  time: "Now",
                },
              ]),
          }}
          onSend={(text) =>
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), side: "me", text, time: "Now" },
            ])
          }
        />
      </div>
    </div>
  );
}

export default Messages;
