# SupplySight Dashboard - Development Notes

## Key Decisions

### Architecture
- **React + TypeScript + Tailwind**: Chose for rapid development and type safety
- **GraphQL over REST**: Mock server with Apollo for realistic data flow and future scalability
- **Custom hooks pattern**: Centralized inventory logic in `useInventory` for reusability
- **Component-based structure**: Modular, single-responsibility components for maintainability

### State Management
- **Apollo Client**: Replaced local state with GraphQL for realistic server interactions
- **No external state library**: Kept it simple with React's built-in state and Apollo Client
- **Optimistic updates**: Immediate UI feedback for mutations with server validation

### UI/UX
- **Mobile-first responsive design**: Works seamlessly across all screen sizes
- **Status-based color coding**: Green (Healthy), Yellow (Low), Red (Critical) with icons
- **Smooth animations**: Drawer slide-ins and fade effects for better user experience
- **Form validation**: Disabled buttons when inputs are empty for clear feedback

## Trade-offs Made

### Development Speed vs. Production Ready
- **Pros**: Rapid development with GraphQL simulation, easy to modify
- **Cons**: Mock server for development, limited error handling, no authentication

### Simplicity vs. Features
- **Pros**: Clean, focused codebase that's easy to understand
- **Cons**: Could add bulk operations, export functionality, real-time updates

### Local State vs. GraphQL
- **Pros**: Realistic data flow, proper loading states, server-side validation
- **Cons**: More complex setup, requires backend deployment for production

## What I'd Improve With More Time

### Backend & Infrastructure
- Replace mock server with production GraphQL backend
- Add PostgreSQL/MongoDB with proper schemas
- Implement JWT authentication with role-based access

### Advanced Features
- Bulk product selection and operations
- PDF/Excel report generation
- Notification system for critical inventory levels
- Audit trail for all inventory changes
- Advanced filtering (date ranges, price ranges, suppliers)

### Performance & UX
- Virtual scrolling for large datasets
- Search autocomplete and suggestions
- Keyboard shortcuts for power users
- Dark mode theme switching

### Testing & Quality
- Unit tests with Jest + React Testing Library
- Integration tests for user workflows
- Automated accessibility testing
