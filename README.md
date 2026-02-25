## Seesaw Simulation

A pure JavaScript physics simulation of a playground seesaw, built as a technical challenge.

You can interact with the live simulation here:  
[https://nurullahgd.github.io/nurullah-gundogdu-seesaw](https://nurullahgd.github.io/nurullah-gundogdu-seesaw)

---

## Overview

The goal of this project is to create an interactive seesaw that responds to user input based on real physics principles (torque) while maintaining a smooth user experience, using only:

- **HTML**
- **CSS**
- **Vanilla JavaScript** (no frameworks, no canvas)

---

## Features

- **Click-based interaction**: Click along the seesaw line to drop weights.
- **Random weights**: Each drop uses a random weight between 1–10 kg, shown as “Next Weight” in the UI.
- **Physics-based tilt**: The seesaw tilts based on torque differences on each side, capped at ±30°.
- **Smooth animation**: Tilt motion and weight drops are animated with CSS transitions.
- **Visual weights**: Each object is rendered as a colored circular weight directly on the plank.
- **Preview indicator**: Moving the mouse over the drop area shows where the next weight will land.
- **State persistence**: Weights, total torques, and current angle are stored in `localStorage`, so the state survives a page refresh.
- **Reset**: One-click reset to clear all weights, logs, angle and localStorage state.

---

## Thought Process & Design Decisions

### Modular Architecture

Instead of a single large script, the logic is split into small modules:

- `physics.js` – Core physics:
  - `randomWeight()`
  - `computeDrop(plankRect, clientX)`
  - `computeState(items)` → torque sums and tilt angle
- `ui.js` – DOM and visuals:
  - Rendering weights on the plank
  - Showing/hiding the preview weight
  - Updating the seesaw angle and stats
- `storage.js` – Persistence:
  - `load()`, `save()`, `clear()` wrappers around `localStorage`
- `main.js` – Orchestration:
  - Wires DOM events to physics and UI
  - Keeps in-memory state (`items`, `nextWeight`)
  - Calls `storage` to persist and restore state

This layout keeps responsibilities clear and makes the code easier to follow, test, and refactor, even in a plain JavaScript environment.

### DOM over Canvas

The visualization is built using **DOM elements** and `transform: rotate(...)` instead of `<canvas>`:

- **Accessibility**: DOM elements are easier to inspect, style, and (if desired later) make accessible.
- **Event handling**: Clicking on the plank (or its hit area) is straightforward with standard event listeners.
- **CSS animations**: Tilt and drop animations are handled via `transition` on `transform`, which modern browsers optimize well.

### Physics Logic (Torque)

The core physics follows the standard torque formula:

\[
\text{Torque} = \text{Weight} \times \text{Distance}
\]

- The **pivot** is the origin.
- Each object stores:
  - `side` (`left` or `right`)
  - `distance` from the pivot (in pixels)
  - `weight` in kilograms
- For each side, torques are summed:

\[
\text{leftTorque} = \sum (w_i \times d_i) \quad\quad
\text{rightTorque} = \sum (w_j \times d_j)
\]

- The angle is derived from the torque difference, scaled and clamped:

```js
const rawAngle = (rightTorque - leftTorque) / 10;
const angle = Math.max(-30, Math.min(30, rawAngle));
```

This produces a visually believable tilt without needing a full physics engine.

### State Persistence

Progress is kept between refreshes via `localStorage`:

- **Stored data**:
  - `items`: array of `{ side, distance, weight }`
  - `nextWeight`: the upcoming random weight
- On load:
  - Stored items are re-rendered in their exact positions.
  - Tilt angle and stats are recomputed from stored items.
  - The next weight is restored if valid; otherwise a new one is generated.
- On each drop:
  - The new item is appended to `items`.
  - Physics and UI are updated.
  - The entire state is written back to `localStorage`.

---

## Trade-offs & Limitations

- **Linear tilt vs. full physics**  
  The seesaw uses a direct linear mapping from torque difference to angle. A more realistic system would simulate angular acceleration, velocity, and damping over time. For a browser-based coding challenge, the linear model is:
  - Easier to reason about
  - More predictable for users
  - Simpler to implement and maintain

- **Simplified collision / stacking**  
  Weights are placed exactly at the clicked horizontal position. There is no advanced collision or stacking logic between weights. This keeps the focus on the seesaw’s balance and torque logic rather than on object–object interactions.

---

## Project Structure

```text
.
├── index.html        # Markup and layout
├── styles/
│   └── style.css     # All styling and animations
└── js/
    ├── main.js       # Entry point, event wiring, app state
    ├── physics.js    # Torque and angle calculations
    ├── ui.js         # DOM updates, rendering, preview
    └── storage.js    # localStorage load/save/clear helpers
```

---

## How to Use

### Running Locally

1. **Clone the repository**

```bash
git clone https://github.com/nurullahgd/nurullah-gundogdu-seesaw.git
cd nurullah-gundogdu-seesaw
```

2. **Open in a browser**

- Simply open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

3. **Interact with the seesaw**

- **Move cursor over the grey seesaw area**  
  A semi-transparent preview weight shows where the next weight will land.
- **Click** within the seesaw area
  - A weight with the current “Next Weight” value drops from the top of the grey field onto the plank.
  - The seesaw tilts based on the updated torque distribution.
  - Stats (left/right total weight, next weight, tilt angle) update.
  - A log entry is added describing the drop (side, distance from center, weight).
- **Reset**
  - Click the `Reset` button to:
    - Clear all weights from the plank
    - Clear the log
    - Reset the tilt to 0°
    - Generate a fresh `Next Weight`
    - Clear `localStorage` for a clean start

Or use the hosted version:

- **Live demo**:  
  [https://nurullahgd.github.io/nurullah-gundogdu-seesaw](https://nurullahgd.github.io/nurullah-gundogdu-seesaw)

---

## AI Usage Disclosure

In line with the project policy, I used AI tools (such as ChatGPT / Gemini) as **assistants**, not as sole authors:

- **CSS styling**:  
  Used to brainstorm and refine the initial layout, color choices, and animation timings, and to sanity-check cross-browser-friendly patterns.

- **Refinement & documentation**:  
  Portions of this README and some naming/wording improvements were drafted with AI assistance and then reviewed and adapted by me.

- **Debugging help**:  
  Consulted AI to quickly spot a few edge cases (e.g., event listener ordering, minor logic mistakes during refactors).

The **core logic**, overall architecture, and final integration decisions were implemented and validated by me.

---

