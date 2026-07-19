# Moveto visual system

Moveto is a Korean file-transfer product. Its visual signature is **luminous kinetic minimalism**: files travel along one cobalt route across a true-white canvas, making an invisible transfer feel tangible without making the interface busy.

The source-of-truth concepts are:

- `design/concepts/moveto-home-first-viewport.png` — header, hero, upload workspace, receive-code panel, next-section preview.
- `design/concepts/moveto-home-journey.png` — three-step transfer journey, closing band, footer.

## Principles

1. The real upload workflow is the hero. Do not wrap a marketing page around it.
2. Keep the canvas airy and editorial. One strong route motif is better than many decorative widgets.
3. Motion explains transfer: paths draw, file objects travel, and state changes settle into place.
4. Every label, control, and action remains code-native, accessible, responsive, and usable.
5. Respect `prefers-reduced-motion`; the static composition must remain complete without animation.

## Color tokens

| Role                | Light                    | Dark                      |
| ------------------- | ------------------------ | ------------------------- |
| Canvas              | `#ffffff`                | `#070b12`                 |
| Soft canvas         | `#f7f9fd`                | `#0c111c`                 |
| Elevated surface    | translucent white        | translucent `#111827`     |
| Primary text        | `#0b0d12`                | `#f7f9fc`                 |
| Secondary text      | `#5b6472`                | `#aab4c3`                 |
| Hairline            | `#dfe4ec`                | `#283244`                 |
| Cobalt route/action | `#1463ff`                | `#5f8fff`                 |
| Cobalt soft         | `rgba(20, 99, 255, .08)` | `rgba(95, 143, 255, .12)` |
| Coral micro-accent  | `#ff725f`                | `#ff806f`                 |
| Mint micro-accent   | `#43d7bb`                | `#50e0c4`                 |

Coral and mint are punctuation, never competing action colors. Purple, warm cream, neon grids, and broad color washes are outside this system.

## Typography

- Family: local Pretendard Variable with system sans fallbacks.
- Hero: `clamp(2.55rem, 5.4vw, 5rem)`, weight 850, line-height .94, tracking -.065em.
- Section display: `clamp(2.4rem, 5vw, 4.8rem)`, weight 800, line-height 1.02.
- Component title: 18–22px, weight 750–800.
- Body: 16–20px, line-height 1.55–1.7.
- UI chrome: 11–15px with deliberate weight and line-height; never browser defaults.

Keep Korean line breaks intentional and use `break-keep` where copy should read as phrases.

## Geometry and layout

- Wide container: 1504px max, 40px desktop gutters, 16px mobile gutters.
- Header: quiet fixed rail; brand, one navigation link, theme control, one primary account action.
- Main workspace: asymmetrical two-column composition. Upload is dominant; code receive is secondary.
- Controls: 12–16px radius. Main workspace and closing band: 24–30px radius.
- Use fine borders and a single soft blue-gray shadow tier. Avoid nested-card stacks and giant rounded wrappers around every section.

## Component families

- Primary button: cobalt or near-black depending context, 44–48px minimum height, 12–14px radius, magnetic lift on hover.
- Secondary button/control: elevated canvas, hairline border, subtle hover fill.
- Upload workspace: large dashed drop surface, clear drop response, control rail below.
- Receive-code panel: compact secondary surface with one input and one arrow action.
- File sheet: translucent white paper object with one semantic icon and restrained depth.
- Journey step: open composition with number node, text, and a single illustrative scene; not a generic card.
- Folder/check: layered CSS/SVG destination motif shared by journey and closing band.

## Motion system

- Page reveal: 700–900ms, `cubic-bezier(.16, 1, .3, 1)`, small vertical displacement and blur removal.
- Route draw: 1.7–2.2s on load; scroll-scrubbed in the journey section.
- Floating file sheets: 6–8s gentle loop with tiny rotation; no noisy bounce.
- Hover: 150–260ms lift, border/color change, or 1–2° tilt.
- Drag state: stronger cobalt border, mild scale compression, upload icon lift.
- Reduced motion: no looping travel, parallax, scroll scrub, or large displacement.

## Responsive behavior

- Below 1024px, hide the large hero flight path and stack upload above receive-code.
- Journey becomes a vertical sequence; each illustrative scene remains legible and the desktop route is removed.
- Hero copy scales fluidly and must not clip at 320px.
- All controls maintain at least a 44px touch target and no horizontal overflow.

## Copy lock for the home first viewport

- Brand: `Moveto`
- Nav: `사용 방법`, theme icon, `로그인` or `프로필`
- Hero: `파일이 움직이는 가장 아름다운 방법.`
- Support: `로그인 없이 파일을 올리고, 기억하기 쉬운 한글 코드로 바로 공유하세요.`
- Drop zone: `여기에 파일을 놓으세요`, `여러 파일을 한 번에 선택할 수 있어요.`, `파일 선택`
- Receive: `공유 코드로 파일 받기`, `전달받은 한글 코드를 입력하세요.`, `예: 파란 여름 바다`
- Main action: `공유 시작`

Do not add a hero eyebrow, badge, fake metric, testimonial, pricing area, or unrelated navigation above the fold.
