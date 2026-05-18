"use client";

import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { uploadPdf } from "../../../(Company)/callFunctionsForCompany";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

export default function CertificatesTab({
  objectCertificates,
  setObjectCertificates,
  DeletedCertificateField,
  setDeletedCertificateField,
  CVID,
}) {
  const handleFileUpload = async (index, file) => {
    if (file.type !== "application/pdf") {
      toast.error("ارفع ملف PDF فقط");
      return;
    }

    const url = await uploadPdf(file);
    UploadImgUrl(index, url);

    /*
     */
    //setLoading(true);
    /*     const url = await uploadPdf(e);
     */
    /*  if (url) {
      toast.success("تم رفع الملف");
    }
    */
    //setImage(url);
    //setLoading(false);
    /*  if (file.value != "pdf") {
      toast.error("يرجى اختيار ملف بصيغة pdf");
    }
    */
  };
  const UploadImgUrl = (index, value) => {
    const updated = [...objectCertificates];
    updated[index] = {
      ...updated[index],
      FilePath: value,
    };
    setObjectCertificates(updated);
  };
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
        FilePath: null,
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
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_100px_70px_28px]  items-center gap-3">
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
              <div className="flex items-center gap-10 cursor-pointer ">
                <UploadIcon
                  className="size-5 hover:cursor-pointer"
                  htmlFor="certificate"
                />

                <input
                  id="certificate"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(index, e.target.files[0])}
                  className="hidden"
                />

                {item.FilePath !== null ? (
                  <Link href={item?.FilePath} target="_blank">
                    <FaEye />
                  </Link>
                ) : (
                  <FaEye
                    className="text-slate-500 hover:cursor-pointer"
                    onClick={() => {
                      toast.error("لا يوجد ملف");
                    }}
                  />
                )}
              </div>

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
