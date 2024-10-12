'use client';

import { usePointsStore } from "@/store/PointsStore";
import React, { useEffect, useCallback, useState } from "react";
import { useBoostersStore } from "@/store/boostersStore"; // Corrected import path
import SectionBanner from "@/components/sectionBanner";
import CurrentPoints from "@/components/tasks/CurrentPoints";
import * as button from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Removed unused imports
import { faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";

interface TaskItemProps {
  icon: JSX.Element;
  title: string;
  buttonText: string;
  link?: string;
  isCompleted: boolean;
  onClick?: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ icon, title, buttonText, link, isCompleted, onClick }) => {
  if (isCompleted) return null;

  return (
    <div className="flex justify-between items-center p-2 rounded-lg border border-[#504949]">
      <div className="flex items-center gap-4">
        {icon}
        <span className="text-white text-xs">{title}</span>
      </div>
      {link ? (
        <button.Button asChild className="text-xs" onClick={onClick}>
          <a href={link} target="_blank" rel="noopener noreferrer">{buttonText}</a>
        </button.Button>
      ) : (
        <button.Button className="text-xs" onClick={onClick}>
          {buttonText}
        </button.Button>
      )}
    </div>
  );
};

const AirDrop = () => {
  const initialTasks = [
    {
      icon: <FontAwesomeIcon icon={faTelegram} className="text-blue-500" />,
      title: "Telegram Channel: Resolved Builders",
      buttonText: "Join Now",
      link: "https://t.me/ResolvedBuilders",
      isCompleted: false,
    },
    {
      icon: <FontAwesomeIcon icon={faTwitter} className="text-blue-400" />,
      title: "Twitter Community",
      buttonText: "Join Now",
      link: "https://x.com/i/communities/1844915754887790812",
      isCompleted: false,
    },
    {
      icon: <FontAwesomeIcon icon={faTelegram} className="text-purple-500" />,
      title: "Telegram Chat: Resolved Success",
      buttonText: "Join Now",
      link: "https://t.me/ResolvedSuccess",
      isCompleted: false,
    },
    {
      icon: <FontAwesomeIcon icon={faTwitter} className="text-blue-400" />,
      title: "Tweet: Support LikhonDocs",
      buttonText: "View Tweet",
      link: "https://x.com/likhondocs/status/1844934909686841464?s=46",
      isCompleted: false,
    },
    {
      icon: <FontAwesomeIcon icon={faTwitter} className="text-blue-400" />,
      title: "Founder: LikhonDocs on Twitter",
      buttonText: "Follow Founder",
      link: "https://x.com/likhondocs",
      isCompleted: false,
    },
    {
      icon: <FontAwesomeIcon icon={faTelegram} className="text-purple-500" />,
      title: "Founder Channel: Rexx Cheat",
      buttonText: "Join Channel",
      link: "https://t.me/RexxCheat",
      isCompleted: false,
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const { currentTapsLeft, increaseTapsLeft } = usePointsStore();
  const { multiClickLevel } = useBoostersStore();

  const updateTapsLeft = useCallback(() => {
    increaseTapsLeft();
    let time = Date.now();
    window.localStorage.setItem("lastLoginTime", time.toString());
    const local = parseInt(window.localStorage.getItem("currentTapsLeft") ?? "0");

    if (local < currentTapsLeft && !isNaN(currentTapsLeft)) {
      window.localStorage.setItem("currentTapsLeft", (currentTapsLeft + multiClickLevel).toString());
    }
  }, [currentTapsLeft, increaseTapsLeft, multiClickLevel]);

  useEffect(() => {
    const intervalId = setInterval(updateTapsLeft, 1000); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, [updateTapsLeft]);

  const handleTwitterTaskClick = (taskTitle: string) => {
    const username = prompt(`Please enter your Twitter username for the task: ${taskTitle}`);
    if (username) {
      // Update the database with the username and task completion status
      console.log(`Username: ${username} for task: ${taskTitle}`);
      // Add your database update logic here

      // Mark the task as completed
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.title === taskTitle ? { ...task, isCompleted: true } : task
        )
      );
    }
  };

  return (
    <div className="w-full mx-auto text-white ">
      <SectionBanner
        mainText="Get Airdrop"
        subText="Make our tasks to get more coins"
        leftIcon="/newImages/bee.png"
        rightIcon="/newImages/bee-right.png"
      />
      <CurrentPoints />
      <div className="flex flex-col gap-2 mt-3">
        {tasks
          .filter(task => !task.isCompleted)
          .map((task, index) => (
            <TaskItem
              key={index}
              icon={task.icon}
              title={task.title}
              buttonText={task.buttonText}
              link={task.link}
              isCompleted={task.isCompleted}
              onClick={task.title.includes("Twitter") ? () => handleTwitterTaskClick(task.title) : undefined}
            />
          ))}
      </div>
    </div>
  );
};

export default AirDrop;
