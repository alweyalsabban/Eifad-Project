"use client";
import { useContext, useState, useEffect } from "react";
import { NamePageContex } from "../context/NamePageContext";
import SettingsCard from "./components/SettingsCard";
import { FiUser, FiLock, FiBell } from "react-icons/fi";

import SettingsPanel from "./components/SettingsPanel";

function Setting() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الإعدادات");
    setnumberOfSideBar(13);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  const [notify, setNotify] = useState({
    jobs: true,
    updates: false,
    messages: false,
  });

  const [lang, setLang] = useState("ar");

  return (
    <div className="mb-10">
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
