import { useEffect, useState } from "react";
import { fetchActiveOffers, deleteOffer, toggleActive } from "../api/offerApi";
import { useNavigate } from "react-router-dom";

const TABS = {
  AV: "availableOffers",
  DE: "deactiveOffers",
    EXP: "expiredOffers",
  UP: "upcomingOffers",

};

const OfferBanner = () => {
  const [openTab, setOpenTab] = useState("AV");
  const [offers, setOffers] = useState({
    availableOffers: [],
    expiredOffers: [],
    deactiveOffers: [],
    upcomingOffers: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadOffers();
  }, []);

 const loadOffers = async () => {
  try {
    const { data } = await fetchActiveOffers();
    setOffers({
      availableOffers: data.availableOffers || [],
      expiredOffers: data.expiredOffers || [],
      deactiveOffers: data.deactiveOffers || [],
      upcomingOffers: data.upcomingOffers || [],
    });
  } catch (err) {
    console.error(err);
  }
};

  const currentOffers = offers[TABS[openTab]];

  const handleDelete = async (id) => {
if (!window.confirm("Delete this offer?")) return;
    await deleteOffer(id);
    loadOffers();
  };

  const handleToggle = async (id) => {
    await toggleActive(id);
    loadOffers(); // 🔥 THIS makes toggle reflect in UI
  };

  return (
    <div className="my-12">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.keys(TABS).map(tab => (
          <button
            key={tab}
            onClick={() => setOpenTab(tab)}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-all
              ${openTab === tab
                ? "bg-indigo-600 text-white shadow-lg scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {{
              AV: "Active",
              EXP: "Expired",
              DE: "Inactive",
              UP: "Upcoming",
            }[tab]}
          </button>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentOffers.length === 0 && (
          <p className="text-gray-500 text-lg">No offers found</p>
        )}

        {currentOffers.map(offer => {
          const isExpired = new Date(offer.expiryDate) < new Date();

          return (
            <div
              key={offer._id}
              onClick={() => navigate(`/admin/offers/${offer._id}`)}

              className={`cursor-pointer relative rounded-2xl overflow-hidden shadow-xl
                transition-all hover:-translate-y-1
                ${!offer.isActive ? "opacity-70 grayscale" : ""}`}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${offer.bannerImage}`}
                className="w-full h-48 object-cover"
                alt={offer.title}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Status badge */}
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold text-white
                  ${
                    isExpired
                      ? "bg-red-600"
                      : offer.isActive
                      ? "bg-green-600"
                      : "bg-yellow-500"
                  }`}
              >
                {isExpired
                  ? "EXPIRED"
                  : offer.isActive
                  ? "ACTIVE"
                  : "INACTIVE"}
              </span>

              <div className="absolute bottom-0 p-5 text-white w-full">
                <h3 className="text-xl font-bold">{offer.title}</h3>
                <p className="mb-3">
                  {offer.discountType === "percentage"
                    ? `${offer.discountValue}% OFF`
                    : `₹${offer.discountValue} OFF`}
                </p>

                <div className="flex gap-3">
                  {!isExpired && (
                    <button
                      onClick={(e) =>{
                            e.stopPropagation();

                        handleToggle(offer._id)}}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-1 rounded-lg"
                    >
                      {offer.isActive ? "Deactivate" : "Activate"}
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                          e.stopPropagation();

                      handleDelete(offer._id)}}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferBanner;
