"use client";

import { useState } from "react";
import UserTableRow, { type User } from "./UserTableRow";
import UserDetailsModal, { type UserModalData } from "./UserDetailsModal";

type UsersTableProps = {
  users: User[];
};

export default function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<UserModalData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  function mapUserToModal(user: User): UserModalData {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      verificationStatus: user.verificationStatus,
      accountStatus: user.accountStatus,
      skills: user.skills ?? ["JavaScript", "React", "Next.js"],
      applicationsCount: user.applicationsCount ?? 12,
    };
  }

  function handleView(user: User) {
    setSelectedUser(mapUserToModal(user));
    setModalMode("view");
    setOpenModal(true);
  }

  function handleEdit(user: User) {
    setSelectedUser(mapUserToModal(user));
    setModalMode("edit");
    setOpenModal(true);
  }

  function handleSave(updatedUser: UserModalData) {
    if (!updatedUser.id) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === updatedUser.id
          ? {
              ...user,
              name: updatedUser.name,
              email: updatedUser.email,
              role: updatedUser.role,
              createdAt: updatedUser.createdAt,
              verificationStatus: updatedUser.verificationStatus,
              accountStatus: updatedUser.accountStatus,
              skills: updatedUser.skills,
              applicationsCount: updatedUser.applicationsCount,
            }
          : user,
      ),
    );

    console.log("Updated user:", updatedUser);
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-sm">
            <thead className="bg-[#fafafa]">
              <tr className="text-right text-base font-semibold text-[#1f2a44]">
                <th className="px-4 py-4">الاسم</th>
                <th className="px-4 py-4">البريد الإلكتروني</th>
                <th className="px-4 py-4">الدور</th>
                <th className="px-4 py-4">حالة التحقق</th>
                <th className="px-4 py-4">حالة الحساب</th>
                <th className="px-4 py-4">تاريخ الإنشاء</th>
                <th className="px-4 py-4">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onView={handleView}
                  onEdit={handleEdit}
                  onBlock={(u) => console.log("Block user:", u)}
                  onDelete={(u) => console.log("Delete user:", u)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserDetailsModal
        isOpen={openModal}
        mode={modalMode}
        onClose={() => setOpenModal(false)}
        user={selectedUser}
        onSave={handleSave}
      />
    </>
  );
}
