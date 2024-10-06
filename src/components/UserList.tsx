import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserForm from './UserForm';
import DeleteConfirmation from './DeleteConfirmation';
import SkeletonLoader from './SkeletonLoader';

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      console.log(data)
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleCreateUser = (newUser : User) => {
    console.log(newUser)
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setIsFormOpen(false);
    toast.success('User created successfully');
  };

  const handleUpdateUser = (updatedUser : User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsFormOpen(false);
    setEditingUser(null);
    toast.success('User updated successfully');
  };

  const handleDeleteUser = async () => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userToDelete?.id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== userToDelete?.id));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className='container mx-auto p-4'>
      <SkeletonLoader count={10} />
    </div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingUser(null);
          }}
          className="ml-4 bg-green-500 text-white p-2 rounded"
        >
          Add User
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-blue-200 hidden md:table-row">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id} className={`${index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-800'} md:table-row md:rounded-none md:mb-0 mb-2 rounded-lg grid grid-cols-3`}>
              <p className='p-2 text-gray-400 text-right text-xl md:hidden block'>Name : </p>
              <td className="p-2 text-gray-300 md:text-center text-xl col-span-2">{user.name}</td>
              <p className='p-2 text-gray-400 text-right text-xl md:hidden block'>Email : </p>
              <td className="p-2 text-gray-300 md:text-center text-xl col-span-2">{user.email}</td>
              <p className='p-2 text-gray-400 text-right text-xl md:hidden block'>Phone : </p>
              <td className="p-2 text-gray-300 md:text-center text-xl col-span-2">{user.phone}</td>
              <td className="p-2 col-span-3 flex justify-center gap-5 md:table-row text-center ">
                <Link to={`/user/${user.id}`} className="text-blue-500 hover:underline mr-2">
                  View
                </Link>
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setIsFormOpen(true);
                  }}
                  className="text-yellow-500 hover:underline mr-2"
                  >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setUserToDelete(user);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-500 hover:underline"
                  >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFormOpen && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          onClose={() => {
            setIsFormOpen(false);
            setEditingUser(null);
          }}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmation
          user={userToDelete}
          onConfirm={handleDeleteUser}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
          }}
        />
      )}
    </div>
  );
}

export default UserList;