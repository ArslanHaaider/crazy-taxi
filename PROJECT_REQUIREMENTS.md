# Crazy Taxi Website Redesign - Project Requirements Document

## Project Overview
**Project Name:** Crazy Taxi Website UI Redesign  
**Objective:** Modernize the existing taxi service website by replacing Mantine UI components with shadcn/ui while maintaining all existing functionality and improving user experience.

## Current State Analysis

### Technology Stack
- **Framework:** Next.js 14.2.15 with TypeScript
- **Current UI Library:** Mantine UI v7.13.3
- **Styling:** Tailwind CSS v3.4.1
- **Animations:** Framer Motion (motion v11.11.17)
- **Internationalization:** next-intl v3.25.1
- **Icons:** Tabler Icons React v3.19.0
- **Forms:** React Hook Form v7.53.1
- **State Management:** Zustand v5.0.0

### Current Website Structure
1. **Navbar Component**
   - Logo with navigation
   - Contact information (phone, email)
   - Mobile hamburger menu with drawer
   - Language switcher
   - Book now button

2. **Hero Section**
   - Background image with overlay
   - Animated headings
   - Two modal triggers (Calculate Price, Fixed Prices)
   - Car image with animations
   - Mobile-specific booking button

3. **Services Section**
   - Service descriptions with images
   - Feature lists with checkmark icons
   - Two main service categories

4. **Why Choose Us Section**
   - Grid layout of service benefits
   - Background image with overlay
   - Animated cards with star icons

5. **Footer**
   - Company branding
   - Contact information
   - Navigation links
   - Social/contact details

### Key Features to Preserve
- ✅ Multilingual support (German/English)
- ✅ Responsive design (mobile-first)
- ✅ Booking system integration
- ✅ Price calculator modal
- ✅ Fixed prices modal
- ✅ Smooth scroll navigation
- ✅ Contact information display
- ✅ Animations and transitions
- ✅ Google Maps integration
- ✅ Email functionality

## Design Goals & Objectives

### Primary Goals
1. **Modernize UI Components:** Replace all Mantine components with shadcn/ui equivalents
2. **Improve Accessibility:** Enhance keyboard navigation and screen reader support
3. **Maintain Brand Identity:** Keep existing color scheme and visual branding
4. **Enhance User Experience:** Improve component interactions and visual feedback
5. **Optimize Performance:** Reduce bundle size and improve loading times

### Secondary Goals
1. **Code Maintainability:** Improve component structure and reusability
2. **Design Consistency:** Standardize spacing, typography, and component behavior
3. **Mobile Experience:** Enhance mobile responsiveness and touch interactions
4. **Animation Polish:** Refine existing animations for smoother transitions

## Technical Requirements

### New Dependencies to Add
- shadcn/ui components
- Lucide React (for icons)
- class-variance-authority (for component variants)
- clsx (for conditional classes)
- tailwind-merge (for class merging)

### Dependencies to Remove/Replace
- @mantine/core → shadcn/ui components
- @mantine/hooks → custom hooks or shadcn/ui equivalents
- @mantine/form → maintain react-hook-form
- @tabler/icons-react → Lucide React

### Component Mapping Strategy

| Current (Mantine) | Target (shadcn/ui) | Priority |
|-------------------|--------------------|-----------|
| Button | Button | High |
| Modal | Dialog | High |
| Burger + Drawer | Sheet | High |
| NavLink | NavigationMenu | High |
| List + ThemeIcon | Custom with Lucide | Medium |
| Container | Custom div/section | Medium |
| Text | Typography utilities | Low |

## Implementation Phases

### Phase 1: Infrastructure Setup
- Install and configure shadcn/ui
- Set up component library structure
- Configure Tailwind CSS for shadcn/ui
- Install Lucide React icons

### Phase 2: Core Component Development
- Create reusable Button variants
- Implement Dialog components for modals
- Build Sheet component for mobile navigation
- Develop Card components for service sections

### Phase 3: Section-by-Section Redesign
- **Navbar Redesign:** Replace Mantine navigation with shadcn/ui components
- **Hero Section:** Update modals and buttons
- **Services Section:** Implement new card layouts and lists
- **Why Choose Us:** Create modern card grid with shadcn/ui
- **Footer:** Standardize with new component system

### Phase 4: Testing & Optimization
- Visual regression testing with Playwright
- Responsive design verification
- Performance optimization
- Accessibility audit
- Cross-browser testing

## Success Criteria

### Functional Requirements
- [ ] All existing features work identically
- [ ] Responsive design maintained across all devices
- [ ] Multilingual functionality preserved
- [ ] Booking system integration intact
- [ ] Contact forms and email functionality working

### Visual Requirements
- [ ] Modern, clean UI with shadcn/ui components
- [ ] Consistent design language throughout
- [ ] Smooth animations and transitions
- [ ] Improved accessibility indicators
- [ ] Brand colors and imagery preserved

### Performance Requirements
- [ ] Page load time ≤ current performance
- [ ] Bundle size reduction of 10-20%
- [ ] Lighthouse score improvement
- [ ] No console errors or warnings

## Risk Assessment

### High Risk
- **Component Compatibility:** Some Mantine features may not have direct shadcn/ui equivalents
- **Animation Conflicts:** Framer Motion integration with new components

### Medium Risk
- **Responsive Breakpoints:** Ensuring mobile design remains optimal
- **Form Integration:** Maintaining react-hook-form compatibility

### Low Risk
- **Styling Conflicts:** Tailwind CSS class conflicts
- **Icon Replacement:** Switching from Tabler to Lucide icons

## Timeline Estimate

- **Phase 1:** 1-2 days (Setup)
- **Phase 2:** 2-3 days (Core Components)
- **Phase 3:** 4-5 days (Section Redesign)
- **Phase 4:** 2-3 days (Testing & Polish)

**Total Estimated Time:** 9-13 days

## Deliverables

1. ✅ Project Requirements Document (this document)
2. ⏳ Detailed Todo List with specific tasks
3. ⏳ Updated website with shadcn/ui components
4. ⏳ Component documentation
5. ⏳ Testing report with Playwright screenshots
6. ⏳ Performance comparison report

---

**Document Version:** 1.0  
**Last Updated:** $(date)  
**Next Review:** After Phase 1 completion