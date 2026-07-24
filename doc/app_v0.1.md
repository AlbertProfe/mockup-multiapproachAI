# App v0.1 — AI Chatbot Specification

## Phase 2: Initial Chat State (Centered Chat)

Hidden until authenticated. Initially a centered column.

### Components

- **Chat Header:** Title ("AI Assistant") and a hamburger menu to toggle the left sidebar.
- **Chat History:** Displays a welcome message.
- **Input Area:**
  - A **Response Length Selector** (radio buttons, segmented control, or dropdown) allowing the user to select: *Short (~100 words)*, *Medium (~300 words)*, or *Long (~700 words)*. Default to Medium.
  - A text area.
  - A "Send" button.
- **Active Answer Toolbar (Hidden initially):** Placed just below the chat history (above the input area). Contains:
  - A "Download PDF" button.
  - A dynamic "Word Count" display (e.g., "Word count: 0").

### Trigger Event & Message Interaction Logic (JavaScript)

#### Sending a Message

1. Append the user's message.
2. **Read Length Setting:** Check the value of the Response Length Selector.
3. Append a mock AI response. Generate a mock text that roughly matches the requested length (short, medium, or long). **Crucial:** Assign a unique ID to each AI message container (e.g., `data-message-id="msg-1"`). Wrap specific sentences in `<span>` tags with `data-source-id` attributes.
4. Change layout to reveal the Right Column.
5. Automatically trigger the "Select" logic for this newly generated message.

#### Selecting a Message (The Context Switcher)

1. Make AI message bubbles clickable.
2. When clicked, mark the message with an `.active-message` class.
3. **Dynamic Right Column:** Update the *entire* Right Column (Evaluator, Bias Metrics, Sources) using a mock JS data object based on the selected `message-id`.
4. **Active Answer Toolbar Logic:**
   - Calculate the exact word count of the currently active AI message text and update the "Word Count" display in the toolbar.
   - Attach a mock JS function to the "Download PDF" button that triggers a browser `alert()` saying *"Downloading PDF report for [Message ID] including Bias Metrics and Sources..."*.

## Phase 3: Dashboard Layout Components

### Left Column: Collapsible Sidebar

Slides in/out via header menu. Contains a "Dark/Light Mode" toggle switch and dummy links (including "Log Out").

### Center Column: The Chat Interface

Takes up the main viewing area, containing the chat history, the Active Answer Toolbar, and the input area (with length selector).

### Right Column: Verification, Bias & Sources

Updates dynamically based on the *currently selected AI message*. Contains:

#### 1. Statement Evaluator

Cards with an italicized AI quote, status pill (`verified`, `nuanced`, `disputed`), and explanation.

#### 2. AI Bias Metrics

6 visual spectrum bars/sliders with opposing labels and a positioned marker:

| Metric            | Left           | Right       |
| ----------------- | -------------- | ----------- |
| Economic          | Redistribution | Free Market |
| Social            | Progressive    | Traditional |
| Foreign Policy    | Dovish         | Hawkish     |
| Environment       | Green          | Growth      |
| Religion          | Secular        | Religious   |
| National Identity | Cosmopolitan   | Nationalist |

#### 3. Source Attribution Box (Bottom Right)

- Lists sources for the active message.
- Each item includes: Name, Hyperlink, Percentage, and a **Source Type Classification** tag (*Primary*, *Secondary*, or *Tertiary*).
- **Hover Logic:** Hovering over a source highlights the corresponding `data-source-id` span inside the *currently active* AI message.

## Technical Requirements

- **HTML5:** Semantic structure with clear class names and IDs for styling hooks and JS targeting.
- **JavaScript (ES6+):** DOM manipulation, event handling, mock data objects, and layout transitions (no frameworks).
- **CSS:** Responsive three-column dashboard layout, dark mode styles, and animated transitions.
- **Language:** All UI text and mock data in English.