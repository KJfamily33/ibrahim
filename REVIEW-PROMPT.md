# End-to-End Review Prompt for Ibrahim.help

Copy everything below this line and paste into a new Claude Code session:

---

## MISSION CRITICAL REVIEW

You are reviewing **ibrahim.help** - a medical fundraising website for Sheikh Ibrahim Ali, a Libyan Islamic scholar who needs €25,000 for urgent cancer surgery. This site needs to be FLAWLESS because:

1. **High-value donors** - Gulf Arab executives (Saudi PIF, UAE banks, Kuwaiti charities) are the target audience
2. **Trust is everything** - Any bug or broken UI destroys credibility instantly
3. **Mobile-first** - Many donors will view on phones
4. **Bilingual** - Must work perfectly in both English and Arabic (RTL)
5. **Time-sensitive** - Ibrahim needs surgery before Ramadan

## YOUR TASK

Perform a comprehensive end-to-end review of this Next.js 16 / React 19 / Tailwind 4 webapp. Be RUTHLESS. Find every issue. Fix everything.

## REVIEW CHECKLIST

### 1. FUNCTIONALITY TESTING
Run the dev server and manually test EVERY page and feature:

```bash
cd /home/jesse/dev/projects/personal/Ibrahim/webapp
pnpm dev
```

Test these pages:
- [ ] `/` - Main landing page (hero, story, medical, donate, docs sections)
- [ ] `/admin` - ZakatSeal admin form (test with password "ibrahim2025")
- [ ] `/donors` - Donor wall (should show stats even if empty)
- [ ] `/verify/[hash]` - Create a test donation via admin, then verify the link works

Test these flows:
- [ ] Scroll through entire landing page - smooth parallax? No jumps?
- [ ] Click all navigation links - do they scroll to correct sections?
- [ ] Click "Help Him Heal" CTA - goes to donate section?
- [ ] Click WhatsApp button - opens correct number?
- [ ] Test admin form - create donation, get verification URL, verify it works
- [ ] Test donor wall - shows the donation you just created?

### 2. RESPONSIVE DESIGN (CRITICAL)
Test at these breakpoints - NOTHING should break:

```
Mobile: 375px (iPhone SE)
Mobile: 390px (iPhone 14)
Mobile: 414px (iPhone 14 Plus)
Tablet: 768px (iPad)
Tablet: 1024px (iPad Pro)
Desktop: 1280px
Desktop: 1440px
Desktop: 1920px
```

Check for:
- [ ] Text overflow / truncation issues
- [ ] Buttons too small to tap on mobile
- [ ] Images not scaling properly
- [ ] Horizontal scroll (should NEVER happen)
- [ ] Touch targets at least 44px
- [ ] Parallax effects not janky on mobile
- [ ] Video background works on mobile (or graceful fallback)

### 3. RTL / ARABIC SUPPORT
The site has Arabic content. Verify:
- [ ] Arabic text renders correctly (not broken characters)
- [ ] Arabic typography is appropriate (not generic fonts)
- [ ] Spacing looks right for Arabic content
- [ ] Any RTL-specific styling issues?

### 4. PERFORMANCE
- [ ] Run Lighthouse audit (aim for 90+ on all metrics)
- [ ] Check for unnecessary re-renders
- [ ] Verify images are optimized (use Next.js Image component where missing)
- [ ] Check bundle size - any bloat?
- [ ] Video loading - does it have poster/fallback?

### 5. CODE QUALITY
Review all files for:
- [ ] TypeScript errors (run `pnpm build`)
- [ ] Unused imports/variables
- [ ] Console.log statements that shouldn't be there
- [ ] Hardcoded values that should be env vars
- [ ] Missing error handling
- [ ] Accessibility issues (alt tags, ARIA labels, focus states)

### 6. ZAKATSEAL SYSTEM
The donation receipt system at `/admin`, `/donors`, `/verify/[hash]`:
- [ ] Admin form validates all fields properly
- [ ] Error messages are clear and helpful
- [ ] Success state shows verification URL clearly
- [ ] Copy button works
- [ ] Verification page displays all data correctly
- [ ] Anonymous donations show "متبرع كريم" not real name
- [ ] Donor wall loads and displays correctly
- [ ] Stats calculate correctly
- [ ] Currency conversion is reasonable

### 7. SECURITY
- [ ] Admin password not exposed in client code
- [ ] No sensitive data in git (check .gitignore)
- [ ] API routes have proper validation
- [ ] No XSS vulnerabilities in user input display

### 8. EDGE CASES
- [ ] Empty states (no donations yet)
- [ ] Very long donor names
- [ ] Very large donation amounts
- [ ] Special characters in dedication messages
- [ ] Invalid hash in /verify/[hash] shows 404 properly

## FILES TO REVIEW

```
app/
├── page.tsx              # Main landing page - MOST CRITICAL
├── layout.tsx            # Root layout
├── globals.css           # All styles
├── admin/page.tsx        # ZakatSeal admin
├── donors/page.tsx       # Donor wall
├── verify/[hash]/page.tsx # Verification pages
└── api/zakat/
    ├── record/route.ts   # Create donation API
    └── donors/route.ts   # List donors API

components/
├── falcon-hero.tsx       # Hero section with video
├── journey-section.tsx   # Parallax section wrapper
├── islamic-divider.tsx   # Decorative dividers
└── ui/                   # shadcn components

lib/
└── zakat-store.ts        # Donation storage

public/images/journey/    # Section background images
```

## OUTPUT FORMAT

After your review, provide:

1. **CRITICAL ISSUES** - Must fix before launch (breaks functionality)
2. **HIGH PRIORITY** - Should fix (poor UX but works)
3. **MEDIUM PRIORITY** - Nice to fix (polish items)
4. **LOW PRIORITY** - Minor improvements

For each issue:
- File and line number
- What's wrong
- How to fix it
- Fix it immediately if it's critical

## CONSTRAINTS

- Do NOT delete any existing functionality
- Do NOT change the visual design direction (green/gold Islamic aesthetic)
- Do NOT add new features - just fix and polish existing ones
- Do NOT over-engineer - keep it simple
- PRESERVE all Arabic text exactly as-is

## START NOW

Begin by:
1. Running `pnpm dev` to start the dev server
2. Opening the site in browser at localhost:3000
3. Testing every page and flow systematically
4. Reading through each file looking for issues
5. Fixing as you go, tracking what you've done

Be thorough. Be ruthless. Make this site worthy of billionaire donors.

---

END OF PROMPT
