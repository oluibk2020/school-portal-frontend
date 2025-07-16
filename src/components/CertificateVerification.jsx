import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Assuming react-router-dom is installed

function CertificateVerification() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const certId = queryParams.get("id");

  // State to store certificate data, loading status, and error
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define API_URL. In a real Vite app, this would be available via import.meta.env.VITE_API_URL
  // For this example, we'll use a placeholder if VITE_API_URL is not defined in the environment.
  // In a live environment, ensure VITE_API_URL is correctly set in your .env file.
  const API_URL = import.meta.env.VITE_API_URL;

  /**
   * Fetches and verifies the certificate ID from the API.
   */
  useEffect(() => {
    const verifyCertificateId = async () => {
      if (!certId) {
        setError("No certificate ID found in the URL.");
        setLoading(false);
        return;
      }

      let trimmedCertId;

      //if certId starts with CI- or ci-, remove it
      if (
        certId.startsWith("CI-") ||
        certId.startsWith("ci-") ||
        certId.startsWith("Ci-") ||
        certId.startsWith("cI-")
      ) {
        trimmedCertId = certId.slice(3);
      } else {
        trimmedCertId = certId;
      }


      setLoading(true);
      setError(null);
      setCertificateData(null); // Clear previous data

      try {
        const response = await fetch(
          `${API_URL}/certificate/verify/${trimmedCertId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // If response is not 2xx, throw an error
          const errorData = await response.json();
          throw new Error(
            errorData.msg || `HTTP error! status: ${response.status}`
          );
        }

        const result = await response.json();
        if (result.msg === "fetched successfully" && result.data) {
          setCertificateData(result.data);
        } else {
          // Handle cases where API returns success but data is not as expected
          setError(result.msg || "Certificate data not found.");
        }
      } catch (err) {
        console.error("Error verifying certificate:", err);
        setError(
          err.message || "Failed to verify certificate. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyCertificateId();
  }, [certId]); // Re-run effect if certId or API_URL changes

  return (
    <div className="min-h-screen py-16 bg-blue-50 flex flex-col items-center justify-center font-inter px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">
          Certificate Verification
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-opacity-50"></div>
            <p className="mt-4 text-blue-600 text-lg">
              Verifying certificate...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative text-center">
            <strong className="font-bold">Verification Failed!</strong>
            <p className="block sm:inline mt-2 sm:mt-0">{error}</p>
            <p className="text-sm mt-2">
              Certificate ID:{" "}
              <span className="font-semibold break-all">{certId || "N/A"}</span>
            </p>
          </div>
        )}

        {certificateData && !loading && !error && (
          <div className="space-y-4 text-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-semibold text-blue-700">
                Certificate Status:
              </span>
              <span className="text-green-600 font-bold text-lg">VERIFIED</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Owner</p>
              <p className="font-semibold text-lg text-blue-800">
                {certificateData.owner}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Course Title</p>
              <p className="font-semibold text-lg text-blue-800">
                {certificateData.course_title}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Date Completed</p>
              <p className="font-semibold text-lg text-blue-800">
                {new Date(certificateData.date_completed).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Certificate ID</p>
              <p className="font-semibold text-lg text-blue-800 break-all">
                {certificateData.certificate_id}
              </p>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              This certificate is officially verified by our system.
            </p>
          </div>
        )}

        {!certId && !loading && !error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md relative text-center">
            <strong className="font-bold">Missing ID!</strong>
            <p className="block sm:inline mt-2 sm:mt-0">
              Please provide a certificate ID in the URL (e.g.,
              ?id=your_cert_id).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificateVerification;
