"use client";

import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function CertificatesTab({
  objectCertificates,
  setObjectCertificates,
  DeletedCertificateField,
  setDeletedCertificateField,
  CVID,
}) {
  const handleCertificateNameChange = (index, value) => {
    const updated = [...objectCertificates];
    updated[index] = {
      ...updated[index],
      CertificateName: value,
    };
    setObjectCertificates(updated);
  };

  const handleIssuingOrganizationChange = (index, value) => {
    const updated = [...objectCertificates];
    updated[index] = {
      ...updated[index],
      IssuingOrganization: value,
    };
    setObjectCertificates(updated);
  };

  const addRow = () => {
    setObjectCertificates([
      ...objectCertificates,
      {
        CVID: CVID,
        CertificationID: null,
        CertificateName: "",
        IssuingOrganization: "",
        IsVerified: false,
      },
    ]);
  };

  const removeRow = (index) => {
    const item = objectCertificates[index];

    if (item?.CertificationID) {
      setDeletedCertificateField([...DeletedCertificateField, item]);
    }

    const updated = objectCertificates.filter((_, i) => i !== index);
    setObjectCertificates(updated);
  };

  return (
    <section className="mt-5 w-full rounded-2xl border border-secondGray bg-auxiliaryColorWhite p-6">
      <h3 className="text-right text-lg font-semibold text-slate-900">
        الدورات والشهادات
      </h3>

      <div className="mt-5 space-y-4">
        {objectCertificates.map((item, index) => (
          <div key={index} className="space-y-4">
            <div className="grid grid-cols-[1fr_1fr_140px_28px] items-center gap-3">
              <input
                value={item.CertificateName || ""}
                onChange={(e) =>
                  handleCertificateNameChange(index, e.target.value)
                }
                placeholder="الشهادة العلمية"
                className="h-12 w-full rounded-xl border border-secondGray bg-white px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                value={item.IssuingOrganization || ""}
                onChange={(e) =>
                  handleIssuingOrganizationChange(index, e.target.value)
                }
                placeholder="المكان التعليمي"
                className="h-12 w-full rounded-xl border border-secondGray bg-white px-4 text-right outline-none focus:ring-2 focus:ring-blue-500"
              />

              {item.IsVerified ? (
                <div className="flex h-12 items-center justify-center gap-2 rounded-xl bg-green-100 px-4 text-green-700">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>موثق</span>
                </div>
              ) : (
                <div className="flex h-12 items-center justify-center gap-2 rounded-xl bg-yellow-100 px-4 text-yellow-700">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  <span>لم يتم التحقق</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => removeRow(index)}
                className="flex h-8 w-8 items-center justify-center text-red-500 hover:text-red-600"
                aria-label="حذف"
                title="حذف"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50"
          aria-label="إضافة شهادة"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
