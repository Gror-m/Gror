# GROR MARKETING
## Premium Backend Architecture System
### Enterprise-Grade SaaS Infrastructure for Real Estate Marketing

---

## EXECUTIVE BRIEF

You are a **senior backend architect**, **enterprise systems engineer**, **real estate CRM specialist**, **API design expert**, and **scalable SaaS infrastructure builder**.

Build a **production-grade, enterprise-scale backend system** for **GROR MARKETING** that serves as a **premium marketing automation platform** for the real estate industry.

The backend must support:
- **High-volume lead management** (10,000+ leads/month)
- **Real-time analytics and dashboards**
- **Marketing automation workflows**
- **CRM system integration**
- **Multi-client architecture** (managing multiple agency clients)
- **WhatsApp, email, and SMS automation**
- **Campaign tracking and attribution**
- **Premium security and compliance**
- **Scalability to enterprise scale**

---

## STRATEGIC OBJECTIVES

### What This Backend Powers

1. **Real Estate Lead Management System**
   - Capture leads from multiple sources
   - Score and qualify leads
   - Route to appropriate sales teams
   - Track lead progression
   - Generate ROI analytics

2. **Marketing Automation Engine**
   - WhatsApp automated sequences
   - Email drip campaigns
   - SMS follow-ups
   - Smart retargeting workflows
   - Lead nurture funnels

3. **Client Dashboard & Analytics**
   - Real-time campaign metrics
   - ROI and performance tracking
   - Lead source analytics
   - Conversion funnel visualization
   - Custom report generation

4. **Admin/Agency Control Panel**
   - Multi-team management
   - Lead assignment and workflow
   - Campaign management
   - Client billing and invoicing
   - Service management

5. **Marketing Funnel Infrastructure**
   - Landing page hosting and optimization
   - Form builders
   - Conversion tracking
   - UTM and source tracking
   - Property-based campaign logic

---

## CORE ARCHITECTURE PHILOSOPHY

### Design Principles

**Build for:**
- Scalability (1,000+ concurrent users)
- Reliability (99.9% uptime)
- Security (enterprise-grade)
- Modularity (service-oriented)
- Performance (sub-100ms response times)
- Maintainability (clean, documented code)
- Extensibility (easy to add features)

**Avoid:**
- Monolithic structure
- Database bottlenecks
- Synchronous blocking operations
- Unvalidated inputs
- Poor error handling
- Tight coupling between services
- Legacy code patterns

### Architecture Pattern
**Microservices-inspired modular monolith** with clear separation of concerns and event-driven workflows where needed.

---

## TECHNICAL STACK

### Backend Framework
- **Primary:** Next.js 14+ with API Routes
- **Alternative:** Express.js for flexibility
- **Language:** TypeScript (mandatory for enterprise code)
- **Runtime:** Node.js 20+ LTS

### Database
- **Primary Database:** PostgreSQL 15+
  - Relational data (users, leads, campaigns)
  - JSONB columns for flexible data
  - Full-text search capabilities
  - Strong consistency

- **Cache Layer:** Redis 7+
  - Session management
  - Real-time metrics caching
  - Rate limiting state
  - Pub/sub for real-time updates

### ORM & Database Tools
- **Prisma 5+** (type-safe ORM)
  - Auto-generated database client
  - Migration management
  - Built-in validation
  - Relationship management

### Authentication & Security
- **Auth:** NextAuth.js v5 OR JWT with secure refresh tokens
- **Password hashing:** bcrypt or argon2
- **Rate limiting:** Redis-backed rate limiter
- **CORS:** Strict whitelist configuration
- **Environment:** dotenv for secrets management

### External Services Integration
- **Email:** Resend or Nodemailer (SMTP)
- **WhatsApp:** Twilio API or official WhatsApp API
- **SMS:** Twilio or similar
- **File Storage:** Cloudinary or AWS S3
- **Payment:** Razorpay (Indian payments) or Stripe
- **Analytics:** PostHog or custom event tracking
- **Monitoring:** Sentry for error tracking

### Task Queue & Scheduling
- **Queue System:** BullMQ (backed by Redis)
  - Async email sending
  - SMS scheduling
  - WhatsApp message queuing
  - Heavy computation jobs
  - Batch processing

- **Scheduling:** node-cron for periodic tasks
  - Report generation
  - Data cleanup
  - Cache refresh
  - Lead re-scoring

### Validation & Type Safety
- **Input Validation:** Zod v3+
  - API request validation
  - Type-safe parsing
  - Custom error messages
  - Nested object validation

### Logging & Monitoring
- **Logging:** Winston or Pino
  - Structured JSON logs
  - Multiple transports (console, file, cloud)
  - Log levels and filtering
  - Performance tracking

- **Monitoring:**
  - Sentry for error tracking
  - DataDog or New Relic for APM
  - Custom metrics dashboards
  - Uptime monitoring

### API Documentation
- **Swagger/OpenAPI:** Auto-generated API docs
- **Postman Collection:** For development
- **Developer Portal:** Public API documentation

---

## DATABASE ARCHITECTURE

### Data Model Overview

#### Core Tables

### 1. USERS TABLE
```typescript
table Users {
  id: UUID (primary key)
  email: String (unique, indexed)
  password_hash: String
  full_name: String
  phone: String (Indian format)
  avatar_url: String (nullable)
  
  // Role & Permissions
  role: Enum [ADMIN, MANAGER, AGENT, CLIENT, VIEWER]
  permissions: JSONB (role-based access control)
  
  // Organization
  organization_id: UUID (foreign key)
  team_id: UUID (nullable, foreign key)
  
  // Status & Activity
  is_active: Boolean
  is_verified: Boolean
  email_verified_at: DateTime (nullable)
  phone_verified_at: DateTime (nullable)
  last_login: DateTime (nullable)
  
  // Metadata
  timezone: String (default: "Asia/Kolkata")
  preferred_language: String (default: "en")
  notification_preferences: JSONB
  
  // Timestamps
  created_at: DateTime
  updated_at: DateTime
  deleted_at: DateTime (nullable, soft delete)
}

indexes:
- email (unique)
- organization_id
- role
- created_at
```

### 2. ORGANIZATIONS TABLE
```typescript
table Organizations {
  id: UUID (primary key)
  name: String
  slug: String (unique)
  logo_url: String (nullable)
  website: String (nullable)
  
  // Organization Details
  industry: Enum [REAL_ESTATE, AGENCY, BROKER, BUILDER, DEVELOPER, OTHER]
  company_size: Enum [SOLO, SMALL, MEDIUM, LARGE, ENTERPRISE]
  location: String
  country: String (default: "IN")
  timezone: String (default: "Asia/Kolkata")
  
  // Subscription & Billing
  subscription_plan: Enum [FREE, STARTER, PROFESSIONAL, ENTERPRISE]
  subscription_status: Enum [ACTIVE, PAUSED, CANCELLED, EXPIRED]
  billing_email: String
  billing_address: JSONB
  
  // Limits & Quotas
  monthly_lead_limit: Integer (plan-based)
  monthly_contacts_limit: Integer
  team_members_limit: Integer
  storage_limit_gb: Integer
  api_calls_limit: Integer
  
  // Settings
  branding_settings: JSONB (custom colors, logo, domain)
  automation_settings: JSONB
  integration_settings: JSONB
  
  // Metadata
  is_active: Boolean
  is_verified: Boolean
  verification_token: String (nullable)
  
  // Timestamps
  created_at: DateTime
  updated_at: DateTime
  deleted_at: DateTime (nullable)
}

indexes:
- slug (unique)
- subscription_plan
- is_active
- created_at
```

### 3. LEADS TABLE (Core Model)
```typescript
table Leads {
  id: UUID (primary key)
  
  // Organization & Campaign
  organization_id: UUID (foreign key, indexed)
  campaign_id: UUID (nullable, foreign key, indexed)
  project_id: UUID (nullable, foreign key) // for builder projects
  
  // Lead Information
  first_name: String
  last_name: String
  email: String (indexed)
  phone: String (Indian format, indexed)
  phone_country_code: String (default: "+91")
  alternate_phone: String (nullable)
  
  // Property / Interest Information
  property_type: Enum [RESIDENTIAL, COMMERCIAL, LAND, LUXURY, OTHER]
  budget_min: Integer (nullable)
  budget_max: Integer (nullable)
  preferred_location: String (nullable)
  preferred_areas: String[] (JSONB, searchable)
  
  // Lead Metadata
  source: Enum [META_ADS, GOOGLE_ADS, WEBSITE, REFERRAL, MANUAL, WHATSAPP, SMS, API, OTHER]
  utm_source: String (nullable)
  utm_medium: String (nullable)
  utm_campaign: String (nullable)
  utm_content: String (nullable)
  utm_term: String (nullable)
  
  // Lead Quality & Scoring
  lead_score: Integer (0-100, calculated)
  lead_quality: Enum [COLD, WARM, HOT, QUALIFIED, UNQUALIFIED]
  qualification_reason: String (nullable)
  
  // Status & Pipeline
  status: Enum [NEW, CONTACTED, INTERESTED, SITE_VISIT, NEGOTIATION, CLOSED, LOST, DUPLICATE]
  stage: Enum [DISCOVERY, CONSIDERATION, DECISION, CLOSING, CLOSED]
  status_changed_at: DateTime
  next_follow_up: DateTime (nullable)
  
  // Assignment
  assigned_to: UUID (nullable, foreign key, indexed) // User ID
  assigned_at: DateTime (nullable)
  
  // Additional Data
  notes: String (nullable)
  tags: String[] (JSONB, searchable)
  custom_fields: JSONB (flexible schema)
  
  // Communication
  last_contacted: DateTime (nullable)
  contact_count: Integer (default: 0)
  response_count: Integer (default: 0)
  
  // Tracking
  form_submission_id: UUID (nullable, link to form submissions)
  tracking_id: String (unique, for UTM tracking)
  device_info: JSONB (device type, OS, browser)
  location_data: JSONB (IP-based location, nullable)
  
  // Metadata
  is_duplicate: Boolean (default: false)
  duplicate_of: UUID (nullable, if duplicate)
  is_archived: Boolean (default: false)
  
  // Timestamps
  created_at: DateTime
  updated_at: DateTime
  contacted_at: DateTime (nullable)
  closed_at: DateTime (nullable)
  deleted_at: DateTime (nullable)
}

indexes:
- organization_id, campaign_id (compound)
- email (partial, unique where deleted_at IS NULL)
- phone (partial, unique where deleted_at IS NULL)
- source
- lead_score DESC
- status
- assigned_to
- next_follow_up
- created_at DESC
```

### 4. CAMPAIGNS TABLE
```typescript
table Campaigns {
  id: UUID (primary key)
  
  // Organization
  organization_id: UUID (foreign key, indexed)
  
  // Campaign Details
  name: String
  description: String (nullable)
  status: Enum [DRAFT, ACTIVE, PAUSED, COMPLETED, ARCHIVED]
  type: Enum [AWARENESS, LEAD_GEN, RETARGETING, NURTURE, CONVERSION]
  
  // Targeting & Scope
  target_audience: JSONB (demographics, interests, behaviors)
  property_types: String[] (JSONB)
  locations: String[] (JSONB)
  budget_range: JSONB (min, max)
  
  // Campaign Channels
  channels: String[] (JSONB) // [META, GOOGLE, EMAIL, WHATSAPP, SMS]
  ad_platform_ids: JSONB (external platform IDs)
  
  // Budget & Spend
  monthly_budget: Integer (in rupees)
  actual_spend: Integer (cached, updated daily)
  remaining_budget: Integer (calculated)
  
  // Performance Metrics (cached from sources)
  total_impressions: Integer (cached)
  total_clicks: Integer (cached)
  total_leads: Integer (cached)
  total_conversions: Integer (cached)
  total_revenue: Integer (cached)
  
  // Calculated Metrics
  ctr: Decimal (click-through rate, cached)
  cpc: Decimal (cost per click, cached)
  cpl: Decimal (cost per lead, cached)
  roas: Decimal (return on ad spend, cached)
  roi: Decimal (return on investment, cached)
  
  // Timeline
  start_date: DateTime
  end_date: DateTime (nullable)
  last_synced: DateTime (last sync with ad platforms)
  
  // Settings
  automation_enabled: Boolean
  auto_follow_up_template: UUID (nullable)
  leads_auto_assignment: Boolean
  assignment_rule: JSONB (nullable)
  
  // Metadata
  tags: String[] (JSONB)
  created_by: UUID (foreign key)
  
  // Timestamps
  created_at: DateTime
  updated_at: DateTime
  deleted_at: DateTime (nullable)
}

indexes:
- organization_id
- status
- start_date, end_date
- created_at DESC
```

### 5. AUTOMATION_WORKFLOWS TABLE
```typescript
table AutomationWorkflows {
  id: UUID (primary key)
  
  // Organization
  organization_id: UUID (foreign key, indexed)
  
  // Workflow Details
  name: String
  description: String (nullable)
  type: Enum [WHATSAPP, EMAIL, SMS, MULTI_CHANNEL, LEAD_ROUTING, SCORING]
  status: Enum [DRAFT, ACTIVE, PAUSED, DISABLED]
  
  // Trigger Configuration
  trigger_type: Enum [LEAD_CREATED, LEAD_UPDATED, STATUS_CHANGED, FORM_SUBMISSION, TIME_BASED, MANUAL]
  trigger_conditions: JSONB (complex condition logic)
  
  // Action Configuration
  actions: JSONB[] (array of actions to execute)
  // Example action: { type: 'SEND_WHATSAPP', template_id: '...', delay: 300 }
  
  // Execution Settings
  max_executions_per_lead: Integer (nullable)
  execution_count: Integer
  active_lead_count: Integer (cached)
  
  // Performance
  success_rate: Decimal (calculated from execution logs)
  average_response_time: Integer (in seconds, cached)
  
  // Metadata
  created_by: UUID (foreign key)
  
  // Timestamps
  created_at: DateTime
  updated_at: DateTime
  deleted_at: DateTime (nullable)
}

indexes:
- organization_id
- status
- trigger_type
```

### 6. MESSAGES TABLE (WhatsApp/Email/SMS)
```typescript
table Messages {
  id: UUID (primary key)
  
  // Organization & Lead
  organization_id: UUID (foreign key, indexed)
  lead_id: UUID (foreign key, indexed)
  campaign_id: UUID (nullable, foreign key)
  workflow_id: UUID (nullable, foreign key)
  
  // Message Details
  channel: Enum [WHATSAPP, EMAIL, SMS]
  recipient_phone: String (nullable, indexed)
  recipient_email: String (nullable, indexed)
  sender_id: UUID (nullable, foreign key) // if sent by user
  
  // Content
  template_id: UUID (nullable)
  subject: String (nullable, for email)
  body: String (message content)
  media_urls: String[] (nullable)
  
  // Delivery Status
  status: Enum [PENDING, SENT, DELIVERED, READ, FAILED, BOUNCED]
  external_message_id: String (nullable, from service provider)
  delivery_timestamp: DateTime (nullable)
  read_timestamp: DateTime (nullable)
  
  // Performance
  open_status: Enum [NOT_SENT, SENT, OPENED, CLICKED, BOUNCED]
  clicks: Integer (default: 0)
  click_timestamp: DateTime (nullable)
  
  // Error Handling
  error_code: String (nullable)
  error_message: String (nullable)
  retry_count: Integer (default: 0)
  next_retry: DateTime (nullable)
  
  // Timestamps
  created_at: DateTime
  sent_at: DateTime (nullable)
  scheduled_for: DateTime (nullable)
}

indexes:
- organization_id, lead_id (compound)
- channel, status
- recipient_phone, recipient_email
- created_at DESC
```

### 7. FORM_SUBMISSIONS TABLE
```typescript
table FormSubmissions {
  id: UUID (primary key)
  
  // Form & Organization
  organization_id: UUID (foreign key, indexed)
  form_id: UUID (foreign key, indexed)
  campaign_id: UUID (nullable, foreign key)
  project_id: UUID (nullable, foreign key)
  
  // Form Data
  form_data: JSONB (all submitted fields)
  
  // Device & Tracking
  device_type: Enum [MOBILE, TABLET, DESKTOP]
  ip_address: String (indexed)
  user_agent: String
  referrer: String (nullable)
  landing_page_url: String
  
  // Lead Creation
  lead_id: UUID (nullable, foreign key, indexed)
  lead_created: Boolean
  lead_created_at: DateTime (nullable)
  
  // UTM & Source
  utm_source: String (nullable)
  utm_medium: String (nullable)
  utm_campaign: String (nullable)
  utm_content: String (nullable)
  utm_term: String (nullable)
  
  // Status
  submission_status: Enum [RECEIVED, PROCESSED, CONVERTED, DUPLICATE, INVALID]
  
  // Timestamps
  created_at: DateTime
  processed_at: DateTime (nullable)
}

indexes:
- organization_id, form_id
- campaign_id
- lead_id
- ip_address
- created_at DESC
```

### 8. ANALYTICS_EVENTS TABLE
```typescript
table AnalyticsEvents {
  id: UUID (primary key)
  
  // Organization
  organization_id: UUID (foreign key, indexed)
  
  // Event Details
  event_name: String (indexed)
  event_type: Enum [PAGE_VIEW, FORM_SUBMISSION, LINK_CLICK, MESSAGE_SENT, MESSAGE_OPENED, CONVERSION]
  
  // Tracking
  lead_id: UUID (nullable, foreign key, indexed)
  campaign_id: UUID (nullable, foreign key)
  session_id: String (indexed)
  
  // Event Data
  event_data: JSONB (flexible event properties)
  
  // Metadata
  device_type: String
  browser: String
  os: String
  location: String (nullable)
  ip_address: String
  
  // Timestamp
  timestamp: DateTime (indexed)
}

indexes:
- organization_id, event_name (compound)
- campaign_id
- lead_id
- timestamp DESC
```

### 9. BILLING_INVOICES TABLE
```typescript
table BillingInvoices {
  id: UUID (primary key)
  
  // Organization
  organization_id: UUID (foreign key, indexed)
  
  // Invoice Details
  invoice_number: String (unique)
  invoice_date: DateTime
  due_date: DateTime
  
  // Billing Period
  billing_period_start: DateTime
  billing_period_end: DateTime
  
  // Amounts
  subtotal: Integer (in paise)
  tax: Integer (GST, in paise)
  discount: Integer (nullable)
  total: Integer (in paise)
  
  // Status
  status: Enum [DRAFT, ISSUED, PAID, OVERDUE, CANCELLED]
  payment_date: DateTime (nullable)
  
  // Line Items
  line_items: JSONB (array of charges)
  // Example: [{ description: 'Professional Plan', amount: 50000, quantity: 1 }]
  
  // Timestamps
  created_at: DateTime
  updated_at: DateTime
}

indexes:
- organization_id
- status
- invoice_date
```

### 10. AUDIT_LOGS TABLE
```typescript
table AuditLogs {
  id: UUID (primary key)
  
  // Organization & User
  organization_id: UUID (foreign key, indexed)
  user_id: UUID (foreign key, indexed)
  
  // Action Details
  action: String (indexed) // 'LEAD_CREATED', 'CAMPAIGN_UPDATED', etc.
  resource_type: String // 'LEAD', 'CAMPAIGN', 'USER'
  resource_id: UUID (indexed)
  
  // Changes
  old_values: JSONB (nullable)
  new_values: JSONB (nullable)
  changed_fields: String[] (JSONB)
  
  // Metadata
  ip_address: String
  user_agent: String
  
  // Timestamp
  created_at: DateTime (indexed)
}

indexes:
- organization_id, user_id
- resource_type, resource_id
- action
- created_at DESC
```

---

## API ARCHITECTURE

### API Organization

```
/api
  /auth
    POST   /register           → User registration
    POST   /login              → User login
    POST   /refresh            → Refresh JWT token
    POST   /logout             → User logout
    POST   /forgot-password    → Send password reset
    POST   /reset-password     → Reset password
    GET    /me                 → Current user profile
    
  /organizations
    GET    /                   → List organizations (admin only)
    POST   /                   → Create organization
    GET    /:id                → Get organization details
    PUT    /:id                → Update organization
    DELETE /:id                → Delete organization
    
  /leads
    GET    /                   → List leads (with filters, pagination)
    POST   /                   → Create lead manually
    GET    /:id                → Get lead details
    PUT    /:id                → Update lead
    DELETE /:id                → Soft delete lead
    POST   /:id/assign         → Assign lead to user
    POST   /:id/score          → Re-score lead
    GET    /:id/history        → Lead activity history
    POST   /bulk-import        → CSV lead import
    GET    /export             → Export leads (CSV/JSON)
    
  /campaigns
    GET    /                   → List campaigns
    POST   /                   → Create campaign
    GET    /:id                → Get campaign details
    PUT    /:id                → Update campaign
    DELETE /:id                → Delete campaign
    GET    /:id/metrics        → Campaign performance metrics
    POST   /:id/launch         → Launch campaign
    POST   /:id/pause          → Pause campaign
    POST   /:id/sync           → Sync with ad platforms
    
  /automations
    GET    /                   → List automation workflows
    POST   /                   → Create automation
    GET    /:id                → Get automation details
    PUT    /:id                → Update automation
    DELETE /:id                → Delete automation
    POST   /:id/activate       → Activate automation
    POST   /:id/deactivate     → Deactivate automation
    GET    /:id/executions     → View execution logs
    
  /messages
    GET    /                   → List messages (filtered by type)
    POST   /send               → Send message (WhatsApp/Email/SMS)
    POST   /schedule           → Schedule message
    GET    /:id                → Get message details
    GET    /delivery-status    → Delivery status webhooks
    
  /analytics
    GET    /dashboard          → Dashboard metrics
    GET    /leads              → Lead analytics
    GET    /campaigns          → Campaign analytics
    GET    /funnel             → Funnel analytics
    GET    /sources            → Lead source analysis
    GET    /conversion         → Conversion tracking
    POST   /custom-report      → Generate custom report
    GET    /export             → Export analytics data
    
  /forms
    GET    /                   → List landing page forms
    POST   /                   → Create form
    GET    /:id                → Get form details
    PUT    /:id                → Update form
    DELETE /:id                → Delete form
    POST   /:id/submissions    → Get form submissions
    
  /team
    GET    /                   → List team members
    POST   /                   → Invite team member
    GET    /:id                → Get team member details
    PUT    /:id                → Update team member
    DELETE /:id                → Remove team member
    PUT    /:id/permissions    → Update permissions
    
  /integrations
    GET    /                   → List available integrations
    POST   /:type/connect      → Connect integration
    GET    /:type/status       → Integration status
    DELETE /:type              → Disconnect integration
    POST   /:type/test         → Test integration connection
    
  /webhooks
    POST   /whatsapp           → WhatsApp message webhook
    POST   /email              → Email delivery webhook
    POST   /meta               → Meta Ads webhook
    POST   /google             → Google Ads webhook
    
  /admin
    GET    /users              → Manage all users
    GET    /organizations      → Manage organizations
    GET    /billing            → View billing
    GET    /system-health      → System health metrics
    POST   /impersonate        → Impersonate user (support)
```

---

## AUTHENTICATION & SECURITY

### JWT Implementation
```typescript
// JWT Payload Structure
{
  sub: "user-id",           // Subject
  org: "org-id",            // Organization
  role: "MANAGER",          // Role
  permissions: ["leads:read", "campaigns:manage"],
  iat: 1234567890,
  exp: 1234571490,          // 1 hour expiry
  type: "ACCESS"            // ACCESS or REFRESH
}

// Refresh Token (longer expiry, stored in DB)
{
  sub: "user-id",
  type: "REFRESH",
  exp: 1234654890            // 7 days expiry
}
```

### Permission System
```typescript
// Role-Based Access Control (RBAC)
const roles = {
  ADMIN: {
    permissions: ["*"], // Full access
  },
  MANAGER: {
    permissions: [
      "leads:read",
      "leads:write",
      "campaigns:read",
      "campaigns:write",
      "team:read",
      "reports:read",
    ]
  },
  AGENT: {
    permissions: [
      "leads:read",
      "leads:write",
      "leads:assign-self",
      "campaigns:read",
      "messages:send",
    ]
  },
  CLIENT: {
    permissions: [
      "leads:read",
      "reports:read",
      "campaigns:read",
    ]
  },
  VIEWER: {
    permissions: [
      "reports:read",
    ]
  }
}

// Middleware: @requirePermission('leads:write')
```

### Security Best Practices
1. **Password Hashing:** Argon2 with 3 iterations, 65MB memory
2. **Rate Limiting:** 100 req/15min per IP for auth endpoints
3. **CORS:** Whitelist specific origins only
4. **Input Validation:** Zod on all API inputs
5. **SQL Injection Prevention:** Parameterized queries (Prisma)
6. **XSS Prevention:** Sanitize all outputs, CSP headers
7. **CSRF Protection:** Token-based with SameSite cookies
8. **Sensitive Data:** Never log passwords, emails, tokens
9. **API Keys:** Rotatable API keys for integrations
10. **Audit Logs:** Log all privileged actions

---

## CORE SERVICES & BUSINESS LOGIC

### 1. Lead Service
```typescript
class LeadService {
  // Create lead from form or manual entry
  async createLead(data: CreateLeadInput): Promise<Lead>
  
  // Score lead based on behavior and data
  async scoreLead(leadId: string): Promise<LeadScore>
  
  // Assign lead to user
  async assignLead(leadId: string, userId: string): Promise<void>
  
  // Update lead status in pipeline
  async updateLeadStatus(leadId: string, newStatus: LeadStatus): Promise<void>
  
  // Get lead with full history
  async getLeadWithHistory(leadId: string): Promise<LeadWithHistory>
  
  // Detect and merge duplicate leads
  async detectDuplicates(leadId: string): Promise<string[]>
  async mergeDuplicates(leadIds: string[]): Promise<void>
  
  // Export leads (CSV, JSON)
  async exportLeads(filters: Filters): Promise<Buffer>
  
  // Bulk operations
  async bulkUpdateStatus(leadIds: string[], status: LeadStatus): Promise<void>
  async bulkAssign(leadIds: string[], userId: string): Promise<void>
}
```

### 2. Campaign Service
```typescript
class CampaignService {
  // Create campaign
  async createCampaign(data: CreateCampaignInput): Promise<Campaign>
  
  // Sync metrics from ad platforms
  async syncMetricsFromPlatforms(campaignId: string): Promise<void>
  
  // Calculate performance metrics
  async calculateMetrics(campaignId: string): Promise<CampaignMetrics>
  
  // Launch campaign
  async launchCampaign(campaignId: string): Promise<void>
  
  // Pause/Resume campaign
  async pauseCampaign(campaignId: string): Promise<void>
  async resumeCampaign(campaignId: string): Promise<void>
  
  // Get campaign leads
  async getCampaignLeads(campaignId: string, pagination: Pagination): Promise<PaginatedLeads>
}
```

### 3. Automation Service
```typescript
class AutomationService {
  // Create workflow
  async createWorkflow(data: CreateWorkflowInput): Promise<Workflow>
  
  // Execute workflow
  async executeWorkflow(workflowId: string, lead: Lead): Promise<ExecutionResult>
  
  // Send message through workflow
  async sendMessage(data: SendMessageInput): Promise<MessageResult>
  
  // Handle automation trigger
  async handleTrigger(trigger: AutomationTrigger): Promise<void>
  
  // Get execution logs
  async getExecutionLogs(workflowId: string): Promise<ExecutionLog[]>
}
```

### 4. Analytics Service
```typescript
class AnalyticsService {
  // Track event
  async trackEvent(event: AnalyticsEvent): Promise<void>
  
  // Get dashboard metrics
  async getDashboardMetrics(orgId: string, period: DateRange): Promise<DashboardMetrics>
  
  // Get lead funnel
  async getLeadFunnel(orgId: string, period: DateRange): Promise<FunnelData>
  
  // Get conversion metrics
  async getConversionMetrics(campaignId: string): Promise<ConversionMetrics>
  
  // Calculate ROI
  async calculateROI(orgId: string, period: DateRange): Promise<ROIData>
  
  // Generate report
  async generateReport(config: ReportConfig): Promise<Report>
}
```

### 5. Message Service
```typescript
class MessageService {
  // Send WhatsApp message
  async sendWhatsApp(to: string, text: string, mediaUrls?: string[]): Promise<MessageResult>
  
  // Send email
  async sendEmail(to: string, subject: string, body: string, htmlBody?: string): Promise<MessageResult>
  
  // Send SMS
  async sendSMS(to: string, text: string): Promise<MessageResult>
  
  // Schedule message
  async scheduleMessage(data: ScheduleMessageInput): Promise<ScheduledMessage>
  
  // Process delivery webhook
  async processDeliveryWebhook(payload: WebhookPayload): Promise<void>
  
  // Retry failed messages
  async retryFailedMessages(): Promise<void>
}
```

---

## QUEUE SYSTEM & ASYNC JOBS

### Job Types (Using BullMQ + Redis)

```typescript
// Email sending queue
const emailQueue = new Queue('send-email', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: { age: 3600 }, // Keep for 1 hour
  }
})

emailQueue.add('send-email', { to, subject, body }, {
  delay: 5000, // 5 sec delay
  priority: 5,
})

// WhatsApp queue
const whatsappQueue = new Queue('send-whatsapp', ...)

// SMS queue
const smsQueue = new Queue('send-sms', ...)

// Analytics processing
const analyticsQueue = new Queue('process-analytics', ...)

// Report generation
const reportQueue = new Queue('generate-report', {
  defaultJobOptions: {
    attempts: 2,
  }
})

// Lead scoring
const scoringQueue = new Queue('score-leads', {
  defaultJobOptions: {
    priority: 10, // High priority
  }
})

// Data sync (external platforms)
const syncQueue = new Queue('sync-data', {
  defaultJobOptions: {
    repeat: { cron: '0 * * * *' } // Every hour
  }
})
```

### Job Processors
```typescript
emailQueue.process(async (job) => {
  const { to, subject, body } = job.data
  try {
    await emailService.send(to, subject, body)
    return { success: true }
  } catch (error) {
    logger.error('Email job failed:', error)
    throw error // Trigger retry
  }
})

emailQueue.on('completed', (job) => {
  logger.info(`Email sent to ${job.data.to}`)
})

emailQueue.on('failed', (job, err) => {
  logger.error(`Email job failed: ${job.id}`, err)
  // Could trigger alert to admin
})
```

---

## CACHING STRATEGY

### Redis Keys Structure
```
// User sessions
sessions:{user-id} → user session data
session-ids:{user-id} → active session IDs

// Organization data
org:{org-id}:data → organization details
org:{org-id}:settings → organization settings
org:{org-id}:plan → subscription plan

// Lead data
lead:{lead-id} → lead details
lead:{lead-id}:score → lead score cache
leads:{org-id}:list → paginated lead list

// Campaign data
campaign:{campaign-id}:metrics → campaign metrics (1 hour TTL)
campaigns:{org-id} → organization campaigns

// Analytics
analytics:{org-id}:dashboard → dashboard cache (15 min TTL)
analytics:{org-id}:funnel → funnel data (1 hour TTL)

// Rate limiting
ratelimit:{user-id}:{endpoint} → request counter

// Session tokens
token:{token} → token validation cache
```

### Cache Invalidation
```typescript
// Automatic cache clear on data changes
await redis.del(`lead:${leadId}`) // On lead update
await redis.del(`campaign:${campaignId}:metrics`) // On metric change
await redis.del(`analytics:${orgId}:dashboard`) // On new event
```

---

## ERROR HANDLING & LOGGING

### Centralized Error Handler
```typescript
class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errorCode: string,
    public details?: Record<string, any>
  ) {
    super(message)
  }
}

// Middleware
export const errorHandler = async (err: unknown, req: Request, res: Response) => {
  if (err instanceof APIError) {
    logger.warn(`API Error [${err.errorCode}]:`, {
      message: err.message,
      statusCode: err.statusCode,
      path: req.url,
      method: req.method,
    })
    
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details,
      }
    })
  }
  
  // Unexpected error
  logger.error('Unexpected error:', err, {
    path: req.url,
    method: req.method,
    userId: (req as any).user?.id,
  })
  
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    }
  })
}
```

### Structured Logging
```typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'gror-backend' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})

// Usage
logger.info('Lead created', { leadId, orgId })
logger.error('Payment failed', { leadId, reason }, error)
logger.warn('High API latency', { endpoint: '/leads', duration: 2500 })
```

---

## MONITORING & HEALTH CHECKS

### Health Check Endpoint
```typescript
GET /health
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 86400,
  "checks": {
    "database": "ok",
    "redis": "ok",
    "whatsapp_api": "ok",
    "email_service": "ok"
  },
  "metrics": {
    "active_users": 145,
    "daily_leads": 234,
    "queue_pending": 12
  }
}
```

### Key Metrics to Monitor
- API response times (p50, p95, p99)
- Database query performance
- Queue processing speed
- Error rates by endpoint
- Cache hit ratio
- Server resource usage (CPU, memory)
- Active database connections
- Redis memory usage
- Message delivery rates (WhatsApp, Email)
- Lead creation rate
- Webhook delivery success rate

---

## DEPLOYMENT & INFRASTRUCTURE

### Docker Setup
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/gror
DATABASE_POOL_MIN=5
DATABASE_POOL_MAX=20

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=3600 # 1 hour
REFRESH_TOKEN_EXPIRES_IN=604800 # 7 days

# Email
EMAIL_FROM=noreply@grormarketing.com
RESEND_API_KEY=...

# WhatsApp
WHATSAPP_API_KEY=...
WHATSAPP_BUSINESS_PHONE=...

# External APIs
META_API_KEY=...
GOOGLE_ADS_API_KEY=...

# Monitoring
SENTRY_DSN=...
DATADOG_API_KEY=...

# Payment
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

# File Storage
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...

# Environment
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
```

### Deployment Platforms
- **Vercel:** Next.js API Routes (ideal for rapid deployment)
- **Railway:** Full stack with PostgreSQL and Redis
- **Render:** Self-hosted with easy scaling
- **AWS:** EC2 + RDS + ElastiCache (for large scale)
- **DigitalOcean:** App Platform (balanced cost/features)

---

## API RESPONSE FORMAT

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Example",
    // ... other fields
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.0"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Invalid email format",
      "phone": "Phone must be 10 digits"
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 450,
    "totalPages": 23,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

## PERFORMANCE OPTIMIZATION

### Database Optimization
1. **Indexing Strategy:** Create indexes on frequently queried columns
2. **Query Optimization:** Use Prisma select to fetch only needed fields
3. **Connection Pooling:** Min 5, Max 20 connections
4. **Read Replicas:** For analytics queries (PostgreSQL)
5. **Pagination:** Always paginate results (default 20 items)

### API Optimization
1. **Response Compression:** gzip all responses
2. **Caching Headers:** Set appropriate Cache-Control headers
3. **CDN:** Serve static assets from CDN
4. **API Versioning:** v1, v2 for backward compatibility
5. **Lazy Loading:** Paginate large datasets

### Queue Optimization
1. **Job Batching:** Process similar jobs together
2. **Job Timeouts:** Set reasonable timeouts (30s default)
3. **Dead Letter Queue:** Failed jobs after 3 attempts
4. **Processing Concurrency:** Tune based on server resources

---

## COMPLIANCE & SECURITY CERTIFICATIONS

### Data Protection
- **GDPR Compliance:** Data deletion requests
- **CCPA Compliance:** California privacy rights
- **India Data Protection:** Compliance with IT Act
- **PCI DSS:** If storing payment data (use Razorpay)

### Security Practices
- **Encryption at Rest:** Database encryption
- **Encryption in Transit:** TLS 1.3
- **Regular Backups:** Daily automated backups
- **Penetration Testing:** Annual security audits
- **Vulnerability Scanning:** Continuous with Snyk

---

## TESTING STRATEGY

### Unit Tests
- Service layer tests
- Utility function tests
- Helper function tests
- Target: 80% coverage

### Integration Tests
- API endpoint tests
- Database integration
- Queue processing
- External service mocking

### E2E Tests
- User workflows
- Lead creation → Conversion
- Campaign management flow
- Message sending flow

```bash
npm run test              # All tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:e2e         # E2E tests only
```

---

## FINAL ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Frontend)                        │
│                  GROR Marketing Website                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    API Gateway (Next.js)
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    ┌───▼────┐        ┌────▼─────┐      ┌────▼─────┐
    │  Auth   │        │   Leads   │      │ Campaigns │
    │ Service │        │ Service   │      │ Service   │
    └────┬────┘        └────┬──────┘      └────┬──────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                ┌───────────▼────────────┐
                │    PostgreSQL DB       │
                │  (Prisma ORM)          │
                └───────────┬────────────┘
                            │
        ┌───────────────────┼────────────────────┐
        │                   │                    │
    ┌───▼──────┐    ┌──────▼────────┐   ┌──────▼─────────┐
    │  Redis   │    │  Message Queue │   │  External APIs │
    │ (Caching,│    │   (BullMQ)     │   │  (WhatsApp,   │
    │ Sessions)│    │                │   │   Email, Ads)  │
    └──────────┘    └────────────────┘   └────────────────┘
```

---

## ROLLOUT PHASES

**Phase 1 (Week 1-2):**
- Core API structure
- Auth system
- Lead management
- Basic database

**Phase 2 (Week 3-4):**
- Campaign management
- Analytics system
- Message service
- Automation workflows

**Phase 3 (Week 5-6):**
- Advanced features
- Integrations (Meta, Google Ads)
- Performance optimization
- Testing & QA

**Phase 4 (Week 7-8):**
- Deployment setup
- Monitoring & logging
- Documentation
- Launch preparation

---

## FINAL QUALITY STANDARDS

This backend must:
- [ ] Handle 10,000+ leads/month with sub-100ms response
- [ ] Support 1,000+ concurrent API requests
- [ ] Maintain 99.9% uptime
- [ ] Process 100,000+ messages/day
- [ ] Recover from failures automatically
- [ ] Log all critical actions
- [ ] Prevent unauthorized access
- [ ] Scale horizontally easily
- [ ] Provide comprehensive APIs
- [ ] Enable real-time analytics

**This is an ENTERPRISE-GRADE system built for scale, reliability, and premium user experience.**

---

**END OF PREMIUM BACKEND ARCHITECTURE PROMPT**