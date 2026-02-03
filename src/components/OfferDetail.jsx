import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOfferById,
  deleteOffer,
  toggleActive,
} from "../api/offerApi";

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffer();
  }, []);

  const loadOffer = async () => {
    try {
      const { data } = await getOfferById(id);
      setOffer(data.offer);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this offer permanently?")) return;
    await deleteOffer(id);
    navigate("/admin/offers");
  };

  const handleToggle = async () => {
    await toggleActive(id);
    loadOffer();
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!offer) return <p className="p-6">Offer not found</p>;

  const now = new Date();
  const isExpired = new Date(offer.expiryDate) < now;
  const isUpcoming = new Date(offer.startDate) > now;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{offer.title}</h1>

        <span
          className={`px-4 py-1 rounded-full text-sm font-bold text-white
            ${
              isExpired
                ? "bg-red-600"
                : isUpcoming
                ? "bg-blue-600"
                : offer.isActive
                ? "bg-green-600"
                : "bg-yellow-500"
            }`}
        >
          {isExpired
            ? "EXPIRED"
            : isUpcoming
            ? "UPCOMING"
            : offer.isActive
            ? "ACTIVE"
            : "INACTIVE"}
        </span>
      </div>

      {/* Banner */}
      <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
        <img
          src={`${import.meta.env.VITE_API_URL}${offer.bannerImage}`}
          className="w-full h-72 object-cover"
          alt={offer.title}
        />
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Discount:</strong>{" "}
            {offer.discountType === "percentage"
              ? `${offer.discountValue}%`
              : `₹${offer.discountValue}`}
          </p>

          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(offer.startDate).toDateString()}
          </p>

          <p>
            <strong>Expiry Date:</strong>{" "}
            {new Date(offer.expiryDate).toDateString()}
          </p>

          <div>
            <strong>Categories:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {offer.categories.map(cat => (
                <span
                  key={cat._id}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="bg-gray-100 rounded-xl p-6 space-y-4">
          {!isExpired && (
            <button
              onClick={handleToggle}
              className="w-full py-3 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600"
            >
              {offer.isActive ? "Deactivate Offer" : "Activate Offer"}
            </button>
          )}

          <button
            onClick={handleDelete}
            className="w-full py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Offer
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 rounded-lg font-semibold bg-gray-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
