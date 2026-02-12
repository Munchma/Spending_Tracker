# Spending Tracker Website

A mobile-friendly web app for quickly logging purchases at point-of-sale that automatically syncs to Google Sheets.

## Features

- ✅ Quick entry at time of purchase
- ✅ Track spending across 3 cards
- ✅ Optional merchant field
- ✅ Automatic date/time stamping
- ✅ Real-time sync to Google Sheets
- ✅ Pink/coral gradient design (different from payment tracker)

## Google Form Setup

### Create Your Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form titled "Spending Tracker"
3. Add these 4 questions **in this exact order**:

**Question 1: Card Used**
- Type: Multiple choice
- Options:
  - Costco Card
  - TD Card
  - Debit Card
- Required: Yes

**Question 2: Amount**
- Type: Short answer
- Required: Yes

**Question 3: Merchant**
- Type: Short answer
- Required: No

**Question 4: Date**
- Type: Short answer
- Required: Yes

4. Link to Google Sheet:
   - Click "Responses" tab
   - Click "Create Spreadsheet"
   - This creates your spending log!

### Get Your Form Configuration

1. Click the 3 dots (⋮) → **Get pre-filled link**
2. Fill in test data:
   - Card Used: Costco Card
   - Amount: 25.50
   - Merchant: Costco
   - Date: 2026-02-08 19:30:00
3. Click **Get Link** and copy the URL

4. Modify the URL:
   - Change `viewform` to `formResponse`
   - Example:
     ```
     https://docs.google.com/forms/d/e/ABC123XYZ/formResponse?
     usp=pp_url&
     entry.123456789=Costco%20Card&
     entry.987654321=25.50&
     entry.555555555=Costco&
     entry.111111111=2026-02-08%2019:30:00
     ```

5. Extract your entry IDs:
   - Card Type: `entry.123456789` (first number)
   - Amount: `entry.987654321` (second number)
   - Merchant: `entry.555555555` (third number)
   - Date: `entry.111111111` (fourth number)

## Configure the Website

1. Open `spending-script.js` in a text editor
2. Update these values:

```javascript
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

const ENTRY_IDS = {
    cardType: 'entry.123456789',   // Your card type entry ID
    amount: 'entry.987654321',      // Your amount entry ID
    merchant: 'entry.555555555',    // Your merchant entry ID
    date: 'entry.111111111'         // Your date entry ID
};
```

## Deploy to GitHub Pages

### Option 1: New Repository (Recommended)

1. Create a new repository on GitHub: `spending-tracker`
2. Upload these files:
   - Rename `spending-index.html` → `index.html`
   - Rename `spending-styles.css` → `styles.css`
   - Rename `spending-script.js` → `script.js`
   - Include `README.md`

3. Enable GitHub Pages:
   - Settings → Pages
   - Source: main branch, /root folder
   - Save

4. Your site will be at:
   `https://YOUR_USERNAME.github.io/spending-tracker/`

### Option 2: Same Repository, Different Page

If you want both trackers in one repo:

1. In your existing `BUDGET_INPUT` repo, create a `spending` folder
2. Put these files inside:
   - `spending/index.html`
   - `spending/styles.css`
   - `spending/script.js`

3. Access at:
   `https://YOUR_USERNAME.github.io/BUDGET_INPUT/spending/`

## Usage

### Quick Logging at Point of Sale:

1. Open the website on your phone
2. (Optional) Enter where you're shopping
3. Enter the amount for whichever card you used
4. Tap "Log Spending"
5. Done! Takes 5 seconds

### Example Scenarios:

**Scenario 1: Costco Run**
- Merchant: "Costco"
- Costco Card: $156.78
- Submit

**Scenario 2: Coffee with Debit**
- Merchant: "Tim Hortons"
- Debit Card: $4.50
- Submit

**Scenario 3: Split Payment**
- Merchant: "Home Depot"
- TD Card: $100
- Debit Card: $45.23
- Submit
(This creates TWO entries in your sheet)

## Your Google Sheet

After submissions, your sheet will have:

| Timestamp | Card Used | Amount | Merchant | Date |
|-----------|-----------|--------|----------|------|
| 2/8/2026 14:30 | Costco Card | 156.78 | Costco | 2026-02-08 14:30:00 |
| 2/8/2026 16:45 | Debit Card | 4.50 | Tim Hortons | 2026-02-08 16:45:00 |

## Connecting to Your Budget

Use QUERY formulas in your main budget sheet:

**Total spent on Costco Card:**
```
=QUERY(IMPORTRANGE("SHEET_ID", "Sheet1!B:C"), "SELECT SUM(Col2) WHERE Col1 = 'Costco Card' LABEL SUM(Col2) ''")
```

**Total spent on TD Card:**
```
=QUERY(IMPORTRANGE("SHEET_ID", "Sheet1!B:C"), "SELECT SUM(Col2) WHERE Col1 = 'TD Card' LABEL SUM(Col2) ''")
```

**Total spent on Debit:**
```
=QUERY(IMPORTRANGE("SHEET_ID", "Sheet1!B:C"), "SELECT SUM(Col2) WHERE Col1 = 'Debit Card' LABEL SUM(Col2) ''")
```

## Mobile Tips

- **Add to Home Screen** (iOS):
  - Safari → Share → Add to Home Screen
  - Name it "💰 Spending"
  
- **Quick Access**:
  - Keep both payment tracker and spending tracker on your home screen
  - Use different emoji to tell them apart

- **At Checkout**:
  - Open app while in line
  - Enter amount right after paying
  - Merchant field is optional if you're in a rush

## Differences from Payment Tracker

| Feature | Payment Tracker | Spending Tracker |
|---------|----------------|------------------|
| Purpose | Debt payments | Daily purchases |
| Color | Purple gradient | Pink/coral gradient |
| Icon suggestion | 💳 | 💰 |
| Frequency | Monthly/as needed | Multiple times daily |
| Merchant field | No | Yes (optional) |

## Troubleshooting

**Issue: Nothing appearing in Google Sheet**
- Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check that form URL has `formResponse` not `viewform`
- Verify entry IDs match exactly

**Issue: Wrong columns**
- Entry IDs must match the question order in your form
- Double-check the pre-filled link and extract IDs carefully

**Issue: Can't find the website**
- GitHub Pages takes 1-2 minutes to deploy
- Check Settings → Pages for the live URL

## Pro Tips

- The merchant field is optional but helpful for later analysis
- You can enter multiple cards in one submission (like split payments)
- Pressing Enter moves to the next field
- Leave any card blank if you didn't use it

---

Built to make expense tracking effortless 💰
