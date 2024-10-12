"use client";
import { usePointsStore } from "@/store/PointsStore";
import { BeeCoin, SponsorImage, tonWallet } from "../../../public/newImages";
import Image from "next/image";
import React, { useEffect } from "react";
import { useBoostersStore } from "@/store/useBoostrsStore";
import SectionBanner from "@/components/sectionBanner";
import CurrentPoints from "@/components/tasks/CurrentPoints";
// import { Button } from "@/components/ui/button"; // Commented out to avoid duplicate definition
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from "@/components/ui/drawer";

interface TaskItemProps {
  iconSrc: string;
  title: string;
  buttonText: string;
  link?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ iconSrc, title, buttonText, link }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  return (
    <>
      <div className="flex justify-between items-center p-2 rounded-lg border border-[#504949]">
        <div className="flex items-center gap-4">
          <Image src={iconSrc} alt={title} width={20} height={20} />
          <span className="text-white text-xs">{title}</span>
        </div>
        {link ? (
          <Button as="a" href={link} target="_blank" className="text-xs">
            {buttonText}
          </Button>
        ) : (
          <Button onClick={() => setIsDrawerOpen(true)} className="text-xs">
            {buttonText}
          </Button>
        )}
      </div>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent className="bg-[#14161a] border-none ">
          <DrawerHeader
            onClick={() => setIsDrawerOpen(false)}
            className="flex text-white rounded-full justify-end  mr-0  w-full  items-center"
          >
            <div className="p-3 px-5 bg-[#252423] rounded-full">x</div>
          </DrawerHeader>
          <div className="text-center">
            <h2 className="text-2xl font-medium text-white mb-2">Coming Soon</h2>
          </div>
          <DrawerFooter>
            <Button
              className="w-full py-8 bg-custom-orange text-zinc-700 text-xl rounded-lg hover:bg-yellow-700"
            >
              {"Go ahead"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const AirDrop = () => {
  const tasks = [
    {
      iconSrc: "/icons/passive-income.png",
      title: "Passive Income",
      buttonText: "Get Airdrop",
    },
    {
      iconSrc: "/icons/earn-task.png",
      title: "Earn Task",
      buttonText: "Get Airdrop",
    },
    {
      iconSrc: "/icons/friends.png",
      title: "Friends",
      buttonText: "Get Airdrop",
    },
    {
      iconSrc: "/icons/achievements.png",
      title: "Achievement",
      buttonText: "Get Airdrop",
    },
    {
      iconSrc: "/icons/telegram.png",
      title: "Telegram Subscription",
      buttonText: "Get Airdrop",
    },
    {
      iconSrc: "/icons/key.png",
      title: "Keys",
      buttonText: "Get Airdrop",
    },
    {
      iconSrc: "/icons/telegram.png",
      title: "Telegram Channel: Resolved Builders",
      buttonText: "Join Now",
      link: "https://t.me/ResolvedBuilders",
    },
    {
      iconSrc: "/icons/twitter.png",
      title: "Twitter Community",
      buttonText: "Join Now",
      link: "https://x.com/i/communities/1844915754887790812",
    },
    {
      iconSrc: "/icons/telegram.png",
      title: "Telegram Chat: Resolved Success",
      buttonText: "Join Now",
      link: "https://t.me/ResolvedSuccess",
    },
    {
      iconSrc: "/icons/twitter.png",
      title: "Tweet: Support Likhon Docs",
      buttonText: "View Tweet",
      link: "https://x.com/likhondocs/status/1844934909686841464?s=46",
    },
    {
      iconSrc: "/icons/twitter.png",
      title: "Founder: Likhon Docs on Twitter",
      buttonText: "Follow Founder",
      link: "https://x.com/likhondocs",
    },
    {
      iconSrc: "/icons/telegram.png",
      title: "Founder Channel: Rex Cheat",
      buttonText: "Join Channel",
      link: "https://t.me/RexxCheat",
    },
  ];

  const { currentTapsLeft, increaseTapsLeft } = usePointsStore();
  const { multiClickLevel } = useBoostersStore();
  useEffect(() => {
    const intervalId = setInterval(() => {
      increaseTapsLeft();
      let time = Date.now();
      window.localStorage.setItem("lastLoginTime", time.toString());
      const local = parseInt(
        window.localStorage.getItem("currentTapsLeft") ?? "0"
      );

      if (local < currentTapsLeft && !isNaN(currentTapsLeft)) {
        window.localStorage.setItem(
          "currentTapsLeft",
          (currentTapsLeft + multiClickLevel).toString()
        );
      }
    }, 1000); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, [currentTapsLeft]);

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
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            iconSrc={task.iconSrc}
            title={task.title}
            buttonText={task.buttonText}
            link={task.link}
          />
        ))}
      </div>
    </div>
  );
};

export default AirDrop;
// Ensure that the `Button` component can accept an `as` prop
import { forwardRef } from "react";
import { Button as OriginalButton, ButtonProps as OriginalButtonProps } from "@/components/ui/button";

interface ButtonProps extends OriginalButtonProps {
  as?: "a" | "button";
  href?: string;
  target?: string;
}

const Button = forwardRef<HTMLAnchorElement & HTMLButtonElement, ButtonProps>(({ as = "button", ...props }, ref) => {
  if (as === "a") {
    return <a {...props} ref={ref as React.Ref<HTMLAnchorElement>} />;
  }
  return <OriginalButton {...props} ref={ref as React.Ref<HTMLButtonElement>} />;
});

Button.displayName = "Button";

export { Button };