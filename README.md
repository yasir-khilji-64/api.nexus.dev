# Nexus Cloud - Share, Split, Simplify.

Nexus Cloud is a modern, cloud-based split bill and expense tracker designed to make managing shared expenses, personal budgets, and financial tracking easier. Whether you're splitting a dinner bill, tracking household expenses, or planning a group trip, Nexus Cloud provides a seamless and intuitive experience to keep your finances organized.

## 🚀 What is Nexus Cloud?

Nexus Cloud empowers users to:
- Split bills proportionally and track who owes what.
- Monitor personal and group expenses in real time.
- Set and manage budgets to achieve financial goals.
- Collaborate with friends, family, or roommates on shared expenses.

The application is built with a focus on performance, scalability, and user-centric design, leveraging modern technologies and a modular service-based approach with CQRS.

---

## 🎯 Main Focus Points

### 1. **Ease of Use**
Nexus Cloud prioritizes a user-friendly interface, making it simple for anyone to manage expenses, even on the go.

### 2. **Precision & Transparency**
The app provides detailed breakdowns of expenses, ensuring transparency for all users involved in shared finances.

### 3. **Real-Time Collaboration**
With live updates and notifications, all participants stay informed about changes to shared expenses or bills.

### 4. **Cloud-Powered Accessibility**
Access your data anytime, anywhere. Your information is securely stored in the cloud, allowing seamless integration across devices.

### 5. **Scalable Architecture**
Designed with a modular service-based approach and CQRS principles, the app ensures maintainability, scalability, and performance for future growth.

---

## 📝 Features

- **Proportional Bill Splitting**: Split bills fairly based on who paid what.
- **Expense Tracking**: Monitor individual and group expenses in real-time.
- **Budget Management**: Set financial goals and track your progress.
- **Multi-User Collaboration**: Invite others to share and manage expenses seamlessly.
- **Cloud Sync**: Access your data securely from any device.

---

## 📂 Project Structure

The project follows a **modular service-based architecture with CQRS**:

```bash
src/
│── modules/
│   ├── expenses/
│   │   ├── commands/              # CQRS Commands (Create, Update, Delete)
│   │   ├── queries/               # CQRS Queries (Read operations)
│   │   ├── expenses.controller.ts # Handles HTTP requests
│   │   ├── expenses.service.ts    # Business logic
│   │   ├── expenses.repository.ts # Database operations
│   │   ├── expenses.entity.ts     # Expense entity
│   │   ├── expenses.dto.ts        # Data transfer objects
│   │   └── index.ts               # Module entry point
│── shared/
│   ├── base/                       # Common abstract classes
│   │   ├── base.service.ts         # Generic service methods
│   │   ├── base.repository.ts      # Generic repository methods
│   │   ├── base.entity.ts          # Base entity structure
│   │   ├── base.command.ts         # Base CQRS command
│   │   ├── base.query.ts           # Base CQRS query
│   ├── database.ts                 # Database configuration
│   ├── logger.ts                   # Logging utility
│   ├── error-handler.ts            # Global error handling
│   ├── middleware/                  # Express middlewares
│   ├── utils/                       # Utility functions
│   └── types/                       # Shared types and interfaces
│── config/                          # Configuration files
│── app.ts                           # Application entry point
│── server.ts                        # Server configuration
│── routes.ts                        # Route definitions
│── di-container.ts                  # Dependency injection container
```