# Copilot Instructions for n8n-nodes-bcdrllc

## Project Overview
This is an n8n community nodes package for BCDR LLC integrations. Follow n8n's best practices for node development.

## Code Review Guidelines

### Node Development Standards
- Follow n8n's node structure and conventions
- Use TypeScript with strict type checking
- Implement proper error handling with descriptive messages
- Add JSDoc comments for all public methods and interfaces

### API Integration Best Practices
- Use n8n's HTTP request helpers (`this.helpers.request` or `this.helpers.httpRequest`)
- Implement proper authentication handling (API keys, OAuth, etc.)
- Add retry logic for transient failures
- Handle rate limiting gracefully
- Validate all API responses before processing

### Error Handling
- Always use try-catch blocks for async operations
- Provide clear, actionable error messages to users
- Include relevant context (endpoint, parameters) in error messages
- Use n8n's `NodeOperationError` for consistent error reporting

### Node Properties
- Use clear, descriptive display names and descriptions
- Group related properties using `displayOptions`
- Provide sensible default values where applicable
- Add placeholder text to guide users
- Use proper field types (string, number, boolean, options, etc.)

### Testing Requirements
- Test all node operations with real API responses
- Verify error handling paths
- Test edge cases (empty responses, invalid data, etc.)
- Include integration tests for critical workflows

### Documentation
- Document all node operations in README.md
- Provide example workflows
- Document authentication setup steps
- Include troubleshooting section for common issues

### Security
- Never hardcode credentials or API keys
- Use n8n's credentials system for sensitive data
- Sanitize user inputs before API calls
- Validate webhook signatures when applicable

### Performance
- Minimize API calls where possible
- Implement pagination for large datasets
- Use batch operations when supported by the API
- Avoid blocking operations in the main thread

## Code Style
- Use async/await over promises
- Use meaningful variable and function names
- Keep functions small and focused (single responsibility)
- Use early returns to reduce nesting
- Follow n8n's naming conventions for nodes and credentials
