# Implementation Plan: Hero Profile Image Redesign

## Overview

This implementation plan translates the design specifications into a series of focused, testable tasks organized by theme. The hero profile image redesign replaces an SVG placeholder with hero.png, implements polished circular frame styling with animated effects, ensures responsive behavior (visible on lg+ breakpoints), maintains performance (GPU-accelerated animations), and implements accessibility standards (alt text, semantic markup, ARIA attributes, reduced motion support).

The current implementation already includes the circular frame structure and animations. These tasks focus on validating the implementation against requirements, adding comprehensive testing, optimizing performance, and ensuring accessibility compliance.

## Task Sequence

### Phase 1: Image Integration & Validation

- [ ] 1. Verify hero.png image file exists and is properly optimized
  - Ensure `/public/hero.png` exists and is accessible
  - Verify image dimensions (recommended 600×600px minimum)
  - Validate image format (PNG or JPEG) and file size
  - Check image compression and optimization level
  - _Requirements: 1.1, 1.5, 8.1_

- [ ] 2. Validate image loading implementation in HeroText component
  - Verify image element has src="/hero.png"
  - Confirm loading="eager" attribute for above-fold content
  - Validate alt text presence and content: "Sarvjeet Yadav - Full Stack Developer and AI Engineer"
  - Check object-fit: cover and object-position: center applied
  - Verify img element renders within circular frame
  - _Requirements: 1.1, 1.2, 1.4, 3.3_

- [ ] 3. Implement image load error handling and SVG fallback
  - Add onError handler to img element to trigger fallback
  - Create SVG placeholder component as fallback
  - Implement state management for image load success/failure
  - Test fallback renders when image fails to load
  - Ensure SVG fallback has proper role and aria-label
  - _Requirements: 1.3, 10.4_

- [ ]* 3.1 Write unit tests for image loading and fallback
  - Test image element renders with correct src
  - Test alt text is present and descriptive
  - Test fallback SVG appears on image load error
  - Test SVG fallback has proper accessibility attributes
  - _Requirements: 1.1, 1.3, 1.4_

### Phase 2: Circular Frame & Styling

- [ ] 4. Validate circular frame dimensions and aspect ratio
  - Verify frame maintains 288px × 288px (w-72 h-72)
  - Confirm border-radius: 50% for perfect circle
  - Validate aspect-ratio: 1 / 1 CSS property
  - Check overflow: hidden on inner container
  - Test on multiple viewport sizes
  - _Requirements: 2.1, 3.1_

- [ ] 5. Validate background ring gradient styling
  - Verify gradient direction: to bottom right (gradient-to-br)
  - Confirm gradient stops: primary/20 → primary/10 → transparent
  - Validate color values use hsl(73 100% 50% / opacity)
  - Check gradient applies to outer ring (p-1.5)
  - Verify visual separation between image and background
  - _Requirements: 2.2, 2.3, 9.2_

- [ ] 6. Validate frame border and shadow styling
  - Verify border: 2px solid hsl(73 100% 50% / 0.4)
  - Confirm shadow-2xl applied to inner container
  - Validate inset shadow: inset 0 1px 20px rgba(204,255,0,0.15)
  - Check shadow ring positioned -inset-6 for depth
  - Verify all colors use primary color scheme
  - _Requirements: 2.4, 2.5, 2.6, 9.1, 9.5_

- [ ]* 6.1 Write unit tests for frame styling
  - Test frame maintains 1:1 aspect ratio
  - Test border color and opacity values
  - Test shadow effects apply correctly
  - Test gradient rendering
  - _Requirements: 2.1, 2.4, 2.5_

### Phase 3: Animation Implementation

- [ ] 7. Validate halo ring rotation animation
  - Verify rotation animation: 360° over 30 seconds (linear)
  - Confirm animation repeats infinitely
  - Check rotate property animates [-360, 0]
  - Validate easing: linear for constant velocity
  - Test animation applies to conic-gradient halo
  - Verify GPU acceleration (transform property)
  - _Requirements: 5.1, 5.7, 8.3_

- [ ] 8. Validate halo pulse scale animation
  - Verify scale animation: [0.95, 1.05, 0.95] over 8 seconds
  - Confirm animation repeats infinitely
  - Check easeInOut timing for smooth acceleration
  - Validate animation runs in parallel with rotation
  - Test pulse creates breathing effect
  - _Requirements: 5.2, 5.7_

- [ ] 9. Validate floating motion (vertical bob) animation
  - Verify y-axis animation: [0, -12, 0] over 6 seconds
  - Confirm easeInOut timing
  - Check animation repeats infinitely
  - Test 12px displacement is smooth and noticeable
  - Validate animation applies to image container
  - _Requirements: 5.3, 5.4_

- [ ] 10. Validate glow pulsing animation
  - Verify opacity animation: [0.3, 0.6, 0.3] over 4 seconds
  - Confirm easeInOut timing
  - Check animation repeats infinitely
  - Validate glowing overlay gradient-to-t direction
  - Test opacity range creates subtle to intense glow
  - _Requirements: 5.5_

- [ ] 11. Validate mount animation entry effect
  - Verify initial state: opacity 0, scale 0.8, rotateY -20
  - Confirm final state: opacity 1, scale 1, rotateY 0
  - Check animation duration 0.8 seconds with 0.5s delay
  - Validate perspective: 1000px for 3D effect
  - Test animation runs once on component mount
  - Verify 3D rotation creates "unfold" effect
  - _Requirements: 5.6_

- [ ] 12. Validate border accent rotating animation
  - Verify rotation: 360° over 25 seconds (linear)
  - Check conic-gradient with 60% opacity at edges
  - Confirm animation repeats infinitely
  - Validate 3px padding on border accent element
  - Test decorative element marked with aria-hidden
  - _Requirements: 5.7_

- [ ]* 12.1 Write property tests for animation correctness
  - **Property 1: Animation frame rate consistency**
  - For all animation cycles, transform/opacity changes shall maintain 60fps without janky behavior
  - **Validates: Requirements 5.7, 8.3**
  
  - **Property 2: Animation timing accuracy**
  - For all Framer Motion animations, specified duration matches actual observed timing within 50ms tolerance
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6**
  
  - [ ]* 12.1.1 Implement property test for animation frame rate
    - Create test that records animation frame timing
    - Verify average FPS stays above 55fps during animations
    - Check transform/opacity properties only (GPU-accelerated)
    - Run test over multiple animation cycles
    - _Requirements: 8.3, 8.7_
  
  - [ ]* 12.1.2 Implement property test for animation duration accuracy
    - Create test that measures animation cycle time
    - Verify rotation completes in ~30 seconds (±100ms)
    - Verify pulse completes in ~8 seconds (±50ms)
    - Verify float completes in ~6 seconds (±50ms)
    - Verify glow completes in ~4 seconds (±50ms)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 12.2 Write unit tests for animation configuration
  - Test each animation has correct duration value
  - Test each animation has correct easing function
  - Test mount animation has correct delay offset
  - Test animations initialize on lg+ breakpoints
  - _Requirements: 5.1-5.7_

### Phase 4: Responsive Behavior

- [ ] 13. Validate responsive visibility on mobile/tablet (sm-md breakpoints)
  - Verify profile image area uses hidden lg:flex classes
  - Confirm display: none on viewports < 1024px
  - Test image doesn't load on mobile (display: none)
  - Check text area takes full width on sm/md
  - Validate no layout shift during breakpoint transition
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 14. Validate responsive visibility on desktop (lg+ breakpoints)
  - Verify profile image visible on 1024px and above
  - Confirm display: flex on lg and above
  - Test image loads and animates on lg+ viewports
  - Check layout: text (flex-1) + gap-12 + image (flex-1)
  - Validate proportional sizing with flex-1
  - _Requirements: 6.1, 6.2, 4.1, 4.2_

- [ ] 15. Validate layout gap and spacing
  - Verify gap-12 (48px) between text and image on desktop
  - Confirm max-w-7xl on layout container
  - Check padding: px-4 md:px-8 for responsive sides
  - Test flexbox alignment: items-center justify-between
  - _Requirements: 4.4_

- [ ]* 15.1 Write integration tests for responsive behavior
  - Test profile image visibility at sm/md/lg breakpoints
  - Test layout doesn't shift during breakpoint transition
  - Test image loads only on lg+ breakpoints
  - Test animations initialize only on lg+ breakpoints
  - Test CLS (Cumulative Layout Shift) is zero
  - _Requirements: 6.1, 6.2, 6.3, 4.1_

### Phase 5: Accessibility Implementation

- [ ] 16. Validate alt text and semantic markup
  - Verify img element has alt="Sarvjeet Yadav - Full Stack Developer and AI Engineer"
  - Check alt text is specific and contextual (no "image of" prefix)
  - Confirm semantic HTML structure (article, itemScope, itemType)
  - Validate Person schema: itemProp="name", jobTitle, description, image
  - Test meta elements for url and email
  - _Requirements: 10.1, 10.2, 10.3, 10.7_

- [ ] 17. Validate ARIA attributes and decorative elements
  - Mark decorative animations with aria-hidden="true"
  - Verify halo ring, border accent marked as aria-hidden
  - Confirm image element NOT marked with aria-hidden
  - Check rotatingBorderAccent has aria-hidden="true"
  - Verify shadow ring marked as aria-hidden
  - _Requirements: 10.5, 10.6_

- [ ] 18. Validate reduced motion support
  - Check prefers-reduced-motion media query implementation
  - Verify animations disabled when prefers-reduced-motion: reduce
  - Test image displays at static position (y: 0) with reduced motion
  - Confirm all animation properties pause/disabled
  - Validate component still renders correctly with reduced motion
  - _Requirements: 6.5_

- [ ] 19. Validate screen reader accessibility
  - Verify screen readers announce "image, Sarvjeet Yadav - Full Stack Developer and AI Engineer"
  - Test decorative elements (halos, rings) are skipped by screen readers
  - Confirm semantic HTML maintains valid document outline
  - Test with NVDA/JAWS screen reader (manual testing)
  - _Requirements: 10.1, 10.5, 10.6_

- [ ] 20. Validate keyboard navigation and focus
  - Verify focus ring visible on interactive elements nearby
  - Check tab order is logical (decorative elements skipped)
  - Confirm color contrast meets WCAG AA (4.5:1 normal, 3:1 large)
  - Test sufficient visual feedback for keyboard users
  - _Requirements: 10.3_

- [ ]* 20.1 Write accessibility tests
  - Test image has correct alt attribute
  - Test decorative elements marked with aria-hidden
  - Test semantic HTML markup is valid
  - Test Person schema structure
  - Test image doesn't have aria-hidden applied
  - _Requirements: 10.1, 10.2, 10.3, 10.5, 10.6, 10.7_

### Phase 6: Performance Optimization

- [ ] 21. Validate GPU acceleration and transform optimization
  - Verify will-change property on animated parent (set to auto)
  - Confirm only transform and opacity properties animate (GPU-accelerated)
  - Check width/height/padding/margin properties don't animate
  - Validate contain: layout or contain: paint applied
  - Test no layout reflow during animations
  - _Requirements: 8.3, 8.4, 8.7_

- [ ] 22. Validate image loading strategy
  - Verify loading="eager" on img element (above-fold)
  - Check image loads immediately on lg+ viewports
  - Test image doesn't load on sm/md viewports (display: none)
  - Validate preload/link prefetch if needed
  - Measure image load time (target <500ms)
  - _Requirements: 8.1_

- [ ] 23. Validate animation cleanup on unmount
  - Verify animations pause when component unmounts
  - Check Framer Motion cleanup runs on unmount
  - Test no memory leaks from animation state
  - Validate no RAF (RequestAnimationFrame) callbacks remain
  - Test component can remount without animation issues
  - _Requirements: 8.5_

- [ ] 24. Validate animation cleanup on breakpoint hide
  - Verify animations pause when profile image hidden (md breakpoint)
  - Check animations resume when resized back to lg breakpoint
  - Test no unnecessary render cycles when hidden
  - Validate conditional animation initialization based on breakpoint
  - _Requirements: 8.5_

- [ ]* 24.1 Write performance benchmarks
  - Measure image load time on 4G network throttle
  - Test animation frame rate with DevTools performance profiler
  - Verify only transform/opacity properties change during animation
  - Check GPU acceleration enabled (DevTools layers tab)
  - Test no layout thrashing or forced reflow
  - _Requirements: 8.1, 8.3, 8.4, 8.7_

- [ ]* 24.2 Write integration tests for performance
  - Test image loads without blocking page render
  - Test animations run smoothly on low-end devices
  - Test no CLS (Cumulative Layout Shift) occurs
  - Test memory usage stable over extended animation time
  - _Requirements: 8.5, 8.6_

### Phase 7: Component Refactoring & Enhancement

- [ ] 25. Extract profile image component into reusable sub-component
  - Create ProfileImage component (src/components/dom/ProfileImage.tsx)
  - Move image loading and fallback logic
  - Export interface for props (src, alt, fallbackSrc, etc.)
  - Update HeroText to use new ProfileImage component
  - Maintain all styling and animations in original structure
  - _Requirements: 1.1, 1.3, 1.4_

- [ ] 26. Extract circular frame animation layers into sub-components
  - Create HaloRing component for rotating outer glow
  - Create BackgroundRing component for gradient background
  - Create GlowingOverlay component for pulsing glow effect
  - Create FloatingMotionWrapper component for vertical bob
  - Create RotatingBorderAccent component for decorative border
  - Create ShadowRing component for depth effect
  - Maintain all animations and styling in each component
  - _Requirements: 5.1-5.7_

- [ ] 27. Create animation configuration constants
  - Define ANIMATION_CONFIG constant with all timing values
  - Define COLOR_PALETTE constant with all color/opacity values
  - Define CONTAINER_STYLES with responsive styling
  - Store constants in separate animationConfig.ts file
  - Use constants in components instead of hardcoded values
  - _Requirements: 5.1-5.7, 9.1-9.6_

- [ ]* 27.1 Write unit tests for sub-components
  - Test ProfileImage renders with correct props
  - Test HaloRing animates with correct timing
  - Test BackgroundRing applies correct gradient
  - Test GlowingOverlay pulsates correctly
  - Test FloatingMotionWrapper applies y-axis motion
  - Test RotatingBorderAccent rotates continuously
  - Test ShadowRing applies shadow correctly
  - _Requirements: 1.1, 1.3, 5.1-5.7_

### Phase 8: Comprehensive Testing

- [ ]* 28. Write image loading integration tests
  - Test image loads and displays on lg+ breakpoints
  - Test image doesn't load on sm/md breakpoints
  - Test image renders with correct object-fit
  - Test image renders with correct object-position
  - Test image alt text is accessible
  - _Requirements: 1.1, 1.2, 3.3_

- [ ]* 29. Write responsive behavior integration tests
  - Test profile image hidden at sm breakpoint
  - Test profile image hidden at md breakpoint
  - Test profile image visible at lg breakpoint
  - Test profile image visible at xl breakpoint
  - Test no layout shift during breakpoint transition
  - Test animations initialize only on lg+
  - _Requirements: 6.1-6.5_

- [ ]* 30. Write animation property tests
  - **Property 1: Rotation animation completes full 360° cycle**
  - For any animation cycle, halo rotation shall progress from 0 to 360 degrees over exactly 30 seconds
  - **Validates: Requirements 5.1, 5.7**
  
  - **Property 2: Pulse scale maintains specified range**
  - For any pulse cycle, halo scale shall vary within [0.95, 1.05] range and return to baseline
  - **Validates: Requirements 5.2**
  
  - **Property 3: Floating motion is symmetrical**
  - For any float cycle, vertical displacement shall move up by -12px then return to 0, maintaining symmetry
  - **Validates: Requirements 5.3, 5.4**
  
  - **Property 4: Glow opacity varies within specified range**
  - For any glow cycle, opacity shall vary within [0.3, 0.6] range and return to baseline
  - **Validates: Requirements 5.5**
  
  - **Property 5: Mount animation reaches target state**
  - For component mount, animation shall transition from (opacity: 0, scale: 0.8, rotateY: -20) to (opacity: 1, scale: 1, rotateY: 0)
  - **Validates: Requirements 5.6**
  
  - [ ]* 30.1 Implement rotation animation property test
    - Generate random timestamps during animation cycle
    - Calculate expected rotation at each timestamp
    - Verify actual rotation matches expected within tolerance
    - Test over 2+ complete cycles
    - _Requirements: 5.1, 5.7_
  
  - [ ]* 30.2 Implement scale pulse property test
    - Generate random timestamps during animation cycle
    - Verify scale never exceeds 1.05 or goes below 0.95
    - Test animation returns to baseline after cycle
    - Run over multiple cycles to check consistency
    - _Requirements: 5.2_
  
  - [ ]* 30.3 Implement floating motion property test
    - Generate random timestamps during animation cycle
    - Verify y displacement matches expected value (±1px tolerance)
    - Test motion is symmetrical: up then down
    - Verify returns to y: 0 at cycle completion
    - _Requirements: 5.3, 5.4_
  
  - [ ]* 30.4 Implement glow opacity property test
    - Generate random timestamps during animation cycle
    - Verify opacity stays within [0.3, 0.6] range
    - Test opacity increases to peak then decreases
    - Verify cycle completes and repeats consistently
    - _Requirements: 5.5_
  
  - [ ]* 30.5 Implement mount animation property test
    - Generate random progress values (0 to 1) during animation
    - Verify animation progresses smoothly toward target state
    - Test final frame achieves target: opacity 1, scale 1, rotateY 0
    - Verify animation completes within 0.8 second duration (+ 0.5s delay)
    - _Requirements: 5.6_

- [ ]* 31. Write styling consistency tests
  - Test all frame borders use correct primary color and opacity
  - Test all gradients use correct color values
  - Test all shadows use correct color and blur
  - Test all border-radius values maintain circle shape
  - _Requirements: 9.1-9.6_

- [ ]* 32. Write accessibility compliance tests
  - Test image alt text presence and content
  - Test decorative elements have aria-hidden="true"
  - Test semantic markup structure
  - Test schema.org Person schema properties
  - Test reduced motion respected
  - Test sufficient color contrast
  - _Requirements: 10.1-10.7, 6.5_

### Phase 9: Checkpoint & Verification

- [ ] 33. Checkpoint - Verify all implementation tests pass
  - Run all unit tests (image, styling, animations, accessibility)
  - Run all integration tests (responsive, loading, performance)
  - Run all property tests (animation correctness, consistency)
  - Verify no console errors or warnings
  - Check test coverage >80% for modified files
  - Fix any failing tests before proceeding
  - _Requirements: All 1.0-10.0_

- [ ] 34. Perform manual visual verification
  - Test on Chrome/Firefox/Safari desktop browsers
  - Verify circular frame renders correctly
  - Confirm all animations run smoothly at 60fps
  - Test on tablet (iPad) at md breakpoint - verify hidden
  - Test on mobile (iPhone) at sm breakpoint - verify hidden
  - Test responsive transition from md to lg breakpoint
  - Verify no visual glitches or animation janking
  - _Requirements: 2.1-2.6, 5.1-5.7, 6.1-6.5_

- [ ] 35. Perform accessibility manual testing
  - Test with screen reader (NVDA/JAWS if available, or browser built-in)
  - Verify screen reader announces image and alt text
  - Verify decorative elements are skipped
  - Test keyboard navigation (tab through page)
  - Verify focus ring visible on nearby elements
  - Test with prefers-reduced-motion enabled
  - Verify animations disabled with reduced motion setting
  - _Requirements: 10.1-10.7, 6.5_

- [ ] 36. Checkpoint - Ensure all requirements covered
  - Verify every requirement 1.0-10.0 has at least one corresponding task
  - Verify all acceptance criteria have implementation/test coverage
  - Check no requirements are partially implemented
  - Ensure all edge cases addressed
  - Confirm all accessibility requirements met
  - Sign off that feature is complete and ready for deployment
  - _Requirements: All 1.0-10.0_

### Phase 10: Documentation & Cleanup

- [ ]* 37. Document animation configuration and timing
  - Create ANIMATION_TIMING_REFERENCE.md documenting all durations
  - Document easing curves and their purposes
  - Include timing diagrams for each animation
  - Document GPU acceleration strategy
  - Include performance considerations
  - _Requirements: 5.1-5.7, 8.3, 8.7_

- [ ]* 38. Document responsive breakpoint behavior
  - Create RESPONSIVE_BEHAVIOR.md documenting breakpoint thresholds
  - Document visibility changes at each breakpoint
  - Include browser compatibility notes
  - Document layout shift prevention strategy
  - _Requirements: 6.1-6.5_

- [ ]* 39. Document accessibility implementation
  - Create ACCESSIBILITY.md documenting alt text strategy
  - Document ARIA attributes and their purpose
  - Document reduced motion implementation
  - Include screen reader testing results
  - Include keyboard navigation documentation
  - _Requirements: 10.1-10.7, 6.5_

- [ ]* 40. Document performance optimization strategy
  - Create PERFORMANCE_OPTIMIZATION.md documenting GPU acceleration
  - Document image loading strategy
  - Document animation cleanup on unmount
  - Document metrics and benchmarks achieved
  - Include optimization checklist
  - _Requirements: 8.1-8.7_

## Notes for Implementation

### Key Dependencies
- Framer Motion: Already installed, used for all animations
- React: Already installed, component structure uses React hooks
- Tailwind CSS: Used for responsive classes and styling

### Critical Implementation Details
1. **GPU Acceleration**: All animations use only transform and opacity properties to ensure GPU acceleration. No width/height/padding changes during animation.
2. **Responsive Strategy**: Image area uses `hidden lg:flex` to completely hide on mobile/tablet, preventing unnecessary image loads.
3. **Accessibility**: Alt text must be specific, descriptive, and in first person. Decorative elements must be marked `aria-hidden="true"`.
4. **Reduced Motion**: All animations must respect `prefers-reduced-motion: reduce` media query. When enabled, animations disabled and image shows at static position.
5. **Fallback Strategy**: SVG fallback appears only on image load failure. Fallback must match frame styling and have proper accessibility attributes.
6. **Performance**: Image uses `loading="eager"` for above-fold content. Consider implementing lazy loading for future use with intersection observer.

### Testing Strategy
- Unit tests: Image loading, styling, accessibility attributes
- Integration tests: Responsive behavior, image loading at breakpoints, animation initialization
- Property tests: Animation timing accuracy, frame rate consistency, motion symmetry
- Manual tests: Visual verification across browsers, screen reader testing, keyboard navigation

### Browser Support
- Target: Modern browsers (Chrome, Firefox, Safari, Edge latest)
- Framer Motion supports all modern browsers
- CSS transforms and GPU acceleration widely supported
- Fallback to static image if CSS properties unsupported

## Completion Criteria

All tasks completed when:
1. ✅ All 40 tasks have been executed and verified
2. ✅ All unit tests pass (>80% coverage)
3. ✅ All integration tests pass
4. ✅ All property tests pass (100+ iterations each)
5. ✅ Visual verification complete on desktop/tablet/mobile
6. ✅ Accessibility testing complete (screen reader, keyboard, reduced motion)
7. ✅ Performance benchmarks meet targets (image load <500ms, animation 60fps)
8. ✅ No console errors or warnings
9. ✅ Requirements documentation complete
10. ✅ Code review completed

Once all criteria met, the hero-profile-image-redesign feature is complete and ready for deployment.
