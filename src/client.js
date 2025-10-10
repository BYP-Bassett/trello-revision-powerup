/* global TrelloPowerUp */
const t = window.TrelloPowerUp.iframe();

// Helper: get today's date as MMDDYY
function getTodayCode() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}${dd}${yy}`;
}

// Core logic for adding a revision checklist
async function addRevisionChecklist(t) {
  try {
    const card = await t.card("id");
    const cardId = card.id;
    const today = getTodayCode();

    const key = "1be39412b849834d44697603a52cc7c5";   // your Trello API key
    const token = "ATTA6956a284829854200183a3fba8f04af39a22c6a4206d297e55f7cd1a826c11c4936CB7F4";                 // ⚠️ real token here, repo private!

    // Get existing checklists
    const response = await fetch(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${key}&token=${token}`
    );
    const lists = await response.json();

    // Find highest revision number
    let maxR = 0;
    lists.forEach(list => {
      const match = list.name.match(/-R(\\d+)/);
      if (match) {
        const rNum = parseInt(match[1]);
        if (rNum > maxR) maxR = rNum;
      }
    });

    const nextR = maxR + 1;
    const newName = maxR === 0 ? today : `${today}-R${nextR}`;

    // Create new checklist
    await fetch(
      `https://api.trello.com/1/checklists?idCard=${cardId}&name=${encodeURIComponent(newName)}&key=${key}&token=${token}`,
      { method: "POST" }
    );

    t.alert({ message: `Checklist added: ${newName}`, duration: 4 });
  } catch (err) {
    console.error("Error adding revision checklist:", err);
    t.alert({ message: "Error adding revision checklist", duration: 6 });
  }
}

// Initialize Trello Power-Up and register button
window.TrelloPowerUp.initialize({
  "card-buttons": function (t, options) {
    return [
      {
        icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
        text: "Add Revision Checklist",
        callback: function (t) {
          return addRevisionChecklist(t);
        }
      }
    ];
  }
});
