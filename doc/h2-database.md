# H2 Database Configuration

## Overview

H2 is used as the embedded database for development. It stores data locally as a file-based database.

## Connection Details

| Property     | Value                                                               |
| ------------ | ------------------------------------------------------------------- |
| JDBC URL     | `jdbc:h2:/home/albert/MyProjects/Sandbox/mockup-nottenim/db/chatdb` |
| Driver Class | `org.h2.Driver`                                                     |
| Username     | `albert`                                                            |
| Password     | `1234`                                                              |
| Dialect      | `org.hibernate.dialect.H2Dialect`                                   |

## Database Location

Data files are stored in the `db/` directory at the project root:

```
/home/albert/MyProjects/Sandbox/mockup-nottenim/
├── db/
│   ├── chatdb.mv.db      # Main database file
│   └── chatdb.trace.db   # Trace log (if enabled)
└── ...
```

## H2 Console

The H2 web console is available at `/h2-console` when the app is running.

**Login credentials for the console:**

- JDBC URL: `jdbc:h2:/home/albert/MyProjects/Sandbox/mockup-nottenim/db/chatdb`
- Username: `albert`
- Password: `1234`

## Configuration (`application.properties`)

**Linux (absolute path):**

```properties
spring.datasource.url=jdbc:h2:/home/albert/MyProjects/Sandbox/mockup-nottenim/db/chatdb
```

**Portable (relative path):**

```properties
spring.datasource.url=jdbc:h2:file:./db/chatdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=albert
spring.datasource.password=1234
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

## Notes

- `ddl-auto=update` — Hibernate auto-creates/updates tables on startup.
- File-based mode persists data across application restarts (unlike `mem` mode).
- The `db/` directory is excluded from version control (add to `.gitignore` if not already).
