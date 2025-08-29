---
title: 'API Template'
description: 'FastAPI Template with Industry Standard Observability'
slug: "api-template"
date: 2025-06-20
draft: false
tags:
  - "python"
  - "programming"
  - "template"
  - "fastapi"
categories:
  - "Work"
---

Over the past few years, I've built quite a few FastAPI applications for various projects. Each time I started a new one, I found myself copying and pasting the same boilerplate code, setting up the same project structure, and making the same architectural decisions over and over again. Sound familiar?

I got tired of this repetitive process and decided to do something about it. I wanted to create a comprehensive FastAPI template that would save me (and hopefully others) hours of setup time while incorporating all the lessons I've learned from building APIs in production.

In this post, I want to share the journey of creating this template, the decisions I made along the way, and why I think it could be useful for your next FastAPI project too.

## The Problem with Starting from Scratch

Building APIs from scratch often leads to common pitfalls. Projects start with simple flat structures that become nightmares to navigate as they grow. Proper logging gets forgotten until something breaks in production. APIs work perfectly on development machines but fall apart under real-world load.

Each painful experience taught me something valuable, but I kept repeating the same setup process for every new project. I wanted to create a template that would help me (and others) start with the right foundation from day one:

- A maintainable and scalable architecture that doesn't become a mess as the project grows
- Comprehensive observability so I actually know what's happening in production
- A robust testing framework that gives me confidence to refactor and add features
- Proper dependency management that doesn't become a headache
- Production-ready deployment configuration that actually works

## Architectural Design: Lessons from Netflix

After evaluating various project structures, a layered architecture inspired by Netflix's Dispatch project emerged as the most effective approach. This design addresses the common problems with typical "organize by file type" structures taught in many tutorials.

Here's what works well in practice:

### The Four-Layer Architecture

**API Layer**: Handles HTTP requests and responses, defines endpoints and routes, and depends on the service layer. Each domain has its own router module, keeping endpoints organized and focused.

**Service Layer**: Implements business logic, coordinates activities between multiple repositories, handles exceptions and error responses, and serves as the orchestration layer between the API and data access layers.

**Repository Layer**: Provides data access abstraction through the repository pattern, implements CRUD operations, and can be easily swapped between different storage backends without affecting higher layers.

**Model Layer**: Defines data structures using Pydantic for validation and serialization, ensuring type safety throughout the application.

This separation has saved me countless hours when debugging issues or adding new features. I can work on one layer without worrying about breaking others, and testing becomes much more straightforward.

## The Repository Pattern: Beyond Simple CRUD

The repository pattern may seem like unnecessary abstraction for simple CRUD operations, but it proves its value when applications need to scale or adapt to changing requirements. The benefits become clear when switching between different storage backends without affecting business logic.

The repository pattern provides value through:

- **Testability**: Business logic can be tested without touching the database by using mock repositories
- **Flexibility**: Storage backends can be changed without affecting business logic
- **Consistency**: All data access follows the same patterns and interfaces

A generic base repository interface covers common operations used in most projects. This eliminates repetitive code and ensures consistency across different domains.

## Logfire: Modern Observability Solution

Traditional observability setups with ELK stacks, Jaeger configuration, and complex monitoring systems can be challenging to implement. Logfire from the Pydantic team offers a streamlined alternative that simplifies observability while maintaining comprehensive functionality.

Logfire provides:

- Structured logging with automatic context correlation
- Performance monitoring and tracing
- Integration with OpenTelemetry standards
- Simplified setup compared to traditional observability stacks

The integration with FastAPI's middleware system enables automatic tracing of requests, database queries, and custom events without manual instrumentation.

## Taskiq: Modern Alternative to Celery

Celery has been the standard for background tasks, but its async support feels bolted on rather than built-in. This often leads to workarounds when integrating with async FastAPI applications.

Taskiq offers a modern alternative with native async support:
- Full async support unlike Celery's partial async implementation
- Multiple broker support including Redis, RabbitMQ, and Kafka
- Better integration with FastAPI's async nature
- Cleaner API and better error handling

The template includes configuration for both development and production setups, complete with Docker Compose files for quick setup.

## Database Migrations with Alembic

Database schema evolution is a critical aspect of any long-lived project. The template includes Alembic configuration for handling database migrations with SQLAlchemy. The setup includes:

- Automatic migration generation based on model changes
- Environment-specific configuration
- Proper naming conventions for database objects
- Rollback capabilities for safe deployment practices

## Testing

Writing tests is essential for maintaining code quality and enabling confident refactoring. Early-career developers often view tests as impediments to velocity, but experience shows they're critical for long-term maintainability and debugging capabilities.

Building testing into every project from the beginning prevents technical debt. The template includes a testing structure that mirrors the application architecture:

- API endpoint tests verify HTTP behavior and response formats
- Service layer tests focus on business logic without database dependencies
- Repository tests ensure data access works correctly
- Utility function tests cover helper functions and shared code

Using pytest with async support throughout means tests can be written in the same style as application code, eliminating context switching between sync and async patterns.

## Development Tools

Effective development requires tools that work reliably without extensive configuration. The template includes carefully selected tools that enhance the development experience:

**Makefile**: Provides simple commands for common tasks like running tests, starting services, and managing dependencies.

**Pre-commit Hooks**: Automatically format code and run linters before commits, ensuring consistent code quality across team members.

**Ruff**: Modern Python linter and formatter that's significantly faster than traditional tools while providing comprehensive code quality checks.

**UV**: Modern package management solution that provides significantly improved performance over traditional Python package managers.

These tools eliminate friction from the development workflow without requiring extensive configuration.

## Production-Ready Deployment

Development environments often mask issues that surface in production. Making applications work reliably under real-world conditions requires addressing concerns like resource management, error handling, and monitoring.

The template includes Docker configuration refined through multiple production deployments:

These considerations address real production environment challenges rather than theoretical concerns.

## Security and Authentication

Security cannot be retrofitted into applications effectively. The authentication system is designed to be flexible for different use cases while maintaining security by default:
- JWT token-based authentication
- Password hashing with industry-standard algorithms
- Role-based access control through FastAPI dependencies
- Secure password reset and user management flows

The authentication system is built as a reusable FastAPI dependency, making it easy to extend or replace based on specific project requirements.

## Configuration Management

Configuration issues are common sources of deployment problems. Wrong environment variables, missing settings, and values that work in development but fail in production can cause significant issues.

The template uses Pydantic Settings to address these problems:
- Environment variable validation and type checking
- Documentation for all configuration options
- Sensible defaults for development environments
- Clear separation between development and production settings

## Domain-Driven Project Structure

Organizing code by business domains rather than technical layers has proven more maintainable than traditional file-type organization. The template structures each domain as follows:

```
domain/
├── __init__.py
├── config.py          # Domain-specific configuration
├── deps.py            # Domain dependencies
├── exceptions.py      # Domain exceptions
├── models.py          # Database models
├── repository.py      # Data access layer
├── schemas.py         # Pydantic models
├── service.py         # Business logic
├── utils.py           # Domain utilities
└── views.py           # API endpoints
```

This structure improves maintainability by keeping related functionality together. When working on user management, everything needed is in the `users` directory. When debugging authentication issues, the relevant code is easily located.

## Monitoring and Metrics

Beyond basic logging, the template includes comprehensive monitoring capabilities:

**Prometheus Integration**: Automatic collection of application metrics including request counts, response times, and custom business metrics.

**Health Checks**: Multiple health check endpoints that verify different aspects of the application:
- Basic liveness check
- Readiness check including database connectivity
- Detailed health status for monitoring systems

**Request Tracing**: Complete request tracing through the application stack, making it easy to identify performance bottlenecks and debug issues in production.

## Worker Integration

The template seamlessly integrates background task processing with the main API application. Taskiq workers can be deployed alongside the API or separately, providing flexibility for different deployment scenarios.

The worker system includes:
- Task scheduling for periodic operations
- Error handling and retry mechanisms
- Task result storage and retrieval
- Monitoring and observability for background tasks

## Template Philosophy and Goals

This template represents practical solutions to common API development challenges. It's designed as a starting point that can be adapted to specific project needs rather than a rigid framework that must be followed exactly.

The patterns and practices included address real problems encountered in production environments. Teams may need different authentication mechanisms or prefer different observability tools, and the modular architecture accommodates these changes.

Building software involves making tradeoffs, and this template makes opinionated choices based on production experience. The goal is providing a solid foundation that enables focus on business value rather than infrastructure concerns.

## Key Insights and Lessons

Looking back at this development journey, several key insights shaped this template:

- **Start with the right architecture**: Proper layering and separation of concerns upfront saves significant refactoring time later
- **Observability is essential**: Debugging capabilities must be built in from the start, as adding them retroactively is much more difficult
- **Testing provides confidence**: Comprehensive tests enable fast iteration and fearless refactoring
- **Developer experience matters**: Good tooling, clear documentation, and consistent patterns maintain productivity over time
- **Production readiness requires planning**: Deployment, monitoring, and operational concerns should be considered from day one

Building production-ready APIs involves creating systems that can be maintained, debugged, and extended reliably. This template captures essential practices for building robust FastAPI applications.

The template will continue to evolve based on new experiences and community feedback, incorporating improvements and lessons learned from real-world usage.
