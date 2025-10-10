/* global TrelloPowerUp */
const t = window.TrelloPowerUp.iframe();

// helper: get today's date as MMDDYY
function getTodayCode() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}${dd}${yy}`;
}

// call your Google Apps Script endpoint instead of Trello API directly
async function addRevisionChecklist(t) {
  try {
    const card = await t.card("id");
    const payload = {
      action: "revision",
      cardId: card.id,
      secret: "YOUR_ENDPOINT_SECRET" // this stays on your Apps Script side
    };

    const response = await fetch("YOUR_APPS_SCRIPT_WEBAPP_URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.text();
    console.log("Server response:", result);
    t.alert({ message: "Revision checklist added.", duration: 4 });
  } catch (err) {
    console.error("Error adding revision checklist:", err);
    t.alert({ message: "Error adding revision checklist", duration: 6 });
  }
}

window.TrelloPowerUp.initialize({
  "card-buttons": function () {
    return [
      {
        icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
        text: "Add Revision Checklist",
        callback: addRevisionChecklist
      }
    ];
  }
});
