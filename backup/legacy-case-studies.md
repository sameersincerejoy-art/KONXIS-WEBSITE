# Legacy case-study content — internal archive

**Status:** Removed from the public website on 12 November 2026 and replaced by the curated
two-study portfolio. This archive is not deployed and must not be published.

**Purpose:** Retain the former portfolio content until the owner confirms whether it should be
permanently deleted.

**Important:** Every entry below was labelled *Technical demonstration* on the former site.
None was a completed client project. The old homepage also presented six of these entries
(Cases 04, 07, 10, 13, 14 and 16) as featured investigations.

---

## Former introduction

**Eyebrow:** Case Studies
**Heading:** Engineering Problems We Solve
**Lede:** From difficult engineering questions to defensible decisions.

The most valuable engineering analysis is not the most complicated model. It is the analysis
that explains what is actually controlling the problem — and gives your team enough evidence to
decide what to change.

Our case studies cover structural failure, nonlinear behaviour, impact, buckling, fatigue,
damage tolerance and vibration. Each is built around a real engineering question:

> What is happening? Why is it happening? What evidence do we need? And what should change as a
> result?

### Former evidence language

- **Technical demonstration** — an engineering investigation developed to demonstrate the
  analytical method, reasoning and approach to validation. Inputs are illustrative unless
  stated otherwise.
- **Client case study** — a completed engagement using authorised client information and
  approved results.
- **Professional experience** — relevant engineering experience gained through previous
  professional work; not presented as work performed by this company.

Portfolio note stated that the portfolio primarily contained technical demonstrations, with
assumed geometry, loading, material properties and acceptance criteria identified rather than
presented as measured client data.

### Former themes

1. Nonlinear structural behaviour
2. Impact & transient events
3. Buckling & structural stability
4. Fatigue & damage tolerance
5. Vibration & structural dynamics

---

## Featured investigations (former homepage and page)

### Case 01 — Preventing permanent deformation after overload
**Component:** Support arm for industrial machinery · **Industry:** Industrial equipment
**Problem:** A steel support arm performs acceptably in normal operation but can remain
permanently bent after an occasional overload.
**Question:** Is the problem caused by material yielding, excessive flexibility, an incorrect
load assumption or movement at the attachment?
**Investigate:** Start with an independent load-path and beam calculation, then establish whether
the real assembly requires nonlinear material behaviour, contact and attachment flexibility. The
critical quantity is not simply peak stress — it is residual alignment after unloading.
**Outcome:** A validated load–unload response, a practical geometry change and a clear acceptance
limit for permanent set.

### Case 02 — Understanding why a bolted joint leaks
**Component:** Pump cover and O-ring sealing · **Industry:** Pumps & process equipment
**Problem:** Increasing bolt torque does not consistently stop an intermittent leak.
**Question:** Is the problem insufficient preload, cover deformation, uneven contact, seal
geometry, assembly variation or seal damage?
**Investigate:** The cover, bolts, housing and O-ring are treated as one load path. Bolt preload
changes cover deformation; pressure redistributes bolt loads; cover opening changes seal squeeze.
**Outcome:** A diagnosis of the governing leakage mechanism, validated sealing behaviour and a
design or assembly change that addresses the cause rather than simply increasing torque.
**Pull quote:** Total bolt preload does not guarantee continuous sealing contact.
**Evidence note:** Analytical screening completed; FE, material characterisation and leak testing
remain proposed validation.

### Case 03 — When low stress does not mean low risk
**Component:** Vacuum tank structural stability · **Industry:** Process equipment
**Problem:** A thin-walled tank can show relatively low membrane stress under external pressure
while still being vulnerable to buckling.
**Question:** What happens when real imperfections, support conditions, geometric nonlinearity
and material behaviour are included?
**Investigate:** Separate three questions: basic pressure and load paths; possible instability
modes; and sensitivity of the actual structure to imperfections and restraints. Linear buckling
is used as a screening tool, not treated automatically as the physical collapse load.
**Outcome:** A credible stability envelope, identification of the controlling imperfection or
detail and a targeted reinforcement or process solution.
**Evidence note:** No FE collapse pressure or physical validation result is claimed.

---

## Group 01 — Nonlinear structural analysis
**Section heading:** When linear assumptions stop being enough

### Case 04 — Controlling die opening in a large casting cell
**Industry:** Manufacturing / die casting
**Question:** Can a large die-casting machine maintain the required closure and alignment across
pressure, clamp-force imbalance and thermal conditions?
**Content:** Examines eccentric cavity pressure, tie-bar load sharing, machine/die stiffness and
thermal distortion. A simple force calculation shows why nominal clamp force alone is not
enough: an eccentric pressure resultant introduces an opening moment.
**Client value:** An operating envelope, identification of the controlling compliance and
evidence for machine, tooling or process changes.
**Evidence note:** Illustrative machine and die inputs.

### Case 05 — Protecting a battery enclosure without adding unnecessary mass
**Industry:** Automotive / EV
**Question:** How can an enclosure resist slow underbody intrusion while controlling deformation,
joint behaviour and mass?
**Content:** Focus on plastic deformation, large displacement, contact and potential joint or
interface damage. The objective is not simply "make it stronger" but to identify where material
is required, where deformation can be accepted and which change gives the best
protection-to-mass trade-off.
**Client value:** A validated structural redesign and evidence for subsequent abuse testing.
**Evidence note:** Illustrative inputs; representative hardware testing is required for
qualification.

### Case 06 — Qualifying a bearing under combined loading
**Industry:** Infrastructure / civil structures
**Question:** What compression, horizontal movement and rotation can a bearing sustain when these
actions occur together?
**Content:** Considers hyperelastic behaviour, near-incompressibility, geometric effects,
reinforcement and interface integrity. The important output is a qualified
compression–movement–rotation envelope supported by physical testing.
**Client value:** A defensible product envelope, manufacturing tolerances and a qualification
plan.
**Evidence note:** Final capacity requires material characterisation, FE correlation and
combined-load testing.

---

## Group 02 — Impact & transient analysis
**Section heading:** When mass, inertia and contact decide the outcome

### Case 07 — Designing controlled crash energy absorption
**Industry:** Rail / rolling stock
**Question:** Can a replaceable crash module absorb the required impact energy while controlling
force, deformation and anti-climber engagement?
**Content:** Combines progressive crushing, offset loading, weld behaviour and material
characterisation. Independent energy and momentum checks establish the scale of the problem
before detailed simulation.
**Client value:** A crash-module design, variation matrix and physical validation plan.
**Evidence note:** Not a certified rail crashworthiness result.

### Case 08 — Containing a failed rotating component
**Industry:** Rotating machinery
**Question:** Can a compressor casing contain a rotor fragment without excessive mass or creating
an escape path through the flange or axial closure?
**Content:** Accounts for rotational energy, fragment translation and spin, impact location,
containment deformation and joint behaviour. A cylindrical wall alone is not necessarily the
containment system; flanges, bolts, liners and axial exits can become the governing path.
**Client value:** A mass-efficient containment architecture and a release-scenario test matrix.
**Evidence note:** Assumed rotor and containment inputs; no containment qualification is claimed.

### Case 09 — Protecting a liquid-filled process skid during transport
**Industry:** Process equipment
**Question:** How should a tank and its liquid contents be protected during an accidental drop or
corner landing?
**Content:** Structure, mounts, liquid free surface and headspace can interact dynamically.
Treating the liquid as added rigid mass can hide the mechanism that loads a nozzle or weld.
Approach: coupled structural and fluid analysis including free-surface motion, impact, mount
response and transport-foot behaviour.
**Client value:** A transport handling envelope, sacrificial protection design and
evidence-based replacement criteria after an incident.
**Evidence note:** CEL analysis and physical impact validation would be required for release
decisions.

---

## Group 03 — Stability & buckling
**Section heading:** When instability governs before strength does

### Case 10 — Increasing crane reach without unnecessary structural mass
**Industry:** Heavy equipment / cranes
**Question:** Is the limitation caused by global bending, local plate buckling or contact at the
telescopic overlap?
**Content:** Examines boom geometry, sliding-pad contact, imperfections and local stiffness. A
higher-strength steel grade does not automatically solve an elastic stability problem; changing
the load introduction or contact arrangement can be more effective than adding material.
**Client value:** A stability-driven redesign, mass/clearance budget and operating envelope.
**Evidence note:** Design objective is illustrative, not a measured improvement.

### Case 11 — Preventing local silo buckling during eccentric discharge
**Industry:** Bulk solids / process equipment
**Question:** Can throughput be increased without creating a local shell instability during
asymmetric flow?
**Content:** A uniform pressure assumption can remove the mechanism that needs investigation.
Considers spatial pressure and friction effects, shell imperfections and local axial compression.
Possible interventions: flow-control changes, targeted reinforcement, load-distributing rings or
local repair.
**Client value:** A supported choice between process modification, targeted structural work and
operating restriction.
**Evidence note:** Actual bulk-material behaviour and structural measurements are required.

### Case 12 — Keeping a shallow roof stable during erection
**Industry:** Structural steel / infrastructure
**Question:** Can a long-span shallow roof remain stable while temporary supports are released
and construction stages change?
**Content:** The completed structure is not necessarily the critical condition. Support release,
connection completion, member imperfections, temporary loads and loss of geometric restraint can
create a different load path.
**Client value:** A validated erection sequence, temporary-support limits and structural release
criteria.
**Evidence note:** Construction sequence and temporary-works design require project-specific
validation.

---

## Group 04 — Fatigue & damage tolerance
**Section heading:** When repeated loading decides the service life

### Case 13 — Extending the life of a mining-truck chassis
**Industry:** Mining / heavy equipment
**Question:** How can recurring chassis cracking be addressed without simply adding reinforcement
everywhere?
**Content:** Connects measured duty spectra with local weld stresses and fatigue damage. The
largest individual load is not necessarily the dominant contributor to cumulative damage; the
frequency and stress range of repeated events matter.
**Client value:** A fatigue-critical detail assessment, targeted weld/detail redesign,
fabrication requirements and a defensible service-life basis.
**Evidence note:** Supplied duty spectrum and material data are illustrative; field strain
measurement and real weld detail data are required.

### Case 14 — Managing a flaw in a hydraulic press tie rod
**Industry:** Heavy machinery / hydraulic presses
**Question:** If an indication is found near a loaded thread, can the component be safely managed
by inspection — or does it require replacement or redesign?
**Content:** Considers preload, thread load sharing, bending, crack growth, fracture resistance
and inspection capability. The important question is whether the defect can be reliably detected
and managed before the structure loses acceptable load-carrying capacity.
**Client value:** A flaw-disposition method, inspection strategy, maintenance rule and, where
necessary, revised rod/nut design.
**Evidence note:** No operating clearance or inspection interval is claimed from the study alone.

### Case 15 — Preventing bond damage from becoming blade failure
**Industry:** Wind energy / composites
**Question:** How can a manufacturing defect in a blade bond be assessed without relying on
adhesive thickness alone?
**Content:** Considers mixed-mode debonding, changing structural stiffness, environmental effects
and residual strength. The objective is a defensible defect and repair envelope rather than a
thicker adhesive layer.
**Client value:** A damage-tolerance framework, manufacturing controls, inspection criteria and
qualification programme.
**Evidence note:** Composite material data, representative blade testing and inspection
capability are required.

---

## Group 05 — Vibration & structural dynamics
**Section heading:** When operating range is limited by response, not strength

### Case 16 — Recovering operating range from excessive pump vibration
**Industry:** Pumps / rotating machinery
**Question:** Is the vibration caused by the excitation source, structural resonance, joint
flexibility, piping interaction — or a combination?
**Content:** The first engagement can be deliberately focused: measure before redesigning. Order
tracking, installed FRFs, operating deflection measurements and structural modelling can
separate forcing from resonance before fabrication changes.
**Client value:** A root-cause diagnosis, correlated structural model, retrofit options and a
verified operating envelope.
**Evidence note:** Site measurements and installed-system correlation are the proposed evidence.

### Case 17 — Protecting vehicle electronics from vibration
**Industry:** Automotive / electronics
**Question:** How can an inverter or electronics package survive its vibration environment
without excessive mount movement or unnecessary package size?
**Content:** Considers measured excitation spectra, assembly dynamics, mount behaviour and
environmental variation. The objective is to understand the complete vibration path from input
to mount to structure to electronics, rather than designing around a single acceleration number.
**Client value:** Mount requirements, structural response predictions and a qualification
strategy.
**Evidence note:** Representative vibration measurements, mount characterisation and
environmental testing are required.

### Case 18 — Increasing machining stability without sacrificing bore quality
**Industry:** Precision machining
**Question:** What limits stable chip width: tool dynamics, spindle excitation, damping, cutting
coefficients or regenerative chatter?
**Content:** Uses tool-point frequency response, cutting-force identification and stability
analysis. Distinguishes a mathematically predicted stability boundary from a production-ready
machining envelope that must survive cutting trials, tool condition and process variation.
**Client value:** A validated stability map, tool/holder recommendations, operating limits and a
production verification plan.
**Evidence note:** Measured tool dynamics and controlled cutting trials are required before
claiming production improvement.

---

## Former closing content

- **Common ground:** Different industries often have the same underlying engineering problem —
  something is failing; conventional calculation does not explain it; the wrong model can give a
  convincing answer; the useful result is a decision.
- **Approach:** Diagnose · Model · Challenge · Validate · Decide.
- **Deliverables:** Engineering diagnosis; documented analysis model; sensitivity assessment;
  design comparison; validation plan or results; engineering decision.
- **Evidence ladder:** Assumed input · Calculated result · Simulation result · Measured result ·
  Validated result · Released design.
- **Closing statement:** Have a difficult structural, fatigue, vibration, impact or stability
  problem? Start with the engineering question — not the solver.
- **Portfolio note:** Studies were deliberately transparent about evidence status. Technical
  demonstrations used illustrative inputs and were not presented as completed client results.

---

*End of internal archive. For permanent deletion, the owner should confirm in writing.*
