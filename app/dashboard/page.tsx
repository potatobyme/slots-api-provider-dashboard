import Link from "next/link"
import { Button } from "@/components/ui/button"

// This would typically come from your backend
const mockApis = [
  { id: 1, name: "User Authentication API", type: "REST", status: "Active" },
  { id: 2, name: "Product Catalog API", type: "GraphQL", status: "In Development" },
  { id: 3, name: "Payment Processing API", type: "REST", status: "Active" },
]

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your APIs</h2>
        <Link href="/dashboard/create-api">
          <Button>Create New API</Button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockApis.map((api) => (
              <tr key={api.id}>
                <td className="px-6 py-4 whitespace-nowrap">{api.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{api.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      api.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {api.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/dashboard/api/${api.id}`} className="text-blue-600 hover:text-blue-900">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

