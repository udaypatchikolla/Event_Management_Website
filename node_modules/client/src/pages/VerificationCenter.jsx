export default function VerificationCenter() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold text-primary mb-2">Verification Center</h1>
      <p className="text-gray-600 mb-6">Manage organizer verification and center submissions.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm ring-1 ring-gray-100">
          <h2 className="font-semibold mb-1">Your Status</h2>
          <p className="text-sm text-gray-600">Submit documents to get verified and unlock organizer features.</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm ring-1 ring-gray-100">
          <h2 className="font-semibold mb-1">Required Documents</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            <li>Government-issued ID</li>
            <li>Business registration proof</li>
            <li>Bank account details</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


