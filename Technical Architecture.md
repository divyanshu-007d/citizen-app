# Technical Architecture Document
## Crowdsourced Civic Issue Reporting and Resolution System

### Document Version: 1.0
### Date: September 5, 2025
### Project: Smart India Hackathon 2025 - Problem ID 25031

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Principles](#architecture-principles)
3. [High-Level Architecture](#high-level-architecture)
4. [Component Architecture](#component-architecture)
5. [Database Design](#database-design)
6. [API Architecture](#api-architecture)
7. [Security Architecture](#security-architecture)
8. [Deployment Architecture](#deployment-architecture)
9. [Scalability Considerations](#scalability-considerations)
10. [Integration Patterns](#integration-patterns)

---

## 1. System Overview

### 1.1 Architecture Goals
- **Scalability:** Support millions of users across multiple states
- **Performance:** Sub-second response times for critical operations
- **Reliability:** 99.9% uptime with fault tolerance
- **Security:** Government-grade data protection and privacy
- **Maintainability:** Modular, well-documented codebase
- **Extensibility:** Easy integration with third-party services

### 1.2 System Constraints
- **Budget:** Cost-effective solution using open-source technologies
- **Timeline:** 8-week development cycle
- **Compliance:** Government security and data protection standards
- **Accessibility:** Multi-platform support and offline capabilities

---

## 2. Architecture Principles

### 2.1 Design Principles
- **Microservices Architecture:** Loosely coupled, independently deployable services
- **API-First Design:** RESTful APIs for all inter-service communication
- **Event-Driven Architecture:** Asynchronous processing for real-time updates
- **Cloud-Native:** Container-based deployment with orchestration
- **Mobile-First:** Optimized for mobile experience with responsive web support

### 2.2 Technology Principles
- **Open Source First:** Prefer open-source solutions to reduce costs
- **Proven Technologies:** Use established, well-supported frameworks
- **Cross-Platform:** Single codebase for multiple platforms where possible
- **Standards Compliance:** Follow industry standards and best practices

---

## 3. High-Level Architecture

### 3.1 System Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Citizen App   │    │ Field Eng. App  │    │  Admin Portal   │
│ (React Native)  │    │ (React Native)  │    │    (Next.js)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway                                │
│                   (Load Balancer)                              │
└─────────────────────────────────────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Auth Service   │    │ Complaint API   │    │ Notification    │
│   (Node.js)     │    │   (Node.js)     │    │   Service       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────┐
│                     Database Layer                              │
│                   (PostgreSQL)                                 │
└─────────────────────────────────────────────────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────┐
│                   External Services                             │
│              (AI, Maps, Storage, etc.)                         │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow Architecture

```
User Action → Client App → API Gateway → Microservice → Database
                                    ↓
External API ← AI Service ← Message Queue ← Event Publisher
```

---

## 4. Component Architecture

### 4.1 Frontend Architecture

#### 4.1.1 Citizen Mobile App (React Native + Expo)
```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components
│   ├── forms/           # Form components
│   └── maps/            # Map-related components
├── screens/             # Screen components
│   ├── auth/           # Authentication screens
│   ├── complaints/     # Complaint-related screens
│   ├── profile/        # User profile screens
│   └── gamification/   # Leaderboard, badges
├── services/           # API and external service calls
│   ├── api/            # REST API calls
│   ├── ai/             # AI service integration
│   └── storage/        # Local storage management
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── utils/              # Utility functions
└── navigation/         # Navigation configuration
```

#### 4.1.2 Admin Web Dashboard (Next.js)
```
src/
├── pages/              # Next.js pages
│   ├── api/           # API routes (if needed)
│   ├── dashboard/     # Dashboard pages
│   ├── complaints/    # Complaint management
│   └── analytics/     # Analytics and reports
├── components/         # React components
│   ├── ui/           # Basic UI components
│   ├── charts/       # Data visualization
│   └── tables/       # Data tables
├── lib/               # Utility libraries
├── hooks/             # Custom hooks
└── styles/            # CSS and styling
```

### 4.2 Backend Architecture

#### 4.2.1 Microservices Structure
```
services/
├── auth-service/          # Authentication & authorization
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Authentication middleware
│   ├── models/           # User models
│   └── routes/           # API routes
├── complaint-service/     # Complaint management
│   ├── controllers/      # Complaint operations
│   ├── models/          # Complaint models
│   ├── routes/          # Complaint API routes
│   └── workers/         # Background job processors
├── notification-service/ # Multi-channel notifications
│   ├── providers/       # Email, SMS, Push providers
│   ├── templates/       # Message templates
│   └── queue/          # Message queue handlers
├── ai-service/          # AI integration wrapper
│   ├── gemini/         # Google Gemini API
│   ├── processors/     # Image/text processors
│   └── classifiers/    # Issue classification
└── analytics-service/   # Data analytics and reporting
    ├── aggregators/    # Data aggregation
    ├── reports/        # Report generators
    └── exports/        # Data export utilities
```

#### 4.2.2 Common Backend Structure (Node.js + Express)
```
src/
├── config/            # Configuration files
│   ├── database.js   # Database configuration
│   ├── redis.js      # Redis configuration
│   └── env.js        # Environment variables
├── controllers/       # Request controllers
├── middleware/        # Express middleware
│   ├── auth.js       # Authentication middleware
│   ├── validation.js # Request validation
│   └── error.js      # Error handling
├── models/           # Database models (Sequelize/Prisma)
├── routes/           # API route definitions
├── services/         # Business logic services
├── utils/            # Utility functions
├── jobs/             # Background job definitions
└── tests/            # Unit and integration tests
```

---

## 5. Database Design

### 5.1 Database Architecture

#### 5.1.1 Primary Database: PostgreSQL
- **Advantages:** ACID compliance, JSON support, geospatial capabilities, full-text search
- **Use Cases:** Structured data, user management, complaint records, analytics

#### 5.1.2 Caching Layer: Redis
- **Use Cases:** Session storage, API caching, real-time data, job queues

#### 5.1.3 Object Storage: AWS S3 / Google Cloud Storage
- **Use Cases:** Image storage, file attachments, backup data

### 5.2 Database Schema

#### 5.2.1 Core Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    user_type ENUM('citizen', 'field_engineer', 'admin', 'super_admin'),
    profile_picture_url TEXT,
    preferred_language VARCHAR(10) DEFAULT 'en',
    location GEOMETRY(POINT, 4326),
    gamification_points INTEGER DEFAULT 0,
    badge_level VARCHAR(50) DEFAULT 'citizen',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- Complaints table
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100),
    severity ENUM('low', 'medium', 'high', 'critical'),
    status ENUM('submitted', 'acknowledged', 'in_progress', 'resolved', 'rejected'),
    priority_score INTEGER DEFAULT 0,
    location GEOMETRY(POINT, 4326) NOT NULL,
    address TEXT,
    landmark VARCHAR(255),
    department_id UUID REFERENCES departments(id),
    assigned_engineer_id UUID REFERENCES users(id),
    image_urls TEXT[], -- Array of image URLs
    audio_url TEXT,
    ai_classification JSONB, -- AI analysis results
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    resolution_notes TEXT,
    resolution_images TEXT[],
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    acknowledged_at TIMESTAMP,
    resolved_at TIMESTAMP
);

-- Departments table
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    head_user_id UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- User Votes table (for complaint upvoting)
CREATE TABLE user_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    complaint_id UUID REFERENCES complaints(id),
    vote_type ENUM('upvote', 'downvote'),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, complaint_id)
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    complaint_id UUID REFERENCES complaints(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('complaint_update', 'system', 'achievement', 'reminder'),
    channels JSONB, -- Which channels to send to
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Gamification tables
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    criteria JSONB, -- Conditions to earn this badge
    points_reward INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    badge_id UUID REFERENCES badges(id),
    earned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- Referral system
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID REFERENCES users(id),
    referred_id UUID REFERENCES users(id),
    status ENUM('pending', 'completed'),
    points_awarded INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Analytics and tracking
CREATE TABLE complaint_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_id UUID REFERENCES complaints(id),
    metric_name VARCHAR(100),
    metric_value DECIMAL(10,2),
    recorded_at TIMESTAMP DEFAULT NOW()
);
```

#### 5.2.2 Indexing Strategy

```sql
-- Performance indexes
CREATE INDEX idx_complaints_location ON complaints USING GIST(location);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_category ON complaints(category);
CREATE INDEX idx_complaints_created_at ON complaints(created_at);
CREATE INDEX idx_complaints_user_id ON complaints(user_id);
CREATE INDEX idx_complaints_department_id ON complaints(department_id);
CREATE INDEX idx_users_location ON users USING GIST(location);
CREATE INDEX idx_users_user_type ON users(user_type);

-- Full-text search indexes
CREATE INDEX idx_complaints_search ON complaints USING GIN(to_tsvector('english', title || ' ' || description));
```

### 5.3 Data Migration Strategy
- **Version Control:** Database schema versioning using migration tools
- **Rollback Plan:** Safe rollback procedures for failed migrations
- **Data Seeding:** Initial data setup for departments, categories, badges
- **Testing:** Migration testing in staging environment

---

## 6. API Architecture

### 6.1 RESTful API Design

#### 6.1.1 API Versioning
- **URL Versioning:** `/api/v1/complaints`
- **Header Versioning:** `Accept: application/vnd.api+json;version=1`

#### 6.1.2 Standard Response Format
```json
{
    "success": true,
    "message": "Operation completed successfully",
    "data": {
        // Response data
    },
    "meta": {
        "timestamp": "2025-09-05T10:30:00Z",
        "request_id": "req_123456789",
        "pagination": {
            "page": 1,
            "limit": 20,
            "total": 100,
            "total_pages": 5
        }
    },
    "errors": null
}
```

#### 6.1.3 Error Response Format
```json
{
    "success": false,
    "message": "Validation failed",
    "data": null,
    "meta": {
        "timestamp": "2025-09-05T10:30:00Z",
        "request_id": "req_123456789"
    },
    "errors": [
        {
            "field": "email",
            "code": "INVALID_FORMAT",
            "message": "Email format is invalid"
        }
    ]
}
```

### 6.2 API Endpoints

#### 6.2.1 Authentication APIs
```
POST   /api/v1/auth/register        # User registration
POST   /api/v1/auth/login           # User login
POST   /api/v1/auth/logout          # User logout
POST   /api/v1/auth/refresh         # Token refresh
POST   /api/v1/auth/forgot-password # Password reset
GET    /api/v1/auth/profile         # Get user profile
PUT    /api/v1/auth/profile         # Update user profile
```

#### 6.2.2 Complaint APIs
```
GET    /api/v1/complaints           # List complaints (with filters)
POST   /api/v1/complaints           # Create new complaint
GET    /api/v1/complaints/:id       # Get complaint details
PUT    /api/v1/complaints/:id       # Update complaint
DELETE /api/v1/complaints/:id       # Delete complaint
POST   /api/v1/complaints/:id/vote  # Vote on complaint
GET    /api/v1/complaints/nearby    # Get nearby complaints
POST   /api/v1/complaints/:id/comment # Add comment
```

#### 6.2.3 File Upload APIs
```
POST   /api/v1/upload/image         # Upload complaint image
POST   /api/v1/upload/audio         # Upload voice note
GET    /api/v1/upload/signed-url    # Get signed URL for direct upload
```

#### 6.2.4 Analytics APIs
```
GET    /api/v1/analytics/dashboard  # Dashboard statistics
GET    /api/v1/analytics/complaints # Complaint analytics
GET    /api/v1/analytics/departments # Department performance
GET    /api/v1/analytics/trends     # Trend analysis
```

### 6.3 API Security

#### 6.3.1 Authentication
- **JWT Tokens:** Stateless authentication using JSON Web Tokens
- **Refresh Tokens:** Long-lived tokens for session management
- **Multi-Factor Authentication:** SMS/Email verification for sensitive operations

#### 6.3.2 Authorization
- **Role-Based Access Control (RBAC):** Different permissions for different user types
- **Resource-Level Permissions:** Fine-grained access control
- **API Key Management:** Secure API keys for external integrations

#### 6.3.3 Rate Limiting
```javascript
// Rate limiting configuration
const rateLimits = {
    general: { requests: 100, window: '15min' },
    upload: { requests: 20, window: '15min' },
    auth: { requests: 5, window: '15min' }
};
```

---

## 7. Security Architecture

### 7.1 Security Principles
- **Defense in Depth:** Multiple layers of security controls
- **Least Privilege:** Minimal access rights for users and services
- **Data Encryption:** Encryption at rest and in transit
- **Security by Design:** Security considerations in all design decisions

### 7.2 Security Controls

#### 7.2.1 Application Security
- **Input Validation:** Comprehensive validation and sanitization
- **SQL Injection Prevention:** Parameterized queries and ORM usage
- **XSS Protection:** Content Security Policy and output encoding
- **CSRF Protection:** CSRF tokens for state-changing operations

#### 7.2.2 Infrastructure Security
- **Network Security:** Firewalls, VPNs, and network segmentation
- **Container Security:** Secure container images and orchestration
- **Secrets Management:** Encrypted storage of API keys and passwords
- **Monitoring:** Security event logging and monitoring

#### 7.2.3 Data Security
- **Encryption:** AES-256 encryption for sensitive data
- **Data Masking:** PII protection in non-production environments
- **Backup Security:** Encrypted backups with access controls
- **Data Retention:** Automated data retention and deletion policies

### 7.3 Compliance Requirements
- **Data Protection:** Compliance with Indian data protection laws
- **Government Standards:** Adherence to government security guidelines
- **Audit Trail:** Comprehensive logging for compliance audits
- **Privacy Controls:** User consent management and privacy controls

---

## 8. Deployment Architecture

### 8.1 Cloud Infrastructure

#### 8.1.1 Container Architecture
```yaml
# Docker Compose for development
version: '3.8'
services:
  api-gateway:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    
  auth-service:
    build: ./services/auth-service
    environment:
      - DATABASE_URL=${AUTH_DB_URL}
      - JWT_SECRET=${JWT_SECRET}
    
  complaint-service:
    build: ./services/complaint-service
    environment:
      - DATABASE_URL=${COMPLAINT_DB_URL}
      - AI_API_KEY=${GEMINI_API_KEY}
    
  notification-service:
    build: ./services/notification-service
    environment:
      - REDIS_URL=${REDIS_URL}
      - SMTP_CONFIG=${SMTP_CONFIG}
    
  database:
    image: postgis/postgis:15-3.3
    environment:
      - POSTGRES_DB=civic_app
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
```

#### 8.1.2 Kubernetes Deployment
```yaml
# Kubernetes deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: complaint-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: complaint-service
  template:
    metadata:
      labels:
        app: complaint-service
    spec:
      containers:
      - name: complaint-service
        image: civic-app/complaint-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### 8.2 Environment Strategy
- **Development:** Local Docker Compose setup
- **Staging:** Kubernetes cluster mirroring production
- **Production:** Multi-zone Kubernetes deployment with auto-scaling

### 8.3 CI/CD Pipeline
```yaml
# GitHub Actions workflow
name: Deploy to Production
on:
  push:
    branches: [main]
    
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
        
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker images
        run: docker build -t civic-app/api .
        
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Kubernetes
        run: kubectl apply -f k8s/
```

---

## 9. Scalability Considerations

### 9.1 Horizontal Scaling
- **Microservices:** Independent scaling of different services
- **Load Balancing:** Distribute traffic across multiple instances
- **Database Sharding:** Partition data across multiple database instances
- **CDN:** Content delivery network for static assets

### 9.2 Performance Optimization
- **Caching Strategy:** Multi-layer caching (Redis, application, CDN)
- **Database Optimization:** Query optimization and indexing
- **Image Optimization:** Automatic image compression and resizing
- **API Optimization:** Response compression and pagination

### 9.3 Monitoring and Observability
```javascript
// Monitoring configuration
const monitoring = {
    metrics: {
        responseTime: { threshold: '500ms' },
        errorRate: { threshold: '1%' },
        throughput: { threshold: '1000 req/min' }
    },
    alerts: {
        slack: process.env.SLACK_WEBHOOK,
        email: process.env.ALERT_EMAIL
    }
};
```

---

## 10. Integration Patterns

### 10.1 External Service Integration

#### 10.1.1 AI Service Integration (Google Gemini)
```javascript
class AIService {
    async classifyComplaint(imageUrl, description) {
        const prompt = `
            Analyze this civic issue image and description.
            Image: ${imageUrl}
            Description: ${description}
            
            Classify into category, severity, and department.
            Return JSON format.
        `;
        
        const response = await gemini.generateContent(prompt);
        return JSON.parse(response.text);
    }
}
```

#### 10.1.2 WhatsApp Bot Integration
```javascript
class WhatsAppBot {
    async handleMessage(message, sender) {
        if (message.type === 'image') {
            return await this.processComplaintImage(message, sender);
        }
        
        return await this.handleTextMessage(message.text, sender);
    }
}
```

### 10.2 Real-time Communication
- **WebSockets:** Real-time updates for admin dashboard
- **Server-Sent Events:** Live complaint status updates
- **Push Notifications:** Mobile app notifications
- **Message Queues:** Asynchronous processing with Redis/RabbitMQ

### 10.3 Data Integration
- **API Aggregation:** Combine data from multiple sources
- **Event Streaming:** Real-time data pipeline for analytics
- **Batch Processing:** Periodic data processing and cleanup
- **Data Export:** Government data sharing APIs

---

## Conclusion

This technical architecture provides a robust, scalable foundation for the Crowdsourced Civic Issue Reporting and Resolution System. The modular design allows for independent development and deployment of different components, while the cloud-native approach ensures scalability and reliability.

Key architectural decisions:
- **Microservices** for modularity and scalability
- **API-first design** for flexibility and integration
- **Cloud-native deployment** for reliability and scaling
- **Security by design** for government compliance
- **Performance optimization** for user experience

The architecture supports the project's requirements while providing a foundation for future enhancements and integrations.
