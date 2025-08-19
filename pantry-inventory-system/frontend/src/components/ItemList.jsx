import React, { useEffect, useState } from "react";
import { fetchItems, deleteItem, updateItem } from "../utils/api";

export default function ItemList({ userRole }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("best_by_date");
  const limit = 10;

  useEffect(() => {
    loadItems();
  }, [page, search, sort]);

  const loadItems = async () => {
    try {
      const res = await fetchItems({ page, limit, search, sort });
      setItems(res.data.items);
      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteItem(id);
    loadItems();
  };

  const isExpired = (dateStr) => {
    if (!dateStr || dateStr === "Not Listed" || dateStr === "Forever") return false;
    const now = new Date();
    const date = new Date(dateStr);
    return date < now;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border p-2 flex-grow"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="ml-2 border p-2"
        >
          <option value="best_by_date">Sort by Expiration</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Item Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Storage Location</th>
            <th className="border border-gray-300 p-2">Best By Date</th>
            <th className="border border-gray-300 p-2">Out of Stock</th>
            {userRole === "admin" && <th className="border border-gray-300 p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const expired = isExpired(item.best_by_date);
            return (
              <tr
                key={item.id}
                className={`${item.out_of_stock ? "text-gray-400" : ""} ${
                  expired ? "bg-red-100" : ""
                }`}
              >
                <td className="border border-gray-300 p-2">{item.item_name}</td>
                <td className="border border-gray-300 p-2">{item.category}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">{item.storage_location}</td>
                <td className="border border-gray-300 p-2">{item.best_by_date}</td>
                <td className="border border-gray-300 p-2">
                  {item.out_of_stock ? "Yes" : "No"}
                </td>
                {userRole === "admin" && (
                  <td className="border border-gray-300 p-2 space-x-2">
                    <button
                      onClick={() => alert("Edit feature to be added")}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div>
          Page {page} of {Math.ceil(total / limit)}
        </div>
        <button
          disabled={page >= Math.ceil(total / limit)}
          onClick={() => setPage(page + 1)}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}