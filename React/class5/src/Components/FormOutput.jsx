const FormOutput = ({ items, handleDelete }) => {
  return (
    <ul className="space-y-2">
      {items.length === 0 && (
        <p className="text-gray-400 text-center">No items added</p>
      )}

      {items.map(item => (
        <li
          key={item.id}
          className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg"
        >
          <span className="text-gray-800">{item.text}</span>

          <button
            onClick={() => handleDelete(item.id)}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FormOutput;
