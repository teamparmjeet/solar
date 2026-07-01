"use client";

import { useState } from "react";
import SettingsMenu from "./components/SettingsMenu";
import PlanSettings from "./components/PlanSettings";
import ProfileSettings from "./components/ProfileSettings";
import NotificationSettings from "./components/NotificationSettings";

export default function Page() {
  const [selected, setSelected] = useState("home");

  return (
    <div className=" ">

      {selected === "home" && (
        <SettingsMenu onSelect={setSelected} />
      )}

      {selected === "plan" && (
        <PlanSettings onBack={() => setSelected("home")} />
      )}

      {selected === "profile" && (
        <ProfileSettings onBack={() => setSelected("home")} />
      )}

      {selected === "notification" && (
        <NotificationSettings onBack={() => setSelected("home")} />
      )}

    </div>
  );
}