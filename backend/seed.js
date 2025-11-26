// seed.js
const axios = require("axios");

// --------------------------------------
// CONFIG
// --------------------------------------
const USER_EMAIL = "test@mail.com";
const USER_PASSWORD = "test"; // whatever you used while creating test user
const API_BASE = "http://localhost:3000";

const NUMBER_OF_TRIPS = 35;

const TAGS = [
  "Work", "Commute", "Personal", "Shopping", "Travel",
  "Family", "Medical", "Gym", "Leisure",
];

const CATEGORIES = [
  "Sedan", "Hatchback", "SUV", "Crossover", "Coupe", "Convertible",
  "Pickup Truck", "Minivan", "Van", "Motorbike", "Electric Car",
  "Hybrid Car", "Luxury Car", "Sports Car", "Commercial Truck", "Bus",
];

// --------------------------------------
// HELPERS
// --------------------------------------
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomDistance = () => parseFloat((Math.random() * 20 + 2).toFixed(1));
const randomDuration = () => Math.floor(Math.random() * 40 + 5);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --------------------------------------
// MAIN
// --------------------------------------
(async () => {
  console.log("🌱 Starting seed…");

  try {
    // 1️⃣ Login to get auth cookie
    console.log("Logging in…");

    const loginRes = await axios.post(
      `${API_BASE}/api/auth/login`,
      {
        email: USER_EMAIL,
        password: USER_PASSWORD,
      },
      { withCredentials: true }
    );

    const cookie = loginRes.headers["set-cookie"][0];
    console.log("✔ Logged in. Cookie received.");

    // --------------------------------------
    // 2️⃣ Fetch vehicle makes
    // --------------------------------------
    console.log("Fetching vehicle makes…");
    const makesRes = await axios.get(`${API_BASE}/api/carbon/vehicle_makes`);

    const makes = makesRes.data.data.map((m) => ({
      id: m.data.id,
      name: m.data.attributes.name,
    }));

    const chosenMakes = makes.sort(() => 0.5 - Math.random()).slice(0, 3);
    console.log("Chosen makes:", chosenMakes.map((m) => m.name).join(", "));

    const modelCache = {};

    // --------------------------------------
    // 3️⃣ Create trips
    // --------------------------------------
    for (let i = 0; i < NUMBER_OF_TRIPS; i++) {
      const make = random(chosenMakes);

      if (!modelCache[make.id]) {
        const modelsRes = await axios.get(
          `${API_BASE}/api/carbon/vehicle_makes/${make.id}/models`
        );

        modelCache[make.id] = modelsRes.data.data.map((m) => ({
          id: m.data.id,
          name: m.data.attributes.name,
        }));
      }

      const model = random(modelCache[make.id]);

      const payload = {
        vehicleModelId: model.id,
        vehicleCategory: random(CATEGORIES),
        distance: randomDistance(),
        distanceUnit: "km",
        duration: randomDuration(),
        tripPurpose: random(TAGS),
      };

      console.log(`→ Trip ${i + 1}/${NUMBER_OF_TRIPS}`);

      await axios.post(`${API_BASE}/api/vehicle/add`, payload, {
        headers: { Cookie: cookie },
      });

      await sleep(200); // avoid Carbon API rate-limit
    }

    console.log("\n🎉 SEED COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("❌ Seed error:", err.response?.data || err.message);
  }
})();
