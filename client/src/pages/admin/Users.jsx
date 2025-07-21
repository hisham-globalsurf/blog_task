import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  toggleUserBlock,
  fetchBlogsByUser,
} from "@/features/admin/adminSlice";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import UserBlogModal from "@/components/admin/user/UserBlogModal";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, userBlogs } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleToggleBlock = (e, id) => {
    e.stopPropagation();
    dispatch(toggleUserBlock(id));
  };

  const handleUserRowClick = (user) => {
    setSelectedUser(user);
    dispatch(fetchBlogsByUser(user._id));
    setOpenDialog(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Users</h1>

      <div className="max-w-sm">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    onClick={() => handleUserRowClick(user)}
                    className="cursor-pointer"
                  >
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.blocked ? (
                        <span className="text-red-500">Blocked</span>
                      ) : (
                        <span className="text-green-600">Active</span>
                      )}
                    </TableCell>
                    <TableCell
                      className="text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant={user.blocked ? "default" : "destructive"}
                        className="w-[100px]"
                        onClick={(e) => handleToggleBlock(e, user._id)}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}

      {/* Dialog for user's blogs */}
      <UserBlogModal
        open={openDialog}
        setOpen={setOpenDialog}
        user={selectedUser}
        blogs={userBlogs}
      />
    </div>
  );
};

export default Users;
