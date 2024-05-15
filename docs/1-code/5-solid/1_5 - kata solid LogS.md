# LogS Kata TypeScript

## Specifications

You need to implement a simple logging system that can store logs in a list of entries. 

The log entry has the following properties:

- Timestamp: The timestamp when the log was created.
- Level: The level of the log (INFO, WARN, ERROR).
- Message: The message of the log.

The log can be configured to write only logs of a certain level or higher.

The log can write to the console or to a file. 

### Acceptance Criteria:

```gherkin
Given a log
When a log entry is added
Then the log has the new entry
```

```gherkin
Given a log configured to write above level WARN
When a log entry of level INFO is added
Then the log does not have the new entry
```

```gherkin
Given a log configured to write to a file
When a log entry is added
Then the log file has the new entry
```

### Improvements:

- The log can accept a formatter that can format the log entry.

- The log can accept a writer that can write the log entry to any other destination.

- The log can assign the format and writer to each level of the log.

## Clean Implementation Requirements

1 - Use proper naming conventions.

2 - Write simple blocks and instructions.

3 - Keep functions small.

4 - Avoid primitive obsession.

5 - Respect the SOLID principles.

  - A class should only have one job or responsibility.

  - Add new functionality to a class without changing its existing code.

  - Prefer composition over inheritance.

  - Create small, specific interfaces to define the behavior and decouple the classes.

  - Depend on abstractions, not on concrete implementations. 
