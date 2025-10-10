/* global TrelloPowerUp */
const t = TrelloPowerUp.iframe();

function getTodayCode() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}${dd}${yy}`;
}

async function addRevisionChecklist() {
  try {
    const card = await t.card("id");
    const payload = {
      action: "revision",
      cardId: card.id,
      secret: "YOUR_ENDPOINT_SECRET"
    };

    await fetch(
      "https://script.google.com/macros/s/AKfycbzQiG-5XNdwT1ZKgD_uJcrNYlG3YlC_wqivkCj_gIkwy5fdfI1Q9BVKyaMqVPWk3Il5tw/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    t.alert({ message: "Checklist added successfully.", duration: 4 });
  } catch (err) {
    console.error("Error adding revision checklist:", err);
    t.alert({ message: "Error trying to create checklist.", duration: 6 });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addRevisionChecklist();
});
