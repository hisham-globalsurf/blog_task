import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "@/features/contact/contactSlice";

const ContactList = () => {
  const dispatch = useDispatch();
  const { isLoading, contacts, isError, error } = useSelector(
    (state) => state.contact
  );

  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-900">
          Contact Submissions
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">
            {error || "Failed to load contacts."}
          </p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-500">No submissions found.</p>
        ) : (
          <div className="overflow-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-[800px] w-full bg-white">
              <thead className="bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 w-48">Name</th>
                  <th className="px-4 py-3 w-56">Email</th>
                  <th className="px-4 py-3 w-36">Mobile</th>
                  <th className="px-4 py-3 w-28">State</th>
                  <th className="px-4 py-3 w-28">Country</th>
                  <th className="px-4 py-3 w-[100px]">Message</th>
                  <th className="px-4 py-3 w-52">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-4 py-3 border-t border-gray-200 truncate">
                      {contact.name}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200 truncate">
                      {contact.email}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200">
                      {contact.mobile}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200">
                      {contact.state}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200">
                      {contact.country}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200">
                      <button
                        onClick={() => setSelectedMessage(contact.message)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200 text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg max-w-md w-full text-gray-800 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Message</h2>
            <p className="whitespace-pre-wrap break-words text-sm text-gray-700">
              {selectedMessage}
            </p>
            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
