"use client";

import { useEffect, useMemo, useState } from "react";
import { Profile } from "../../callFunctionsForCompany";
import { toast } from "react-toastify";

const emptyForm = {
  title: "",
  location: "",
  work_type: "Full-time",
  workplace_type: "onsite",
  salary_min: "",
  salary_max: "",
  currency: "USD",
  expiry_date: "",
  description: "",
  responsibilities: [""],
  requirements: [""],
  benefits: [""],
  skills: [],
};

function getId(data) {
  return data?.id ?? data?.JobAdID ?? data?.JobID;
}

function normalizeWorkType(value) {
  const map = {
    "Full-time": "Full-time",
    "Part-time": "Part-time",
    Contract: "contract",
    Internship: "internship",
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "contract",
    internship: "internship",
  };

  return map[value] ?? "Full-time";
}

function normalizeWorkplaceType(value) {
  const map = {
    "On-site": "onsite",
    Remote: "remote",
    Hybrid: "hybrid",
    onsite: "onsite",
    remote: "remote",
    hybrid: "hybrid",
  };

  return map[value] ?? "onsite";
}

function normalizeJob(job) {
  if (!job) return emptyForm;

  return {
    title: job.Title ?? job.title ?? "",
    location: job.Location ?? job.location ?? "",
    work_type: normalizeWorkType(job.WorkType ?? job.work_type),
    workplace_type: normalizeWorkplaceType(
      job.WorkplaceType ?? job.workplace_type,
    ),
    salary_min: job.SalaryMin ?? job.salary_min ?? "",
    salary_max: job.SalaryMax ?? job.salary_max ?? "",
    currency: job.Currency ?? job.currency ?? "USD",
    expiry_date: (job.ExpiryDate ?? job.expiry_date ?? "").slice(0, 10),
    description: job.Description ?? job.description ?? "",
    responsibilities: Array.isArray(
      job.Responsibilities ?? job.responsibilities,
    )
      ? (job.Responsibilities ?? job.responsibilities)
      : [""],
    requirements: Array.isArray(job.Requirements ?? job.requirements)
      ? (job.Requirements ?? job.requirements)
      : [""],
    benefits: Array.isArray(job.Benefits ?? job.benefits)
      ? (job.Benefits ?? job.benefits)
      : [""],
    skills: (job.skills ?? job.Skills ?? []).map((s) => ({
      skill_id: s.skill_id ?? s.SkillID ?? s.id,
      skill_name:
        s.skill_name ?? s.SkillName ?? s.name ?? s.Skill?.SkillName ?? "",
      required_level: s.required_level ?? s.RequiredLevel ?? "Intermediate",
      is_mandatory: s.is_mandatory ?? s.IsMandatory ?? true,
    })),
  };
}

function Input({
  label,
  value,
  onChange,
  readOnly,
  type = "text",
  textarea = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label}
      </label>

      {textarea ? (
        <textarea
          readOnly={readOnly}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] outline-none focus:border-blue-500 read-only:bg-slate-50"
        />
      ) : (
        <input
          readOnly={readOnly}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[14px] outline-none focus:border-blue-500 read-only:bg-slate-50"
        />
      )}
    </div>
  );
}

function SelectInput({ label, value, onChange, readOnly, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label}
      </label>

      <select
        disabled={readOnly}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[14px] outline-none focus:border-blue-500 disabled:bg-slate-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ArrayInput({ label, values, setValues, readOnly }) {
  const update = (i, value) =>
    setValues(values.map((x, idx) => (idx === i ? value : x)));

  const remove = (i) => setValues(values.filter((_, idx) => idx !== i));

  return (
    <div className="sm:col-span-2">
      <label className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label}
      </label>

      <div className="space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex gap-2">
            <input
              readOnly={readOnly}
              value={value}
              onChange={(e) => update(i, e.target.value)}
              className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 read-only:bg-slate-50"
            />

            {!readOnly && values.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="rounded-xl border border-red-200 px-3 text-red-500"
              >
                حذف
              </button>
            )}
          </div>
        ))}

        {!readOnly && (
          <button
            type="button"
            onClick={() => setValues([...values, ""])}
            className="rounded-xl border border-blue-200 px-4 py-2 text-blue-600"
          >
            + إضافة
          </button>
        )}
      </div>
    </div>
  );
}

export default function JobForm({
  setPostJob,
  mode = "create",
  job = null,
  onSuccess,
}) {
  const readOnly = mode === "view";
  const [formData, setFormData] = useState(() => normalizeJob(job));
  const [skillCatalog, setSkillCatalog] = useState([]);
  const [skillText, setSkillText] = useState("");
  const [loading, setLoading] = useState(false);

  const title =
    mode === "edit"
      ? "تعديل الوظيفة"
      : mode === "view"
        ? "تفاصيل الوظيفة"
        : "إضافة وظيفة جديدة";

  useEffect(() => {
    setFormData(normalizeJob(job));
  }, [job]);

  useEffect(() => {
    Profile("GetSkills")
      .then((data) => setSkillCatalog(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const skillNames = useMemo(
    () =>
      skillCatalog
        .map((s) => s.skill_name ?? s.SkillName ?? s.name)
        .filter(Boolean),
    [skillCatalog],
  );

  const setField = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const addSkill = async () => {
    const name = skillText.trim();
    if (!name || readOnly) return;

    const oldSkill = skillCatalog.find((s) =>
      [s.skill_name, s.SkillName, s.name].includes(name),
    );

    const skill_id = oldSkill?.id ?? oldSkill?.SkillID ?? oldSkill?.skill_id;

    setFormData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          skill_id,
          skill_name: name,
          required_level: "Intermediate",
          is_mandatory: true,
        },
      ],
    }));

    setSkillText("");
  };

  const buildPayload = async () => {
    const skills = [];

    for (const skill of formData.skills) {
      let skillId = skill.skill_id;

      if (!skillId && skill.skill_name) {
        const created = await Profile("CreateSkill", {
          skill_name: skill.skill_name,
        });
        skillId = created?.id ?? created?.SkillID ?? created?.skill_id;
      }

      if (skillId) {
        skills.push({
          skill_id: skillId,
          required_level: skill.required_level || "Intermediate",
          is_mandatory: Boolean(skill.is_mandatory),
        });
      }
    }

    return {
      title: formData.title,
      description: formData.description,
      responsibilities: formData.responsibilities.filter(Boolean),
      requirements: formData.requirements.filter(Boolean),
      benefits: formData.benefits.filter(Boolean),
      location: formData.location,
      work_type: formData.work_type,
      workplace_type: formData.workplace_type,
      salary_min: Number(formData.salary_min) || 0,
      salary_max: Number(formData.salary_max) || 0,
      currency: formData.currency,
      expiry_date: formData.expiry_date,
      status: "Draft",
      skills,
    };
  };

  const save = async (publish = false) => {
    if (readOnly) return;

    setLoading(true);

    try {
      const payload = await buildPayload();

      const saved =
        mode === "edit"
          ? await Profile("UpdateJob", { id: getId(job), payload })
          : await Profile("CreateJob", payload);

      toast.error(saved.message);

      const id = getId(saved) ?? getId(job);

      if (publish && id) {
        await Profile("PublishJob", id);
      }

      await onSuccess?.();
      setPostJob(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save(true);
      }}
      className="w-[95%] max-w-5xl space-y-4 mb-20"
      dir="rtl"
    >
      <div className="rounded-[20px] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
        <h2 className="mb-4 text-[22px] font-extrabold text-slate-900">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              readOnly={readOnly}
              label="المسمى الوظيفي*"
              value={formData.title}
              onChange={(v) => setField("title", v)}
            />
          </div>

          <Input
            readOnly={readOnly}
            label="الموقع*"
            value={formData.location}
            onChange={(v) => setField("location", v)}
          />

          <SelectInput
            readOnly={readOnly}
            label="نوع العمل*"
            value={formData.work_type}
            onChange={(v) => setField("work_type", v)}
            options={[
              { value: "Full-time", label: "Full-time" },
              { value: "Part-time", label: "Part-time" },
              { value: "contract", label: "contract" },
              { value: "internship", label: "internship" },
            ]}
          />

          <SelectInput
            readOnly={readOnly}
            label="نوع مكان العمل*"
            value={formData.workplace_type}
            onChange={(v) => setField("workplace_type", v)}
            options={[
              { value: "onsite", label: "onsite" },
              { value: "remote", label: "remote" },
              { value: "hybrid", label: "hybrid" },
            ]}
          />

          <Input
            readOnly={readOnly}
            label="العملة"
            value={formData.currency}
            onChange={(v) => setField("currency", v)}
          />

          <Input
            readOnly={readOnly}
            label="الحد الأدنى"
            type="number"
            value={formData.salary_min}
            onChange={(v) => setField("salary_min", v)}
          />

          <Input
            readOnly={readOnly}
            label="الحد الأقصى"
            type="number"
            value={formData.salary_max}
            onChange={(v) => setField("salary_max", v)}
          />

          <Input
            readOnly={readOnly}
            label="تاريخ الانتهاء"
            type="date"
            value={formData.expiry_date}
            onChange={(v) => setField("expiry_date", v)}
          />
        </div>
      </div>

      <div className="rounded-[20px] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
        <h2 className="mb-4 text-[22px] font-extrabold text-slate-900">
          تفاصيل الوظيفة
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              readOnly={readOnly}
              textarea
              label="وصف الوظيفة*"
              value={formData.description}
              onChange={(v) => setField("description", v)}
            />
          </div>

          <ArrayInput
            readOnly={readOnly}
            label="المسؤوليات"
            values={formData.responsibilities}
            setValues={(v) => setField("responsibilities", v)}
          />

          <ArrayInput
            readOnly={readOnly}
            label="المتطلبات"
            values={formData.requirements}
            setValues={(v) => setField("requirements", v)}
          />

          <ArrayInput
            readOnly={readOnly}
            label="المزايا"
            values={formData.benefits}
            setValues={(v) => setField("benefits", v)}
          />

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[13px] font-medium text-slate-700">
              المهارات المطلوبة
            </label>

            <div className="flex gap-2">
              <input
                readOnly={readOnly}
                list="skills-list"
                value={skillText}
                onChange={(e) => setSkillText(e.target.value)}
                className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 read-only:bg-slate-50"
              />

              <datalist id="skills-list">
                {skillNames.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>

              {!readOnly && (
                <button
                  type="button"
                  onClick={addSkill}
                  className="rounded-xl bg-blue-600 px-5 text-white"
                >
                  إضافة
                </button>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
                >
                  {skill.skill_name}

                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() =>
                        setField(
                          "skills",
                          formData.skills.filter((_, i) => i !== index),
                        )
                      }
                      className="mr-2 text-red-500"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_140px] gap-3 justify-between w-full">
        {!readOnly && (
          <button
            disabled={loading}
            type="submit"
            className="h-11 w-full rounded-xl bg-blue-600 px-6 text-[14px] font-semibold text-white disabled:opacity-60"
          >
            {loading ? "جاري الحفظ..." : "نشر الوظيفة"}
          </button>
        )}

        {!readOnly && (
          <button
            disabled={loading}
            type="button"
            onClick={() => save(false)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-5 text-[14px] text-slate-700"
          >
            حفظ كمسودة
          </button>
        )}

        <button
          type="button"
          onClick={() => setPostJob(false)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-5 text-[14px] text-slate-700"
        >
          إغلاق
        </button>
      </div>
    </form>
  );
}
