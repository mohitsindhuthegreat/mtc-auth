# MTC AUTH - Multi-Tenant Authentication System

## Overview

MTC Auth is a comprehensive authentication system built as a multi-tenant SaaS platform. Each user (authenticated via Google Firebase) gets their own isolated authentication environment where they can create applications, manage users, and control access through API keys. The system provides enterprise-grade features including hardware ID locking, version control, blacklisting, webhook notifications, and comprehensive user management.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom theming (light/dark mode support)
- **State Management**: TanStack Query for server state, React Context for theme
- **Routing**: Wouter for client-side routing
- **Authentication**: Firebase Authentication for user identity
- **Background Effects**: Custom particle system for enhanced UX

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: express-session with PostgreSQL store
- **Authentication**: Dual authentication system (Firebase + custom session management)
- **API Design**: RESTful API with multi-tenant isolation
- **Security**: CORS, rate limiting, API key validation, input sanitization

### Database Schema
The system uses a multi-tenant architecture with the following key tables:
- `users` - Main user accounts (Firebase authenticated)
- `applications` - User-created applications with unique API keys
- `app_users` - End users for each application (isolated per tenant)
- `license_keys` - License management system
- `webhooks` - Webhook configuration for real-time notifications
- `blacklist` - IP/username/email/HWID blocking system
- `activity_logs` - Comprehensive audit trail
- `sessions` - Session storage for authentication

## Key Components

### Authentication System
- **Primary Auth**: Firebase Google OAuth for tenant authentication
- **Secondary Auth**: Custom session-based authentication for application users
- **API Security**: API key-based authentication for external integrations
- **Permission System**: Role-based access control (Owner, Admin, Moderator, User)

### Multi-Tenant Isolation
- Each Google account creates an isolated tenant environment
- API keys are tenant-specific and provide access only to that tenant's data
- Complete data isolation between tenants
- Separate user management for each tenant's applications

### Application Management
- Users can create multiple applications within their tenant
- Each application gets a unique API key for external integration
- Configurable security settings per application (HWID locking, version control)
- Custom messaging for different authentication scenarios

### Security Features
- **Hardware ID Locking**: Prevent account sharing across devices
- **Version Control**: Force application updates
- **Blacklist System**: Block by IP, username, email, or hardware ID
- **Account Expiration**: Time-based access control
- **Session Management**: Real-time session tracking and validation

### Webhook System
- Real-time notifications for authentication events
- Support for Discord, Slack, and custom webhook endpoints
- Configurable event types and payload formatting
- Automatic retry logic and failure handling

## Data Flow

### User Registration Flow
1. User authenticates with Google Firebase
2. Backend creates tenant environment and user record
3. User can create applications and generate API keys
4. External applications use API keys to authenticate end users

### Authentication Flow
1. External application sends user credentials + API key to `/api/auth/login`
2. System validates API key and retrieves application configuration
3. User credentials are validated against application's user database
4. Security checks (HWID, version, blacklist, expiration) are performed
5. Authentication result is returned with session token
6. Webhook notifications are triggered for the event

### Admin Flow
1. Tenant owners can manage users, applications, and settings
2. Permission system controls access to different administrative functions
3. Activity logs track all administrative actions
4. Real-time updates via React Query for responsive UI

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **firebase/auth**: User authentication via Google
- **express**: Web server framework
- **@tanstack/react-query**: Server state management

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing
- **react-hook-form**: Form management with validation

### Security Dependencies
- **bcrypt**: Password hashing
- **express-session**: Session management
- **cors**: Cross-origin resource sharing

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20
- **Database**: Neon PostgreSQL (serverless)
- **Build Tool**: Vite for fast development and HMR
- **Dev Server**: Express with Vite middleware integration

### Production Deployment
- **Build Process**: Vite builds frontend, esbuild bundles backend
- **Static Assets**: Frontend builds to `dist/public`, served by Express
- **Environment Variables**: Database URL, Firebase config, session secrets
- **Autoscaling**: Configured for Replit autoscale deployment

### Database Management
- **ORM**: Drizzle with PostgreSQL dialect
- **Migrations**: Schema changes tracked in `migrations/` directory
- **Connection**: Neon serverless with WebSocket support for edge environments

## Changelog

```
Changelog:
- June 14, 2025. Initial setup
- June 14, 2025. Fixed authentication session synchronization and data loading issues
  * Enhanced Firebase authentication flow with proper backend session creation
  * Fixed API query key formats to match endpoint structure correctly
  * Added PATCH route support for application updates
  * Resolved TypeScript typing issues for data display
  * Fixed authentication middleware to handle account ID headers properly
- June 14, 2025. Implemented license key-based user registration system
  * Added /api/v1/register endpoint with mandatory license key validation
  * License keys now enforce usage limits and track current user count
  * Registration requires valid license key with available slots
  * Updated integration examples (C# and Python) to include license key fields
  * Fixed application display caching issues using refetchQueries
  * Enhanced user registration with license key association and usage tracking
  * Made email field optional in registration process while keeping username, password, and license key mandatory
- June 14, 2025. Fixed user management and logout functionality
  * Fixed apiRequest function parameter structure for proper API calls
  * Corrected user create/delete operations with proper body formatting
  * Fixed pause/unpause methods to use correct HTTP methods (POST instead of PATCH)
  * Enhanced logout functionality to properly clear Firebase and backend sessions
  * Added Google OAuth account selection prompt to prevent automatic re-login
  * Implemented complete session cleanup including localStorage and sessionStorage
  * Added backend /api/logout route for proper server-side session destruction
- January 10, 2025. Comprehensive SEO optimization implementation
  * Enhanced HTML meta tags with comprehensive SEO elements including Open Graph and Twitter cards
  * Added structured data (Schema.org) for SoftwareApplication, Organization, and WebSite
  * Implemented canonical URLs, meta keywords, and proper semantic HTML structure
  * Created essential SEO files: robots.txt, sitemap.xml, site.webmanifest, browserconfig.xml
  * Enhanced hero section with semantic HTML, microdata, and SEO-optimized content
  * Upgraded features section with detailed descriptions, keywords, and structured data
  * Improved footer with comprehensive contact information, social links, and SEO keywords
  * Enhanced pricing section with Schema.org markup and enterprise-focused content
  * Added keyword-rich content throughout components for better search engine visibility
  * Implemented proper heading hierarchy (H1, H2, H3, H4) for SEO structure
  * Added aria-labels and accessibility improvements for better user experience
- January 10, 2025. Advanced SEO features and enterprise-grade optimization
  * Created comprehensive FAQ component with structured data and keyword-rich content
  * Implemented detailed testimonials section with Schema.org review markup and industry coverage
  * Built extensive blog preview component with SEO-optimized articles and keyword targeting
  * Added advanced meta tags including robots, googlebot, bingbot, and geographic targeting
  * Implemented performance monitoring with Core Web Vitals tracking (LCP, FID, CLS, TTFB, FCP)
  * Created comprehensive Schema.org markup including Product, FAQPage, and BreadcrumbList schemas
  * Added local SEO optimization with business profile and service area coverage
  * Implemented Google Analytics integration with custom event tracking and conversion monitoring
  * Created security.txt file for responsible disclosure and security contact information
  * Added humans.txt with team information and technology stack details
  * Enhanced sitemap.xml with additional pages and proper priority structure
  * Created .htaccess file with performance optimization and security headers
  * Implemented ads.txt for advertising transparency and fraud prevention
  * Added Google Business Profile JSON-LD for enhanced local search visibility
  * Created SEO-optimized landing page combining all components for maximum search impact
- January 10, 2025. Ultimate brand dominance and search monopoly implementation
  * Created phantom-auth-brand-dominance.html with trademark protection and official brand authority
  * Implemented phantom-auth-monopoly-seo.html with extreme keyword density and competitive positioning
  * Added brand-seo-booster.html with comprehensive brand variations and alternative names
  * Created google-search-console-meta.html for enhanced search engine verification
  * Implemented brand-keywords.json with comprehensive keyword strategy and competitive analysis
  * Added brand-authority-signals.json with complete SEO metrics and monopoly strategies
  * Created phantom-auth-ultimate-seo.html with maximum keyword stuffing and ultimate brand authority
  * Enhanced main index.html with aggressive phantom auth brand keyword integration
  * Updated sitemap.xml with brand protection pages at maximum priority (1.0)
  * Modified robots.txt to allow all brand monopoly and SEO optimization files
  * Implemented comprehensive brand variations targeting all possible phantom auth searches
  * Added massive keyword density targeting for complete search engine dominance
  * Created defensive SEO strategy to outrank any competitor using mtc auth terminology
  * Implemented trademark and brand authority signals for maximum search credibility
  * Added structured data for brand monopoly and complete market control
  * Enhanced meta tags with mtc auth brand variations and competitive keywords
  * Created ultimate SEO content designed to dominate all mtc auth search results
  * Implemented comprehensive search monopoly strategy for complete brand protection
- January 30, 2025. Completed migration from Replit Agent to Replit environment
  * Fixed database connection to use environment variables properly
  * Made Google OAuth authentication optional for development mode
  * Created PostgreSQL database and applied schema successfully
  * Updated all branding from "phantom auth" to "mtc auth" throughout the project
  * Server now runs successfully on port 5000 with proper authentication setup
  * All client-side components updated with new MTC Auth branding
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Branding: Always use "MTC Auth" instead of "Phantom Auth" throughout all project files.
```