"use client";
import { useState } from "react";
import SettingsCard from "./components/SettingsCard";
import { FiUser, FiLock, FiBell } from "react-icons/fi";

import SettingsPanel from "./components/SettingsPanel";
import CreateTitle from "../CreateTitle";
function Setting() {
  const [notify, setNotify] = useState({
    jobs: true,
    updates: false,
    messages: false,
  });

  const [lang, setLang] = useState("ar");

  return (
    <div className="mb-10">
      <CreateTitle title="الإعدادات" number={13} />

      <SettingsCard
        title="إعدادات الحساب"
        icon={<FiUser className="text-blue-600" size={18} />}
        label="البريد الإلكتروني"
      />

      <SettingsCard
        title="الأمان"
        icon={<FiLock className="text-red-500" size={18} />}
        iconBg="bg-red-100"
        label={"تغيير كلمة المرور"}
      />

      <SettingsPanel
        title="الإشعارات"
        icon={<FiBell className="text-yellow-700" size={20} />}
        iconBg="bg-yellow-100"
        items={[
          { key: "jobs", label: "توصيات الوظائف" },
          { key: "updates", label: "تحديثات الطلبات" },
          { key: "messages", label: "الرسائل" },
        ]}
        values={notify}
        onToggle={(key, next) =>
          setNotify((prev) => ({ ...prev, [key]: next }))
        }
        selectLabel="اللغة"
        selectValue={lang}
        selectOptions={[
          { value: "ar", label: "العربية" },
          { value: "en", label: "الإنجليزية" },
        ]}
        onSelectChange={setLang}
        onPrimary={() => console.log("SAVE", notify, lang)}
        onSecondary={() => console.log("CANCEL")}
      />
    </div>
  );
}

export default Setting;
