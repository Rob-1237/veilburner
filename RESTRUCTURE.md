 Analysis

  The Two Icon Systems

  1. Section Toggle Icons (Expand/Collapse entire sections)
  - Location: Lines 356-387 in archive.astro
  - Icons: 🜃 (minus) and 🜁 (plus) via ::before

  2. Review Card Toggle Icons (Expand/Collapse individual review cards)
  - Location: Lines 506-533 in archive.astro
  - Icons: 🜁 (plus) and 🜃 (minus) via ::before

  Current Implementation

  Both use the same technique:

  .section-toggle-icon {
    display: inline-block;
    position: relative;
    transition: transform 0.3s ease;
  }

  // When collapsed, hide HTML content and show icon via ::before
  &.collapsed .section-toggle-icon {
    font-size: 0; // Hide the HTML icon

    &::before {
      content: '🜁';
      font-size: 1.5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); // ← Should center it

      @media (max-width: 768px) {
        font-size: 1.3125rem;
      }
    }
  }

  // Rotation on hover
  &__toggle:hover .section-toggle-icon {
    transform: rotate(180deg); // ← Rotation applied to parent
  }

  The Problem

  When collapsed:
  - Parent .section-toggle-icon has font-size: 0
  - Child ::before has position: absolute with transform: translate(-50%, -50%)
  - Hover applies transform: rotate(180deg) to parent
  - Issue: The rotation pivot is calculated from the parent's dimensions, which is essentially a 0-height element

  When expanded:
  - Parent .section-toggle-icon has actual font-size (contains the HTML character)
  - The icon renders inline, giving the parent proper dimensions
  - Rotation pivot is centered correctly

  Why This Happens

  The transform-origin defaults to center center (50% 50%), but "center" is relative to the element's bounding box. When font-size: 0 is applied, the bounding box collapses, causing the visual center to shift.

  ---
  Possible Fixes

  Option 1: Set Explicit transform-origin (Simplest)

  Add to both icon classes:

  .section-toggle-icon,
  .toggle-icon {
    display: inline-block;
    position: relative;
    transition: transform 0.3s ease;
    transform-origin: center center; // ← Explicit declaration
    width: 1.5rem;  // ← Give it fixed dimensions
    height: 1.5rem;

    @media (max-width: 768px) {
      width: 1.3125rem;
      height: 1.3125rem;
    }
  }

  Why it works:
  - Fixed width and height give the parent a stable bounding box
  - Even with font-size: 0, the element has dimensions
  - transform-origin: center center now has a consistent reference point

  Pros:
  - ✅ Simple, 2-line fix
  - ✅ No structural changes needed
  - ✅ Works in all states

  Cons:
  - ⚠️ Hardcoded dimensions must match icon size

  ---
  Option 2: Apply Rotation to ::before Instead (More Robust)

  Move the rotation from parent to the pseudo-element:

  .section-toggle-icon {
    display: inline-block;
    position: relative;
    // Remove: transition: transform 0.3s ease;
  }

  &.collapsed .section-toggle-icon {
    font-size: 0;

    &::before {
      content: '🜁';
      font-size: 1.5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform 0.3s ease; // ← Add transition here

      @media (max-width: 768px) {
        font-size: 1.3125rem;
      }
    }
  }

  // Rotate the ::before, not the parent
  &__toggle:hover .section-toggle-icon::before {
    transform: translate(-50%, -50%) rotate(180deg); // ← Combine transforms
  }

  // Also need hover for non-collapsed state
  &__toggle:hover .section-toggle-icon:not(.collapsed) {
    transform: rotate(180deg); // Keep existing behavior for expanded
  }

  Why it works:
  - Rotation happens on the actual icon element (::before), which has dimensions
  - No dependency on parent bounding box

  Pros:
  - ✅ Most accurate to the visual element
  - ✅ No hardcoded dimensions needed

  Cons:
  - ❌ More complex (need to handle both states separately)
  - ❌ Must combine translate and rotate transforms
  - ❌ More CSS to maintain

  ---
  Option 3: Use Flexbox Centering (Alternative Architecture)

  Replace absolute positioning with flexbox:

  .section-toggle-icon {
    display: inline-flex; // ← Changed from inline-block
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
      width: 1.3125rem;
      height: 1.3125rem;
    }
  }

  &.collapsed .section-toggle-icon {
    &::before {
      content: '🜁';
      font-size: 1.5rem;
      // Remove: position: absolute;
      // Remove: top/left/transform

      @media (max-width: 768px) {
        font-size: 1.3125rem;
      }
    }
  }

  // Rotation stays on parent
  &__toggle:hover .section-toggle-icon {
    transform: rotate(180deg);
  }

  Why it works:
  - Flexbox naturally centers content
  - Fixed dimensions give stable rotation origin
  - No absolute positioning complexity

  Pros:
  - ✅ Clean, modern approach
  - ✅ No transform-origin issues
  - ✅ Easier to maintain

  Cons:
  - ⚠️ Requires removing font-size: 0 trick (icons might need different approach)
  - ⚠️ Might need to adjust for non-collapsed state

  ---
  My Recommendation

  Go with Option 1 (Explicit transform-origin + Fixed Dimensions)

  Why:
  1. ✅ Minimal change - Just 4 lines of CSS added
  2. ✅ Low risk - Doesn't change the existing architecture
  3. ✅ Works immediately - No need to refactor pseudo-element logic
  4. ✅ Consistent - Same fix works for both icon systems

  Implementation:

  Add to archive.astro styles (lines 356-360 and 506-510):

  .section-toggle-icon {
    display: inline-block;
    position: relative;
    transition: transform 0.3s ease;
    width: 1.5rem;           // ← Add this
    height: 1.5rem;          // ← Add this
    transform-origin: center; // ← Add this (optional, but explicit)

    @media (max-width: 768px) {
      width: 1.3125rem;      // ← Add this
      height: 1.3125rem;     // ← Add this
    }
  }

  .toggle-icon {
    display: inline-block;
    position: relative;
    transition: transform 0.3s ease;
    width: 1.125rem;         // ← Add this (matches font-size: 1.125rem on line 491)
    height: 1.125rem;        // ← Add this
    transform-origin: center; // ← Add this
  }

  ---
  My Opinion: Should You Fix It?

  Yes, fix it. Here's why:

  1. UX Polish - It's a noticeable visual quirk that makes the UI feel unpolished
  2. Low Effort - Option 1 is literally 6 lines of CSS
  3. No Risk - Fixed dimensions are already defined in font-size, just moving them to width/height
  4. Professional - Small details like this separate good UIs from great ones

  This is not heavy lifting - it's a simple fix that will make the animations feel much more refined.

  Want me to implement Option 1?


  https://www.instagram.com/veilburner_official/