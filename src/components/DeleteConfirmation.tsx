
type DeleteConfirmationProps = {
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
};
function DeleteConfirmation({ user, onConfirm, onCancel }: DeleteConfirmationProps) {
  if(!user) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-4">Are you sure you want to delete the user: {user.name}?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;